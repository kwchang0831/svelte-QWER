import config from '../config/QWER.config.json' assert { type: 'json' };
import * as mdify from './marked.js';
import { log } from './logger.js';
import { allTags } from './allTags.js';
import { allPosts } from './allPosts.js';
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
  const ext = path.extname(file);
  const [, ...destPath] = file.split(path.sep);
  let p2Rm;
  if (ext === '.md') {
    destPath[destPath.length - 1] = destPath[destPath.length - 1].replace(/.md$/i, '.svelte');
    p2Rm = path.resolve(config.targetRouteFolder, destPath.join(path.sep));
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
  firstLine(file).then((s) => {
    if (s.match(config.pattern4GeneratedFiles)) {
      rmFile(file);
    }
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
  const ext = path.extname(file);
  const [, ...destPath] = file.split(path.sep);
  let _p;
  if (ext === '.md') {
    if (destPath[destPath.length - 1].match(/index.md$/i)) {
      destPath.pop();
    } else {
      destPath[destPath.length - 1] = destPath[destPath.length - 1].replace(/.md$/i, '');
    }
    _p = `/${destPath.join(path.sep)}`;
  }
  return _p;
};

const convertImagePath = (p, slug) => {
  if (!p) return;
  if (p.startsWith('./')) {
    p = path.join(slug, p);
  }
  return p;
};

const processFile = (file) => {
  const ext = path.extname(file);
  const [, ...destPath] = file.split(path.sep);

  if (ext === '.md') {
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

    const tempalte = readSync(path.join(config.targetTemplateFolder, layout), 'utf8');
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
      resolve({
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
        coverStyle: meta['coverStyle'] || meta['cover'] ? config.DefaultCoverStyle : undefined,
        options: meta['options'],
        tags: tags,
        toc: md.toc,
      });
    });
  } else {
    const p = path.join(config.targetStaticFolder, destPath.join('/'));
    cpSync(file, p);
    log('green', 'File Copied', p);
    return undefined;
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

const buildAll = () => {
  new Promise((resolve) => {
    getAllFiles(config.targetDataFolder).forEach((file, i, ar) => {
      if (path.basename(file).startsWith('.')) return;
      processFile(file)?.then((f) => {
        allPosts.set(f['slug'], f);
        allTags.set(f['tags']);
      });

      if (i === ar.length - 1) resolve();
    });
  }).then(() => {
    generateMetaFiles();
  });
};

const cleanAll = () => {
  rmDir(config.targetStaticFolder);
  rmDir(config.targetGeneratedFolder);

  getAllFiles(config.targetRouteFolder).forEach((f) => {
    rmGeneratedFiles(f);
  });

  rmEmptyFolders(config.targetRouteFolder);
};

switch (process.argv[2]) {
  case 'watch':
    {
      let watcher = chokidar.watch(config.targetDataFolder, {
        ignored: (file) => path.basename(file).startsWith('.'),
      });
      let inited = false;
      watcher
        .on('add', (file) => {
          log('cyan', 'File Created', file);
          processFile(file)?.then((f) => {
            allPosts.set(f['slug'], f);
            allTags.set(f['tags']);
            if (inited) generateMetaFiles();
          });
        })
        .on('change', (file) => {
          log('cyan', 'File Updated', file);
          const slug = convertPathToSlug(file);
          if (slug) {
            const tags2rm = allPosts.get(slug).tags;
            allPosts.delete(slug);
            allTags.delete(tags2rm);
          }
          processFile(file)?.then((f) => {
            allPosts.set(f['slug'], f);
            allTags.set(f['tags']);
            if (inited) generateMetaFiles();
          });
        })
        .on('unlink', (file) => {
          log('cyan', 'File Unlinked', file);
          rmFile(convertFilePath(file));
          const slug = convertPathToSlug(file);
          if (slug) {
            const tags2rm = allPosts.get(slug).tags;
            allPosts.delete(slug);
            allTags.delete(tags2rm);
          }
        })
        .on('addDir', (dir) => {
          log('cyan', 'Dir Created', dir);
        })
        .on('unlinkDir', (dir) => {
          log('cyan', 'Dir Unlinked', dir);
          processRmDir(dir);
        })
        .on('error', (error) => log('red', 'error', error))
        .on('ready', () => {
          inited = true;
          log('cyan', 'Init Scan Completed.');
          generateMetaFiles();
        });

      process
        .on('SIGINT', () => {
          log('red', 'SIGINT');
          watcher?.close();
        })
        .on('SIGTERM', () => {
          log('red', 'SIGTERM');
          watcher?.close();
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
