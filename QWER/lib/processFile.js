import { Config, ImageConfig } from '../../config/QWER.confitg.js';
import { existsSync, statSync, cpSync } from 'node:fs';
import { genMetaFiles, genAssetFile, genAssetTypeDefinition } from './metaGenerate.js';
import { rmDir, getAllFilesInDir, rmGeneratedFiles, rmEmptyFolders, strReplaceMatchWith } from '../utli/fsHelper.js';
import { join, isAbsolute, basename, extname, sep, resolve, dirname, posix } from 'node:path';
import { ensureDirSync } from 'fs-extra';
import { log } from '../utli/logger.js';
import { tags } from '../lib/tags.js';
import { posts } from '../lib/posts.js';
import { assets } from '../lib/assets.js';
import matter from 'gray-matter';
import { mdify } from '../mdify/index.js';
import { convert } from 'html-to-text';
import LZString from 'lz-string';
import { writeSync, readSync } from 'to-vfile';
import { execSync } from 'child_process';

export const processRmDir = (dir) => {
  let _routeDir = dir.replace(Config.DataFolder, Config.RouteFolder);
  let _resourceDir = dir.replace(Config.DataFolder, Config.StaticFolder);
  if (existsSync(_routeDir)) {
    rmDir(_routeDir);
  }
  if (existsSync(_resourceDir)) {
    rmDir(_resourceDir);
  }
};

export const processImagePath = (path, slug) => {
  if (!path || !slug) return;

  if (!isAbsolute(path)) {
    path = join(slug, path);
  }

  // Internally uses posix style backslashes
  path = path.split(sep).join(posix.sep);
  return path;
};

export const convertPathToSlug = (file) => {
  const _ext = extname(file);
  const [, ..._destPath] = file.split(sep);

  let _slug;
  if (_ext === '.md') {
    if (_destPath[_destPath.length - 1].match(/^index.md$/i)) {
      _destPath.pop();
    } else {
      _destPath[_destPath.length - 1] = _destPath[_destPath.length - 1].replace(/.md$/i, '');
    }
  }
  _slug = `${_destPath.join('/')}`;

  return [_ext, _slug];
};

export const convertPathForInternalUse = (file) => {
  const [_ext, _slug] = convertPathToSlug(file);
  let _path;

  if (_ext === '.md') {
    _path = resolve(Config.RouteFolder, _slug, '+page.svelte');
  } else if (ImageConfig.SupportedImageFormat.includes(_ext.substring(1))) {
    _path = join(Config.AssetsFolder, _slug);
  } else {
    _path = resolve(Config.StaticFolder, _slug);
  }

  return _path;
};

const _processMD = (file, generateMeta) => {
  const _ext = extname(file);

  if (_ext !== '.md') return false;

  const _targetPath = convertPathForInternalUse(file);

  if (Config.PreserveFilesInRoutes.includes(_targetPath)) {
    log('yellow', 'Preserve File Not Processed', _targetPath);
    return true;
  }

  const _slug = convertPathToSlug(file)[1];
  const _matter = matter.read(file);
  const _content = _matter.content;
  const _meta = _matter.data;
  const _tags = !(_meta.options && _meta.options.includes('unlisted'))
    ? _meta['tags']?.map((e) => {
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

  const _layout = _meta.layout ?? Config.DefaultLayout;
  const _md = mdify(_content, _slug);
  const _html2text = _md.content ? convert(_md.content) : undefined;

  const _postData = {
    slug: _slug,
    title: _meta['title'],
    description: _meta['description'],
    summary: _meta['summary'],
    content: _html2text ? LZString.compressToBase64(_html2text) : undefined,
    html: _md.content ? LZString.compressToBase64(_md.content) : undefined,
    created: _meta['created'] || statSync(file).ctime,
    published: _meta['published'] || statSync(file).birthtime,
    updated: _meta['updated'] || statSync(file).mtime,
    cover: processImagePath(_meta['cover'], _slug),
    coverCaption: _meta['coverCaption'],
    coverStyle: _meta['coverStyle'] || _meta['cover'] ? Config.DefaultCoverStyle : undefined,
    options: _meta['options'],
    tags: _tags,
    toc: _md.toc,
  };

  const _tempalte = readSync(join(Config.TemplateFolder, _layout), 'utf8');
  const _tempalteMap = [
    {
      match: Config.DefaultLayoutTemplateStr_Content,
      replace: _md.content,
    },
    {
      match: Config.DefaultLayoutTemplateStr_Imports,
      replace: (_md.imports && _md.imports.join('/n')) || '',
    },
  ];

  ensureDirSync(dirname(_targetPath));
  writeSync({
    path: _targetPath,
    value: strReplaceMatchWith(String(_tempalte), _tempalteMap),
  });

  execSync(`prettier --write --plugin-search-dir=. "${_targetPath}"`);
  log('green', 'MD File Processed', _targetPath);

  posts.set(_postData['slug'], _postData);
  tags.set(_postData['tags']);

  if (generateMeta) {
    genMetaFiles();
  }

  return true;
};

const _processImageAssets = (file, generateMeta) => {
  const [_ext, _slug] = convertPathToSlug(file);

  if (ImageConfig.SupportedImageFormat.includes(_ext.substring(1))) {
    const _targetPath = join(Config.AssetsFolder, _slug);
    cpSync(file, _targetPath);
    log('green', 'Image File Copied', _targetPath);

    assets.set(_slug);

    if (generateMeta) {
      genAssetFile();
    }

    return true;
  }

  return false;
};

const _processStaticAseets = (file) => {
  const _targetPath = convertPathForInternalUse(file);
  cpSync(file, _targetPath);
  log('green', 'Static File Copied', _targetPath);

  return true;
};

export const addDataFolderFile = (file, generateMeta) => {
  return _processMD(file, generateMeta) || _processImageAssets(file, generateMeta) || _processStaticAseets(file);
};

export const rmDataFolderFile = (file, generateMeta) => {
  const [_ext, _slug] = convertPathToSlug(file);

  if (_ext === '.md') {
    const _tags2Rm = posts.get(_slug)?.tags;
    posts.delete(_slug);
    tags.delete(_tags2Rm);
    if (generateMeta) {
      genMetaFiles();
    }
  } else if (ImageConfig.SupportedImageFormat.includes(_ext.substring(1))) {
    assets.delete(_slug);

    if (generateMeta) {
      genAssetFile();
    }
  }
};

export const buildAll = (metaGenerate = true) => {
  new Promise((resolve) => {
    getAllFilesInDir(Config.DataFolder).forEach((file, i, ar) => {
      if (basename(file).startsWith('.')) return;

      addDataFolderFile(file);

      if (i === ar.length - 1) resolve();
    });
  }).then(() => {
    getAllFilesInDir(Config.PublicFolder).forEach((file) => {
      const [, ..._destPath] = file.split(sep);
      const _targetPath = join(Config.StaticFolder, _destPath.join('/'));
      cpSync(file, _targetPath);
      log('green', 'Public File Copied', _targetPath);
    });

    if (metaGenerate) {
      genMetaFiles();
      genAssetFile();
      genAssetTypeDefinition();
    }
  });
};

export const cleanAll = () => {
  getAllFilesInDir(Config.RouteFolder).map((f) => {
    rmGeneratedFiles(f, Config.PrefixGeneratedFileTemplate);
  });
  rmDir(Config.StaticFolder);
  rmDir(Config.GeneratedFolder);
  rmDir(Config.BuildFolder);
};

export const cleanEmptyFoldersInRoute = () => {
  rmEmptyFolders(Config.RouteFolder);
};
