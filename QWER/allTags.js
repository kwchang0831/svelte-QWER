import config from './config.json' assert { type: 'json' };

export const allTags = (() => {
  let _alltags = new Map();

  return {
    /**
     * Example Input:
     * [
     *   GG,
     *   123,
     *   [ '開發環境', 'OS' ],
     *   { lang: '中文' },
     *   { os: [ 'Ubuntu', 'Windows' ] },
     *   { year: 2022 }
     * ]
     */
    set: (tags) => {
      if (!tags) return;

      tags.forEach((tag) => {
        if (Array.isArray(tag)) {
          if (!_alltags.has(config.DefaultTagName)) {
            _alltags.set(config.DefaultTagName, new Map());
          }
          tag.forEach((t) => {
            const _k = _alltags.get(config.DefaultTagName);
            _k.set(t, (_k.get(t) ?? 0) + 1);
          });
        } else if (typeof tag === 'object') {
          Object.keys(tag).forEach((k) => {
            if (!_alltags.has(k)) {
              _alltags.set(k, new Map());
            }
            const _k = _alltags.get(k);
            if (Array.isArray(tag[k])) {
              tag[k].forEach((v) => {
                _k.set(v.toString(), (_k.get(v) ?? 0) + 1);
              });
            } else {
              _k.set(tag[k].toString(), (_k.get(tag[k]) ?? 0) + 1);
            }
          });
        } else {
          if (!_alltags.has(config.DefaultTagName)) {
            _alltags.set(config.DefaultTagName, new Map());
          }
          const _k = _alltags.get(config.DefaultTagName);
          _k.set(tag.toString(), (_k.get(tag) ?? 0) + 1);
        }
      });
    },
    delete: (tags) => {
      if (!tags) return;

      tags.forEach((tag) => {
        if (Array.isArray(tag)) {
          tag.forEach((t) => {
            const _k = _alltags.get(config.DefaultTagName);
            if (!_k.get(t)) throw 'Tags were not generated correctly.';

            if (_k.get(t) > 1) {
              _k.set(t, _k.get(t) - 1);
            } else {
              _k.delete(t);
            }
          });
          if (_alltags.get(config.DefaultTagName).size === 0) {
            _alltags.delete(config.DefaultTagName);
          }
        } else if (typeof tag === 'object') {
          Object.keys(tag).forEach((k) => {
            if (!_alltags.has(k)) {
              _alltags.set(k, new Map());
            }

            if (Array.isArray(tag[k])) {
              tag[k].forEach((v) => {
                const _k = _alltags.get(k);
                const _v = _k.get(v);
                if (!_v) throw 'Tags were not generated correctly.';
                if (_v > 1) {
                  _k.set(v, _v - 1);
                } else {
                  _k.delete(v);
                }
              });
            } else {
              const _k = _alltags.get(k);
              const _kk = tag[k].toString();
              const _v = _k.get(_kk);
              if (!_v) throw 'Tags were not generated correctly.';
              if (_v > 1) {
                _k.set(_kk, _v - 1);
              } else {
                _k.delete(_kk);
              }
            }

            if (_alltags.get(k).size === 0) {
              _alltags.delete(k);
            }
          });
        } else {
          const _k = _alltags.get(config.DefaultTagName);
          const _t = tag.toString();

          if (!_k.get(_t)) throw 'Tags were not generated correctly.';

          if (_k.get(_t) > 1) {
            _k.set(_t, _k.get(_t) - 1);
          } else {
            _k.delete(_t);
          }

          if (_alltags.get(config.DefaultTagName).size === 0) {
            _alltags.delete(config.DefaultTagName);
          }
        }
      });
    },
    get: (k) => {
      return _alltags.get(k);
    },
    raw: () => {
      return _alltags;
    },
    json: () => {
      const _output = JSON.stringify(Object.fromEntries(_alltags), (_, v) => {
        if (v instanceof Map) {
          return Object.fromEntries(v);
        }
        return v;
      });
      return _output;
    },
    read: (str) => {
      const _input = JSON.parse(str, (_, v) => {
        if (typeof v === 'object') {
          return new Map(Object.entries(v));
        }
        return v;
      });
      _alltags.clear();
      _alltags = _input;
    },
  };
})();
