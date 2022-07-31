import config from '../config/QWER.config.json' assert { type: 'json' };
import * as mdify from './marked.js';
import { log } from './logger.js';
import { allTags } from './allTags.js';
import { allPosts } from './allPosts.js';
import { allAssets } from './allAssets.js';
import { firstLine } from './readFirstLine.js';
import { writeSync, readSync } from 'to-vfile';
import { cpSync, readdirSync, unlinkSync, rmSync, existsSync, statSync } from 'node:fs';
import fs from 'fs-extra';
import path, { resolve } from 'node:path';
import matter from 'gray-matter';
import { exec } from 'child_process';
import chokidar from 'chokidar';
import { convert } from 'html-to-text';
import LZString from 'lz-string';
import { type } from 'node:os';

const getAllFiles = (src, arrayFiles = []) => {
  if (!existsSync(src)) return [];

  const files = readdirSync(src, { withFileTypes: true });

  arrayFiles = arrayFiles || [];

  files.forEach((file) => {
    if (file.isDirectory()) {
      arrayFiles = getAllFiles(path.join(src, file.name), arrayFiles);
    } else {
      arrayFiles.push(path.join(src, file.name));
    }
  });

  return arrayFiles;
};

const mapReplace = (str, map) => {
  map.forEach(function (_err, regexItem) {
    str = str.replace(map[regexItem].match, map[regexItem].replace);
  });
  return str;
};

const path2slug = (p) => {
  const pToken = p.split('/');
  const filename = pToken[pToken.length - 1].split('.');
  const ext = filename.pop();
  const base = filename.join('.');

  if (ext !== 'md') throw 'NOT a .md file.';

  if (pToken[pToken.length - 1] === 'index.md') {
    return `/${pToken.slice(1, pToken.length - 1).join('/')}`;
  } else {
    return `/${pToken.slice(1, pToken.length - 1).join('/')}/${base}`;
  }
};

const convertFilePath = (file) => {
  const ext = path.extname(file).substring(1);
  const [, ...destPath] = file.split(path.sep);
  let p2Rm;
  if (ext === 'md') {
    destPath[destPath.length - 1] = destPath[destPath.length - 1].replace(/.md$/i, '.svelte');
    p2Rm = path.resolve(config.targetRouteFolder, destPath.join(path.sep));
  } else if (config.SupportedImageFormat.includes(ext)) {
    p2Rm = path.join(config.targetAssetsFolder, destPath.join('/'));
  } else {
    p2Rm = path.resolve(config.targetStaticFolder, destPath.join(path.sep));
  }
  return p2Rm;
};

const rmFile = (path) => {
  if (path && existsSync(path)) {
    unlinkSync(path);
    log('red', 'File Removed', path);
  }
};

const processRmDir = (dir) => {
  let routeDir = dir.replace(config.targetDataFolder, config.targetRouteFolder);
  let resourceDir = dir.replace(config.targetDataFolder, config.targetStaticFolder);
  if (existsSync(routeDir)) {
    rmDir(routeDir);
  }
  if (existsSync(resourceDir)) {
    rmDir(resourceDir);
  }
};

const rmDir = (dir) => {
  if (existsSync(dir)) {
    getAllFiles(dir).forEach((f) => rmFile(f));
    rmSync(dir, { recursive: true, force: true });
    log('red', 'Dir Removed', dir);
  } else {
    log('green', 'Dir Not Exists. All Done.', dir);
  }
};

const rmGeneratedFiles = (file) => {
  return new Promise((resolve) => {
    firstLine(file).then((s) => {
      if (s.match(config.pattern4GeneratedFiles)) {
        rmFile(file);
        resolve(true);
      }
      resolve(false);
    });
  });
};

const rmEmptyFolders = (dir) => {
  var isDir = statSync(dir).isDirectory();
  if (!isDir) {
    return;
  }

  var files = readdirSync(dir);
  if (files.length > 0) {
    files.forEach(function (file) {
      var fullPath = path.join(dir, file);
      rmEmptyFolders(fullPath);
    });

    files = readdirSync(dir);
  }

  if (files.length == 0) {
    fs.rmdirSync(dir);
    log('red', 'Empty Dir Removed', dir);
    return;
  }
};

const convertPathToSlug = (file) => {
  const ext = path.extname(file).substring(1);
  const [, ...destPath] = file.split(path.sep);
  let _p;
  if (ext === 'md') {
    if (destPath[destPath.length - 1].match(/index.md$/i)) {
      destPath.pop();
    } else {
      destPath[destPath.length - 1] = destPath[destPath.length - 1].replace(/.md$/i, '');
    }
    _p = `/${destPath.join(path.sep)}`;
  } else if (config.SupportedImageFormat.includes(ext)) {
    _p = path.join(config.targetAssetsFolder, destPath.join('/'));
  }
  return [ext, _p];
};

const convertImagePath = (p, slug) => {
  if (!p) return;
  if (p.startsWith('./')) {
    p = path.join(slug, p);
  }
  return p;
};

