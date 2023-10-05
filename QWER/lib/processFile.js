import { UserConfig, CoreConfig, ImageConfig } from '../../user/config/QWER.config.js';
import path, { join, isAbsolute, basename, extname, sep, resolve, dirname, posix } from 'node:path';
import { existsSync, statSync, cp } from 'node:fs';
import { ensureDirSync } from 'fs-extra';
import { read, write } from 'to-vfile';
import LZString from 'lz-string';
import { exec } from 'child_process';
import { genMetaFiles, genAssetFile, genAssetTypeDefinition } from './metaGenerate.js';
import { rmDir, getAllFilesInDir, rmGeneratedFiles, rmEmptyFolders, strReplaceMatchWith } from '../utli/fsHelper.js';
import { log } from '../utli/logger.js';
import { tags } from '../lib/tags.js';
import { posts } from '../lib/posts.js';
import { assets } from '../lib/assets.js';
import matter from 'gray-matter';
import { mdify } from '../mdify/index.js';
import { convert } from 'html-to-text';
import { rule_PostsYearMonthDate } from './customRoutingRule.js';

export const processRmDir = (dir) => {
  let _routeDir = dir.replace(CoreConfig.UserBlogsFolder, CoreConfig.RouteFolder);
  let _resourceDir = dir.replace(CoreConfig.UserBlogsFolder, CoreConfig.StaticFolder);
  if (existsSync(_routeDir)) {
    rmDir(_routeDir);
  }
  if (existsSync(_resourceDir)) {
    rmDir(_resourceDir);
  }
};

const isRemotePath = (path) => {
  return path.startsWith('http://') || path.startsWith('https://');
};

export const processImagePath = (path, slug) => {
  if (!path || !slug) return;

  if (isRemotePath(path)) return path;

  if (!isAbsolute(path)) {
    path = join(slug, path);
  }

  // Internally uses posix style backslashes
  path = path.split(sep).join(posix.sep);

  return path.startsWith('/') ? `${path}` : `/${path}`;
};

export const convertPathToSlug = (file) => {
  const _ext = extname(file);
  const _destPath = path.relative(CoreConfig.UserBlogsFolder, file).split(sep);

  let _slug;
  if (_ext === '.md') {
    if (_destPath[_destPath.length - 1].match(/^index.md$/i)) {
      _destPath.pop();
    } else {
      _destPath[_destPath.length - 1] = _destPath[_destPath.length - 1].replace(/.md$/i, '');
    }
  }
  _slug = `${_destPath.join('/')}`;

  if (UserConfig.RoutingRules) {
    if (UserConfig.RoutingRules.PostsYearMonthDate) {
      _slug = rule_PostsYearMonthDate(file, _slug);
    }
  }

  return [_ext, _slug];
};

export const convertPathForInternalUse = (file) => {
  const [_ext, _slug] = convertPathToSlug(file);
  let _path;

  if (_ext === '.md') {
    _path = resolve(CoreConfig.RouteFolder, _slug, '+page.svelte');
  } else if (ImageConfig.SupportedImageFormat.includes(_ext.substring(1))) {
    _path = join(CoreConfig.AssetsFolder, _slug);
  } else {
    _path = resolve(CoreConfig.StaticFolder, _slug);
  }

  return _path;
};

