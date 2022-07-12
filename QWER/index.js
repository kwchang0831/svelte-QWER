import config from './config.json' assert { type: 'json' };
import * as mdify from './marked.js';
import { log, error } from './logger.js';
import { firstLine } from './readFirstLine.js';
import { writeSync, readSync } from 'to-vfile';
import { cpSync, readdirSync, unlinkSync, rmSync, existsSync, statSync } from 'node:fs';
import fs from 'fs-extra';
import path from 'node:path';
import matter from 'gray-matter';
import { convert } from 'html-to-text';
import { exec } from 'child_process';
import chokidar from 'chokidar';

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

    console.log((md.imports && md.imports.join('\n')) || '');
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
    return {};
  } else {
    const p = path.join(config.targetStaticFolder, destPath.join('/'));
    cpSync(file, p);
    log('green', 'File Copied', p);
    return;
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
      watcher
        .on('add', (file) => {
          log('cyan', 'File Created', file);
          processFile(file);
        })
        .on('change', (file) => {
          log('cyan', 'File Updated', file);
          processFile(file);
        })
        .on('unlink', (file) => {
          log('cyan', 'File Unlinked', file);
          rmFile(convertFilePath(file));
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
