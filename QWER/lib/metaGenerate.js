import { CoreConfig, ImageConfig, UserConfig } from '../../user/config/QWER.config.js';
import fs from 'fs-extra';
import { readSync, write } from 'to-vfile';
import { exec } from 'child_process';
import { join } from 'node:path';
import { log } from '../utli/logger.js';
import { tags } from '../lib/tags.js';
import { posts } from '../lib/posts.js';
import { assets } from '../lib/assets.js';
import { strReplaceMatchWith } from '../utli/fsHelper.js';

export const genMetaFiles = () => {
  fs.ensureDirSync(CoreConfig.GeneratedFolder);

  write({
    path: CoreConfig.PostsJsonPath,
    value: posts.json(),
  }).then(() => {
    log('cyan', '[Generated] Meta File Updated', CoreConfig.PostsJsonPath);
  });

  write({
    path: CoreConfig.TagsJsonPath,
    value: tags.json(),
  }).then(() => {
    log('cyan', '[Generated] Meta File Updated', CoreConfig.TagsJsonPath);
  });
};

export const genAssetTypeDefinition = () => {
  fs.ensureDirSync(CoreConfig.GeneratedFolder);

  let type_data = '';

  if (UserConfig.BannerImage) {
    type_data += `banner: ${UserConfig.BannerImage.format.length > 1 ? 'string[]' : 'string'};\n`;
  }

  if (UserConfig.ExtraResolutions) {
    type_data += Object.entries(UserConfig.ExtraResolutions)
      .map(([k, v]) => {
        return `${k}?: ${v.format.length > 1 ? 'string[]' : 'string'};`;
      })
      .join('\n');
  }

  const type_tempalte = readSync(join(CoreConfig.TemplateFolder, ImageConfig.AssetTypeTemplatePath), 'utf8');
  const type_tempalteMap = [
    {
      match: ImageConfig.PrefixImageTypeTemplate,
      replace: type_data,
    },
  ];

  write({
    path: ImageConfig.AssetTypePath,
    value: strReplaceMatchWith(String(type_tempalte), type_tempalteMap),
  }).then(() => {
    exec(`prettier --write --plugin-search-dir=. "${ImageConfig.AssetTypePath}"`);
    log('cyan', '[Generated] Meta File Updated', ImageConfig.AssetTypePath);
  });
};

export const genAssetFile = () => {
  fs.ensureDirSync(CoreConfig.GeneratedFolder);

  let store_data = assets.generate_store();

  const store_tempalte = readSync(join(CoreConfig.TemplateFolder, CoreConfig.AssetStoreTemplatePath), 'utf8');
  const store_tempalteMap = [
    {
      match: ImageConfig.AssetTemplateStr_Import,
      replace: store_data.imports,
    },
    {
      match: ImageConfig.AssetTemplateStr_MapData,
      replace: store_data.mapData,
    },
  ];

  write({
    path: CoreConfig.AssetsStorePath,
    value: strReplaceMatchWith(String(store_tempalte), store_tempalteMap),
  }).then(() => {
    exec(`prettier --write --plugin-search-dir=. "${CoreConfig.AssetsStorePath}"`);
    log('cyan', '[Generated] Meta File Updated', CoreConfig.AssetsStorePath);
  });

  write({
    path: CoreConfig.AssetsJsonPath,
    value: assets.json(),
  }).then(() => {
    log('cyan', '[Generated] Meta File Updated', CoreConfig.AssetsJsonPath);
  });
};
