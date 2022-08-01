export const allAssets = (() => {
  let _allAssets = new Set();

  const _gen_images = () => {
    let m = new Map();

    Array.from(_allAssets).map((e) => {
      m.set(e, {
        original: `$generated/assets${e}`,
        banner: `$generated/assets${e}?w=800&h=150&format=webp;avif`,
        1280: `$generated/assets${e}?w=1280&format=webp;avif`,
        1024: `$generated/assets${e}?w=1024&format=webp;avif`,
        800: `$generated/assets${e}?w=800&format=webp;avif`,
        640: `$generated/assets${e}?w=640&format=webp;avif`,
      });
    });

    return m;
  };
  return {
    set: (slug) => {
      _allAssets.add(slug);
    },
    has: (slug) => {
      return _allAssets.has(slug);
    },
    delete: (slug) => {
      _allAssets.delete(slug);
    },
    raw: () => {
      return _allAssets;
    },
    clear: () => {
      _allAssets.clear();
    },
    json: () => {
      return JSON.stringify(Array.from(_gen_images()));
    },
    generate_store: () => {
      let id = 0;
      const output = Array.from(_gen_images());
      const imports = [];
      let mapData = [];

      output.map((e) => {
        mapData.push([e[0], {}]);
        for (const [key, value] of Object.entries(e[1])) {
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
