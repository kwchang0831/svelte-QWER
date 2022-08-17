import { Config, ImageConfig } from '../../config/QWER.confitg.js';
import fs from 'fs-extra';
import { writeSync, readSync } from 'to-vfile';
import { join } from 'node:path';
import { log } from '../utli/logger.js';
import { tags } from '../lib/tags.js';
import { posts } from '../lib/posts.js';
import { assets } from '../lib/assets.js';
import { strReplaceMatchWith } from '../utli/fsHelper.js';
import { execSync } from 'child_process';

export const genMetaFiles = () => {
  fs.ensureDirSync(Config.GeneratedFolder);

  writeSync({
    path: Config.PostsJsonPath,
    value: posts.json(),
  });
  log('cyan', '[Generated] Meta File Updated', Config.PostsJsonPath);

  writeSync({
    path: Config.TagsJsonPath,
    value: tags.json(),
  });
  log('cyan', '[Generated] Meta File Updated', Config.TagsJsonPath);
};

export const genAssetTypeDefinition = () => {
  fs.ensureDirSync(Config.GeneratedFolder);

  let type_data = `banner: ${ImageConfig.BannerImage.format.length > 1 ? 'string[]' : 'string'};\n`;
  type_data += Object.entries(ImageConfig.ExtraResolutions)
    .map(([k, v]) => {
      return `${k}?: ${v.format.length > 1 ? 'string[]' : 'string'};`;
    })
    .join('\n');

  const type_tempalte = readSync(join(Config.TemplateFolder, ImageConfig.AssetTypeTemplatePath), 'utf8');
  const type_tempalteMap = [
    {
      match: ImageConfig.PrefixImageTypeTemplate,
      replace: type_data,
    },
  ];

  writeSync({
    path: ImageConfig.AssetTypePath,
    value: strReplaceMatchWith(String(type_tempalte), type_tempalteMap),
  });

  execSync(`prettier --write --plugin-search-dir=. "${ImageConfig.AssetTypePath}"`);
  log('cyan', '[Generated] Meta File Updated', ImageConfig.AssetTypePath);
};

export const genAssetFile = () => {
  fs.ensureDirSync(Config.GeneratedFolder);

  let store_data = assets.generate_store();

  const store_tempalte = readSync(join(Config.TemplateFolder, Config.AssetStoreTemplatePath), 'utf8');
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

  writeSync({
    path: Config.AssetsStorePath,
    value: strReplaceMatchWith(String(store_tempalte), store_tempalteMap),
  });

  execSync(`prettier --write --plugin-search-dir=. "${Config.AssetsStorePath}"`);
  log('cyan', '[Generated] Meta File Updated', Config.AssetsStorePath);
};
