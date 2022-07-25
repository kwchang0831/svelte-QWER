import config from './config.json' assert { type: 'json' };
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
    if(config.PreserveFilesInRoutes.includes(psvelte)){
      log('yellow', 'Preserve File Not Processed', psvelte)
      return undefined;
    }

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
        cover: convertImagePath(meta['cover'], slug),
        coverStyle: meta['coverStyle'] || meta['cover'] ? config.DefaultCoverStyle : undefined,
        tags: meta['tags'],
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
          console.log(allTags.raw());
          console.log(allPosts.raw());
          generateMetaFiles();
          // console.log(convertPathToSlug('data/p/2/index.md'));
          // console.log();
          // let d = [ 'GG', 22 ]
          // allTags.delete(d)
          // console.log(allTags.getAll())
          // allTags.delete(d)
          // console.log(allTags.getAll())

          // console.log(allTags.json())
          // console.log(allPosts.json())
          // console.log(allPosts.raw());
          // allPosts.clear();
          // console.log(allPosts.raw());
          // allPosts.read(
          //   '{"/p/1":{"slug":"/p/1","title":"升級 Ubuntu 從 20.04 至 22.04 (Jammy Jellyfish)","description":"升級 Ubuntu 從 20.04 至 22.04 (Jammy Jellyfish)","summary":"記錄一下過程，家裡還有很多台 Ubuntu 需要升級一下","content":"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","published":"2022-05-31T00:00:00.000Z","cover":"./cover.webp","coverStyle":"IN","tags":[["開發環境","OS"],{"lang":"中文"},{"os":["Ubuntu","Windows"]},{"year":2022}]},"/p/2":{"slug":"/p/2","content":"tGploMo=","published":"2022-07-12T07:50:11.241Z","tags":["GG"]}}',
          // );
          // console.log(allPosts.raw());
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

  case 'build':
    {
      buildAll();
    }
    break;
}