const _processMD = (file, generateMeta) => {
  const _ext = extname(file);

  if (_ext !== '.md') return false;

  const _targetPath = convertPathForInternalUse(file);

  if (UserConfig.PreserveFilesInRoutes.includes(_targetPath)) {
    log('yellow', 'Preserve File Not Processed', _targetPath);
    return true;
  }

  let _slug = convertPathToSlug(file)[1];
  const _matter = matter.read(file);
  const _content = _matter.content;
  const _meta = _matter.data;
  const _tags = !(_meta['options'] && _meta['options']?.includes('unlisted'))
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
  const _layout = _meta.layout ?? CoreConfig.DefaultLayout;
  const _md = mdify(_content, _slug);
  const _html2text = _md.content ? convert(_md.content) : undefined;

  const _postData = {
    slug: _slug,
    title: _meta['title'],
    language: _meta['language'] ?? UserConfig.DefaultPostLanguage,
    description: _meta['description'],
    summary: _meta['summary'],
    content: _html2text ? LZString.compressToBase64(_html2text) : undefined,
    html: _md.content ? LZString.compressToBase64(_md.content) : undefined,
    created: statSync(file).birthtime,
    published: _meta['published'] ?? statSync(file).birthtime,
    updated: _meta['updated'] ?? statSync(file).mtime,
    cover: processImagePath(_meta['cover'], _slug),
    coverCaption: _meta['coverCaption'],
    coverStyle: _meta['coverStyle'] ?? UserConfig.DefaultCoverStyle,
    options: _meta['options'],
    series_tag: _meta['series_tag'],
    series_title: _meta['series_title'],
    tags: _tags ?? [],
    toc: _md.toc,
  };

  if (_meta['series_tag']) {
    const series = { [UserConfig.SeriesTagName]: _meta['series_tag'] };
    _postData['tags'].push(series);
  }

  const year = { [UserConfig.YearTagName]: new Date(_postData['published']).getFullYear().toString() };
  _postData['tags'].push(year);

  const language = { [UserConfig.PostLanguageTagName]: _postData['language'] };
  _postData['tags'].push(language);

  posts.set(_postData['slug'], _postData);
  tags.set(_postData['tags']);

  read(join(CoreConfig.TemplateFolder, _layout), 'utf8').then((_tempalte) => {
    const _tempalteMap = [
      {
        match: CoreConfig.DefaultLayoutTemplateStr_Content,
        replace: _md.content,
      },
      {
        match: CoreConfig.DefaultLayoutTemplateStr_Imports,
        replace: (_md.imports && _md.imports.join('/n')) || '',
      },
    ];

    ensureDirSync(dirname(_targetPath));

    write({
      path: _targetPath,
      value: strReplaceMatchWith(String(_tempalte), _tempalteMap),
    }).then(() => {
      exec(`prettier --write --plugin-search-dir=. "${_targetPath}"`);
      log('green', 'MD File Processed', _targetPath);

      if (generateMeta) {
        genMetaFiles();
      }
    });
  });

  return true;
};

const _processImageAssets = (file, generateMeta) => {
  const [_ext, _slug] = convertPathToSlug(file);

  if (ImageConfig.SupportedImageFormat.includes(_ext.substring(1))) {
    const _targetPath = join(CoreConfig.AssetsFolder, _slug);
    assets.set(_slug);

    cp(file, _targetPath, {}, () => {
      log('green', 'Image File Copied', _targetPath);

      if (generateMeta) {
        genAssetFile();
      }
    });
    return true;
  }

  return false;
};

const _processStaticAseets = (file) => {
  const _targetPath = convertPathForInternalUse(file);
  cp(file, _targetPath, {}, () => {
    log('green', 'Static File Copied', _targetPath);
  });
  return true;
};

export const addDataFolderFile = (file, generateMeta) => {
  return _processMD(file, generateMeta) || _processImageAssets(file, generateMeta) || _processStaticAseets(file);
};

export const readMetaIntoMemory = () => {
  if (existsSync(CoreConfig.PostsJsonPath)) {
    read(CoreConfig.PostsJsonPath, 'utf8').then((_posts) => {
      const _postsJson = JSON.parse(_posts);
      _postsJson.forEach((post) => {
        posts.set(post[0], post[1]);
        tags.set(post[1].tags);
      });
      log('green', 'Meta File Loaded', CoreConfig.PostsJsonPath);
    });
  }
  if (existsSync(CoreConfig.AssetsJsonPath)) {
    read(CoreConfig.AssetsJsonPath, 'utf8').then((_assets) => {
      assets.readFromJson(_assets);
      log('green', 'Meta File Loaded', CoreConfig.AssetsJsonPath);
    });
  }
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
  getAllFilesInDir(CoreConfig.UserPublicFolder).forEach((file) => {
    const _destPath = path.relative(CoreConfig.UserPublicFolder, file);
    const _targetPath = join(CoreConfig.StaticFolder, _destPath);
    cp(file, _targetPath, {}, () => {
      log('green', 'Public File Copied', _targetPath);
    });
  });

  getAllFilesInDir(CoreConfig.UserAssetsFolder).forEach((file) => {
    const _destPath = path.relative(CoreConfig.UserAssetsFolder, file);
    const _targetPath = join(CoreConfig.AssetsFolder, _destPath);
    assets.set(_destPath);
    cp(file, _targetPath, {}, () => {
      log('green', 'Assets File Copied', _targetPath);
    });
  });

  getAllFilesInDir(CoreConfig.UserBlogsFolder).forEach((file) => {
    if (basename(file).startsWith('.')) return;

    addDataFolderFile(file);
  });

  if (metaGenerate) {
    genAssetTypeDefinition();
    genAssetFile();
    genMetaFiles();
  }
};

export const cleanAll = () => {
  getAllFilesInDir(CoreConfig.RouteFolder).map((f) => {
    rmGeneratedFiles(f, CoreConfig.PrefixGeneratedFileTemplate);
  });
  rmDir(CoreConfig.StaticFolder);
  rmDir(CoreConfig.GeneratedFolder);
  rmDir(CoreConfig.BuildFolder);
};

export const cleanEmptyFoldersInRoute = () => {
  rmEmptyFolders(CoreConfig.RouteFolder);
};
