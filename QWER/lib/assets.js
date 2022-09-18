import { UserConfig, CoreConfig, ImageConfig } from '../../user/config/QWER.config.js';
import path from 'node:path';
import probe from 'probe-image-size';
import { existsSync, readFileSync } from 'node:fs';

export const assets = (() => {
  let _assets = new Set();

  const _gen_images = () => {
    let m = new Map();

    Array.from(_assets).map((e) => {
      let original = `${ImageConfig.OriginalImageFolder}${e}`;
      let output;

      if (UserConfig.BannerImage) {
        let banner = `${original}?w=${UserConfig.BannerImage.width}${
          UserConfig.BannerImage.height ? `&h=${UserConfig.BannerImage.height}` : ''
        }&format=${UserConfig.BannerImage.format.join(';')}&imagetools`;
        output = {
          original: original,
          banner: banner,
        };
      } else {
        output = {
          original: original,
        };
      }

      if (UserConfig.ExtraFormats && UserConfig.ExtraFormats.length) {
        output['extraFormats'] = `${ImageConfig.OriginalImageFolder}${e}?format=${UserConfig.ExtraFormats.join(
          ';',
        )}&imagetools`;
      }

      if (UserConfig.ExtraResolutions) {
        Object.entries(UserConfig.ExtraResolutions).map(([k, v]) => {
          output[k] = `${ImageConfig.OriginalImageFolder}${e}?w=${v.width}${
            v.height ? `&h=${v.height}` : ''
          }&format=${v.format.join(';')}&imagetools`;
        });
      }

      m.set(e, output);
    });

    return m;
  };
  return {
    set: (slug) => {
      _assets.add(`/${slug}`);
    },
    has: (slug) => {
      return _assets.has(slug);
    },
    delete: (slug) => {
      _assets.delete(`/${slug}`);
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
        let imgPath;
        let imgMeta;

        imgPath = path.join(process.cwd(), path.join(CoreConfig.AssetsFolder, e[0]));

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
        return `['${e[0]}', ${JSON.stringify(e[1]).replace(/"/g, '')} as Asset.Image]`;
      });

      return { imports: imports.join('\n'), mapData: mapData.join(',\n') };
    },
  };
})();