const processFile = (file) => {
  const ext = path.extname(file).substring(1);
  const [, ...destPath] = file.split(path.sep);

  if (ext === 'md') {
    //TODO: Don't process files that already presents in routes folder and is user-generated.
    const pmd2html = path.join(config.targetRouteFolder, destPath.join('/'));
    const psvelte = pmd2html.replace(/.md$/i, '.svelte');
    if (config.PreserveFilesInRoutes.includes(psvelte)) {
      log('yellow', 'Preserve File Not Processed', psvelte);
      return undefined;
    }

    const slug = path2slug(file);
    const m = matter.read(file);
    const content = m.content;
    const meta = m.data;

    // TODO: needs more testings
    const tags = !(meta.options && meta.options.includes('unlisted'))
      ? meta['tags']?.map((e) => {
          if (typeof e === 'number') return e.toString();
          if (Array.isArray(e))
            return e.map((e) => {
              if (typeof e === 'number') return e.toString();
              else return e;
            });
          if (typeof e === 'object') {
            let u = Object.entries(e)[0].map((c) => {
              if (typeof c === 'number') return c.toString();
              else return c;
            });
            return Object.fromEntries([u]);
          }
          return e;
        })
      : undefined;

    const layout = meta.layout || config.DefaultLayout;
    const md = mdify.mdify(content, slug);
    const html2text = md.content ? convert(md.content) : undefined;

    const postData = {
      slug: slug,
      title: meta['title'],
      description: meta['description'],
      summary: meta['summary'],
      content: html2text ? LZString.compressToBase64(html2text) : undefined,
      html: md.content ? LZString.compressToBase64(md.content) : undefined,
      created: meta['created'] || fs.statSync(file).ctime,
      published: meta['published'] || fs.statSync(file).birthtime,
      updated: meta['updated'] || fs.statSync(file).mtime,
      cover: convertImagePath(meta['cover'], slug),
      coverCaption: meta['coverCaption'],
      coverStyle: meta['coverStyle'] || meta['cover'] ? config.DefaultCoverStyle : undefined,
      options: meta['options'],
      tags: tags,
      toc: md.toc,
    };

    if (postData.cover) {
      md.imports.push(`import Cover from '$generated/assets${postData.cover}'`);
    }

    const tempalte = readSync(path.join(config.targetTemplateFolder, layout), 'utf8');
    const tempalteMap = [
      {
        match: /<!-- :QWER CONTENT: -->/,
        replace: md.content,
      },
      {
        match: /<!-- :QWER POST_TITLE: -->/,
        replace: postData.title,
      },
      {
        match: /<!-- :QWER POST_PUBLISHED: -->/,
        replace: postData.published,
      },
      {
        match: /<!-- :QWER POST_COVER: -->/,
        replace: postData.cover,
      },
      {
        match: /<!-- :QWER POST_COVER_CAPTION: -->/,
        replace: postData.coverCaption,
      },
      {
        match: /\/\*<!-- :QWER IMPORTS: -->\*\//,
        replace: (md.imports && md.imports.join('\n')) || '',
      },
    ];

    fs.ensureDirSync(path.dirname(pmd2html));
    writeSync({
      path: psvelte,
      value: mapReplace(String(tempalte), tempalteMap),
    });
    exec(`prettier --write --plugin-search-dir=. ${psvelte}`);
    log('green', 'File Processed', psvelte);

    return new Promise((resolve) => {
      resolve(postData);
    });
  } else if (config.SupportedImageFormat.includes(ext)) {
    const a = path.join(config.targetAssetsFolder, destPath.join('/'));
    cpSync(file, a);
    log('green', 'File Copied', a);
    allAssets.set(`/${destPath.join('/')}`);
    return new Promise((resolve) => {
      resolve(true);
    });
  } else {
    const s = path.join(config.targetStaticFolder, destPath.join('/'));
    cpSync(file, s);
    log('green', 'File Copied', s);
  }
};

const generateMetaFiles = () => {
  fs.ensureDirSync(config.targetGeneratedFolder);
  writeSync({
    path: config.targetPostsJson,
    value: allPosts.json(),
  });
  log('cyan', 'Meta File Updated', config.targetPostsJson);
  writeSync({
    path: config.targetTagsJson,
    value: allTags.json(),
  });
  log('cyan', 'Meta File Updated', config.targetTagsJson);
};

const generateAssetFile = () => {
  fs.ensureDirSync(config.targetGeneratedFolder);

  let store_data = allAssets.generate_store();

  const tempalte = readSync(path.join(config.targetTemplateFolder, config.DefaultAssetStoreTemplate), 'utf8');
  const tempalteMap = [
    {
      match: /\/\*<!-- :QWER IMPORTS: -->\*\//,
      replace: store_data.imports,
    },
    {
      match: /\/\*<!-- :QWER MAPDATA: -->\*\//,
      replace: store_data.mapData,
    },
  ];

  writeSync({
    path: config.targetAssetsStore,
    value: mapReplace(String(tempalte), tempalteMap),
  });

  exec(`prettier --write --plugin-search-dir=. ${config.targetAssetsStore}`);
  log('cyan', 'Meta File Updated', config.targetAssetsStore);
};

