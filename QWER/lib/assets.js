import { Config, ImageConfig } from '../../config/QWER.confitg.js';
import path from 'node:path';
import probe from 'probe-image-size';
import { existsSync, readFileSync } from 'node:fs';

export const assets = (() => {
  let _assets = new Set();

  const _gen_images = () => {
    let m = new Map();

    Array.from(_assets).map((e) => {
      let original = `${ImageConfig.OriginalImageFolder}/${e}`;
      let banner = `${original}?w=${ImageConfig.BannerImage.width}${
        ImageConfig.BannerImage.height ? `&h=${ImageConfig.BannerImage.height}` : ''
      }&format=${ImageConfig.BannerImage.format.join(';')}`;

      let output = {
        original: original,
        banner: banner,
      };

      Object.entries(ImageConfig.ExtraResolutions).map(([k, v]) => {
        output[k] = `$generated/assets/${e}?w=${v.width}${v.height ? `&h=${v.height}` : ''}&format=${v.format.join(
          ';',
        )}`;
      });

      m.set(e, output);
    });

    return m;
  };
  return {
    set: (slug) => {
      _assets.add(slug);
    },
    has: (slug) => {
      return _assets.has(slug);
    },
    delete: (slug) => {
      _assets.delete(slug);
    },
    raw: () => {
      return _assets;
    },
    readFromJson: (json) => {
      _assets = new Set(JSON.parse(json));
    },
    json: () => {
      return JSON.stringify(Array.from(_assets));
    },
    clear: () => {
      _assets.clear();
    },
    generate_store: () => {
      let id = 0;
      const output = Array.from(_gen_images());
      const imports = [];
      let mapData = [];

      output.forEach((e) => {
        mapData.push([e[0], {}]);

        let imgPath = path.join(process.cwd(), path.join(Config.DataFolder, e[0]));
        let imgMeta;
        if (existsSync(imgPath)) {
          imgMeta = probe.sync(readFileSync(imgPath));
          mapData[mapData.length - 1][1]['width'] = imgMeta.width;
          mapData[mapData.length - 1][1]['height'] = imgMeta.height;
        }

        for (const [key, value] of Object.entries(e[1])) {
          if (imgMeta && +key > imgMeta.width) continue;
          imports.push(`import ASSETS_${id} from '${value}';`);
          mapData[mapData.length - 1][1][key] = `ASSETS_${id}`;
          id += 1;
        }
      });

      mapData = mapData.map((e) => {
        return `['${e[0]}', ${JSON.stringify(e[1]).replace(/"/g, '')}]`;
      });

      return { imports: imports.join('\n'), mapData: mapData.join(',\n') };
    },
  };
})();
