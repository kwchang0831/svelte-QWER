import { Config, ImageConfig } from '../config/QWER.confitg.js';
import * as mdify from './marked.js';
import { log } from './logger.js';
import { allTags } from './allTags.js';
import { allPosts } from './allPosts.js';
import { allAssets } from './allAssets.js';
import { firstLine } from './readFirstLine.js';
import { writeSync, readSync } from 'to-vfile';
import { cpSync, readdirSync, unlinkSync, rmSync, existsSync, statSync } from 'node:fs';
import fs from 'fs-extra';
import path from 'node:path';
import matter from 'gray-matter';
import { exec } from 'child_process';
import chokidar from 'chokidar';
import { convert } from 'html-to-text';
import LZString from 'lz-string';

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
    p2Rm = path.resolve(Config.RouteFolder, destPath.join(path.sep));
  } else if (ImageConfig.SupportedImageFormat.includes(ext)) {
    p2Rm = path.join(Config.AssetsFolder, destPath.join('/'));
  } else {
    p2Rm = path.resolve(Config.StaticFolder, destPath.join(path.sep));
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
  let routeDir = dir.replace(Config.DataFolder, Config.RouteFolder);
  let resourceDir = dir.replace(Config.DataFolder, Config.StaticFolder);
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
      if (s.match(Config.PrefixGeneratedFileTemplate)) {
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
  } else if (ImageConfig.SupportedImageFormat.includes(ext)) {
    _p = path.join(Config.AssetsFolder, destPath.join('/'));
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
    const pmd2html = path.join(Config.RouteFolder, destPath.join('/'));
    const psvelte = pmd2html.replace(/.md$/i, '.svelte');
    if (Config.PreserveFilesInRoutes.includes(psvelte)) {
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

    const layout = meta.layout || Config.DefaultLayout;
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
      coverStyle: meta['coverStyle'] || meta['cover'] ? Config.DefaultCoverStyle : undefined,
      options: meta['options'],
      tags: tags,
      toc: md.toc,
    };

    const tempalte = readSync(path.join(Config.TemplateFolder, layout), 'utf8');
    const tempalteMap = [
      {
        match: /<!-- :QWER CONTENT: -->/,
        replace: md.content,
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
  } else if (ImageConfig.SupportedImageFormat.includes(ext)) {
    const a = path.join(Config.AssetsFolder, destPath.join('/'));
    cpSync(file, a);
    log('green', 'File Copied', a);
    allAssets.set(`/${destPath.join('/')}`);
    return new Promise((resolve) => {
      resolve(true);
    });
  } else {
    const s = path.join(Config.StaticFolder, destPath.join('/'));
    cpSync(file, s);
    log('green', 'File Copied', s);
  }
};

const generateMetaFiles = () => {
  fs.ensureDirSync(Config.GeneratedFolder);
  writeSync({
    path: Config.PostsJsonPath,
    value: allPosts.json(),
  });
  log('cyan', 'Meta File Updated', Config.PostsJsonPath);
  writeSync({
    path: Config.TagsJsonPath,
    value: allTags.json(),
  });
  log('cyan', 'Meta File Updated', Config.TagsJsonPath);
};

const generateAssetFile = () => {
  fs.ensureDirSync(Config.GeneratedFolder);

  let type_data = `banner: ${ImageConfig.BannerImage.format.length > 1 ? 'string[]' : 'string'};\n`;
  type_data += Object.entries(ImageConfig.ExtraResolutions)
    .map(([k, v]) => {
      return `${k}?: ${v.format.length > 1 ? 'string[]' : 'string'};`;
    })
    .join('\n');

  const type_tempalte = readSync(path.join(Config.TemplateFolder, ImageConfig.AssetTypeTemplatePath), 'utf8');
  const type_tempalteMap = [
    {
      match: ImageConfig.PrefixImageTypeTemplate,
      replace: type_data,
    },
  ];

  writeSync({
    path: ImageConfig.AssetTypePath,
    value: mapReplace(String(type_tempalte), type_tempalteMap),
  });

  exec(`prettier --write --plugin-search-dir=. ${ImageConfig.AssetTypePath}`);
  log('cyan', 'Meta File Updated', ImageConfig.AssetTypePath);

  let store_data = allAssets.generate_store();

  const store_tempalte = readSync(path.join(Config.TemplateFolder, Config.AssetStoreTemplatePath), 'utf8');
  const store_tempalteMap = [
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
    path: Config.AssetsStorePath,
    value: mapReplace(String(store_tempalte), store_tempalteMap),
  });

  exec(`prettier --write --plugin-search-dir=. ${Config.AssetsStorePath}`);
  log('cyan', 'Meta File Updated', Config.AssetsStorePath);
};

const buildAll = () => {
  new Promise((resolve) => {
    getAllFiles(Config.DataFolder).forEach((file, i, ar) => {
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
    getAllFiles(Config.PublicFolder).forEach((file) => {
      const [, ...destPath] = file.split(path.sep);
      const p = path.join(Config.StaticFolder, destPath.join('/'));
      cpSync(file, p);
    });
    generateMetaFiles();
    generateAssetFile();
  });
};

const cleanAll = () => {
  rmDir(Config.StaticFolder);
  rmDir(Config.GeneratedFolder);
  rmDir(Config.BuildFolder);

  getAllFiles(Config.RouteFolder).forEach((f) => {
    rmGeneratedFiles(f).then(() => {
      rmEmptyFolders(path.dirname(f));
    });
  });
};

switch (process.argv[2]) {
  case 'watch':
    {
      let dataFolderwatcher = chokidar.watch(Config.DataFolder, {
        ignored: (file) => path.basename(file).startsWith('.'),
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100,
        },
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
          if (slug[1]) {
            if (slug[0] === 'md') {
              const tags2rm = allPosts.get(slug)?.tags;
              allPosts.delete(slug);
              allTags.delete(tags2rm);
            }
          }
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

      const publicFolderwatcher = chokidar.watch(Config.PublicFolder, {
        ignored: (file) => path.basename(file).startsWith('.'),
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100,
        },
      });
      publicFolderwatcher
        .on('add', (file) => {
          log('cyan', '[Public] File Created', file);
          const [, ...destPath] = file.split(path.sep);
          const p = path.join(Config.StaticFolder, destPath.join('/'));
          cpSync(file, p);
          log('green', 'File Copied', p);
        })
        .on('change', (file) => {
          log('cyan', '[Public] File Updated', file);
          const [, ...destPath] = file.split(path.sep);
          const p = path.join(Config.StaticFolder, destPath.join('/'));
          cpSync(file, p);
          log('green', 'File Copied', p);
        })
        .on('unlink', (file) => {
          log('cyan', '[Public] File Unlinked', file);
          const [, ...destPath] = file.split(path.sep);
          const p = path.join(Config.StaticFolder, destPath.join('/'));
          rmFile(p);
        })
        .on('addDir', (dir) => {
          log('cyan', '[Public] Dir Created', dir);
        })
        .on('unlinkDir', (dir) => {
          log('cyan', '[Public] Dir Unlinked', dir);
          const [, ...destPath] = dir.split(path.sep);
          const p = path.join(Config.StaticFolder, destPath.join('/'));
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