const buildAll = () => {
  new Promise((resolve) => {
    getAllFiles(config.targetDataFolder).forEach((file, i, ar) => {
      if (path.basename(file).startsWith('.')) return;

      processFile(file)?.then((f) => {
        if (typeof f === 'object') {
          allPosts.set(f['slug'], f);
          allTags.set(f['tags']);
        }
      });
      if (i === ar.length - 1) resolve();
    });
  }).then(() => {
    generateMetaFiles();
    generateAssetFile();
  });
};

const cleanAll = () => {
  rmDir(config.targetStaticFolder);
  rmDir(config.targetGeneratedFolder);

  getAllFiles(config.targetRouteFolder).forEach((f) => {
    rmGeneratedFiles(f).then(() => {
      rmEmptyFolders(path.dirname(f));
    });
  });
};

switch (process.argv[2]) {
  case 'watch':
    {
      let dataFolderwatcher = chokidar.watch(config.targetDataFolder, {
        ignored: (file) => path.basename(file).startsWith('.'),
      });
      let inited = false;
      dataFolderwatcher
        .on('add', (file) => {
          log('cyan', '[DATA] File Created', file);
          processFile(file)?.then((f) => {
            if (typeof f === 'object') {
              allPosts.set(f['slug'], f);
              allTags.set(f['tags']);
              if (inited) {
                generateMetaFiles();
              }
            } else if (typeof f === 'boolean') {
              if (inited) {
                generateAssetFile();
              }
            }
          });
        })
        .on('change', (file) => {
          log('cyan', '[DATA] File Updated', file);
          const slug = convertPathToSlug(file);
          if (slug) {
            const tags2rm = allPosts.get(slug).tags;
            allPosts.delete(slug);
            allTags.delete(tags2rm);
          }
          processFile(file)?.then((f) => {
            if (typeof f === 'object') {
              allPosts.set(f['slug'], f);
              allTags.set(f['tags']);
              if (inited) {
                generateMetaFiles();
              }
            }
          });
        })
        .on('unlink', (file) => {
          log('cyan', '[DATA] File Unlinked', file);
          rmFile(convertFilePath(file));
          const slug = convertPathToSlug(file);

          if (slug[1]) {
            if (slug[0] === 'md') {
              const tags2rm = allPosts.get(slug)?.tags;
              allPosts.delete(slug);
              allTags.delete(tags2rm);
              if (inited) {
                generateMetaFiles();
              }
            } else {
              if (inited) {
                generateAssetFile();
              }
            }
          }
        })
        .on('addDir', (dir) => {
          log('cyan', '[DATA] Dir Created', dir);
        })
        .on('unlinkDir', (dir) => {
          log('cyan', '[DATA] Dir Unlinked', dir);
          processRmDir(dir);
        })
        .on('error', (error) => log('red', '[DATA] error', error))
        .on('ready', () => {
          inited = true;
          log('cyan', '[DATA] Folder - Init Scan Completed.');
          generateMetaFiles();
          generateAssetFile();
        });

      const publicFolderwatcher = chokidar.watch(config.targetPublicFolder, {
        ignored: (file) => path.basename(file).startsWith('.'),
      });
      publicFolderwatcher
        .on('add', (file) => {
          log('cyan', '[Public] File Created', file);
          const [, ...destPath] = file.split(path.sep);
          const p = path.join(config.targetStaticFolder, destPath.join('/'));
          cpSync(file, p);
          log('green', 'File Copied', p);
        })
        .on('change', (file) => {
          log('cyan', '[Public] File Updated', file);
          const [, ...destPath] = file.split(path.sep);
          const p = path.join(config.targetStaticFolder, destPath.join('/'));
          cpSync(file, p);
          log('green', 'File Copied', p);
        })
        .on('unlink', (file) => {
          log('cyan', '[Public] File Unlinked', file);
          const [, ...destPath] = file.split(path.sep);
          const p = path.join(config.targetStaticFolder, destPath.join('/'));
          rmFile(p);
        })
        .on('addDir', (dir) => {
          log('cyan', '[Public] Dir Created', dir);
        })
        .on('unlinkDir', (dir) => {
          log('cyan', '[Public] Dir Unlinked', dir);
          const [, ...destPath] = dir.split(path.sep);
          const p = path.join(config.targetStaticFolder, destPath.join('/'));
          rmDir(p);
        })
        .on('error', (error) => log('red', '[DATA] error', error))
        .on('ready', () => {
          log('cyan', '[Public] Folder - Init Scan Completed.');
        });

      process
        .on('SIGINT', () => {
          log('red', 'SIGINT');
          dataFolderwatcher?.close();
          publicFolderwatcher?.close();
        })
        .on('SIGTERM', () => {
          log('red', 'SIGTERM');
          dataFolderwatcher?.close();
          publicFolderwatcher?.close();
        })
        .on('exit', () => {
          log('red', 'watch exit');
        });
    }
    break;

  case 'clean':
    {
      cleanAll();
    }
    break;

  case 'build':
    {
      buildAll();
    }
    break;
}
