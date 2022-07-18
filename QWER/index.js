import config from './config.json' assert { type: 'json' };
import * as mdify from './marked.js';
import { log } from './logger.js';
import { allTags } from './allTags.js';
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

const processFile = (file) => {
  const ext = path.extname(file);
  const [, ...destPath] = file.split(path.sep);

  if (ext === '.md') {
    const slug = path2slug(file);
    const m = matter.read(file);
    const content = m.content;
    const meta = m.data;
    const layout = meta.layout || config.DefaultLayout;
    const md = mdify.mdify(content, slug);
    const html2text = convert(md.content);

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

    const pmd2html = path.join(config.targetRouteFolder, destPath.join('/'));
    const psvelte = pmd2html.replace(/.md$/i, '.svelte');
    fs.ensureDirSync(path.dirname(pmd2html));
    writeSync({
      path: psvelte,
      value: mapReplace(String(tempalte), tempalteMap),
    });
    log('green', 'File Processed', psvelte);
    exec(`prettier --write --plugin-search-dir=. ${psvelte}`);

    return new Promise((resolve) => {
      resolve({
        slug: slug,
        title: meta['title'],
        description: meta['description'],
        summary: meta['summary'],
        content: html2text ? LZString.compressToBase64(html2text) : undefined,
        published: meta['published'] || fs.statSync(file).birthtime,
        cover: meta['cover'],
        coverStyle: meta['coverStyle'] || meta['cover'] ? config.DefaultCoverStyle : undefined,
        tags: meta['tags'],
      });
    });
  } else {
    const p = path.join(config.targetStaticFolder, destPath.join('/'));
    cpSync(file, p);
    log('green', 'File Copied', p);
    return undefined;
  }
};

const buildAll = () => {
  getAllFiles(config.targetDataFolder).forEach(processFile);
};

const cleanAll = () => {
  rmDir(config.targetStaticFolder);

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
      let allPosts = new Map();

      watcher
        .on('add', (file) => {
          log('cyan', 'File Created', file);
          processFile(file)?.then((f) => {
            allPosts.set(f['slug'], f);
            allTags.set(f['tags']);
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
          log('cyan', 'Init Scan Completed.');
          // console.log(allTags.getAll());

          // console.log(convertPathToSlug('data/p/2/index.md'));
          // console.log();
          // let d = [ 'GG', 22 ]
          // allTags.delete(d)
          // console.log(allTags.getAll())
          // allTags.delete(d)
          // console.log(allTags.getAll())

          // console.log(allTags.json())
          // allTags.read('{"tags":{"開發環境":2,"OS":2},"lang":{"中文":1},"os":{"Ubuntu":1,"Windows":1},"year":{"2022":1}}')
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
}
