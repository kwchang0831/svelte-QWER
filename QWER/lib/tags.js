import { UserConfig } from '../../user/config/QWER.config.js';

export const tags = (() => {
  let _tags = new Map();

  function _set(m, tags) {
    if (!tags) return;

    tags.forEach((tag) => {
      if (Array.isArray(tag)) {
        if (!m.has(UserConfig.DefaultTagName)) {
          m.set(UserConfig.DefaultTagName, new Map());
        }
        tag.forEach((t) => {
          const _k = m.get(UserConfig.DefaultTagName);
          _k.set(t, (_k.get(t) ?? 0) + 1);
        });
      } else if (typeof tag === 'object') {
        Object.keys(tag).forEach((k) => {
          if (!m.has(k)) {
            m.set(k, new Map());
          }
          const _k = m.get(k);
          if (Array.isArray(tag[k])) {
            tag[k].forEach((v) => {
              _k.set(v, (_k.get(v) ?? 0) + 1);
            });
          } else {
            _k.set(tag[k], (_k.get(tag[k]) ?? 0) + 1);
          }
        });
      } else {
        if (!m.has(UserConfig.DefaultTagName)) {
          m.set(UserConfig.DefaultTagName, new Map());
        }
        const _k = m.get(UserConfig.DefaultTagName);
        _k.set(tag, (_k.get(tag) ?? 0) + 1);
      }
    });
  }

  function _del(m, tags) {
    if (!tags) return;

    tags.forEach((tag) => {
      if (Array.isArray(tag)) {
        tag.forEach((t) => {
          const _k = m.get(UserConfig.DefaultTagName);
          if (!_k.get(t)) throw 'Tags were not generated correctly.';

          if (_k.get(t) > 1) {
            _k.set(t, _k.get(t) - 1);
          } else {
            _k.delete(t);
          }
        });
        if (m.get(UserConfig.DefaultTagName).size === 0) {
          m.delete(UserConfig.DefaultTagName);
        }
      } else if (typeof tag === 'object') {
        Object.keys(tag).forEach((k) => {
          if (!m.has(k)) {
            m.set(k, new Map());
          }

          if (Array.isArray(tag[k])) {
            tag[k].forEach((v) => {
              const _k = m.get(k);
              const _v = _k.get(v);
              if (!_v) throw 'Tags were not generated correctly.';
              if (_v > 1) {
                _k.set(v, _v - 1);
              } else {
                _k.delete(v);
              }
            });
          } else {
            const _k = m.get(k);
            const _kk = tag[k];
            const _v = _k.get(_kk);
            if (!_v) throw 'Tags were not generated correctly.';
            if (_v > 1) {
              _k.set(_kk, _v - 1);
            } else {
              _k.delete(_kk);
            }
          }

          if (m.get(k).size === 0) {
            m.delete(k);
          }
        });
      } else {
        const _k = m.get(UserConfig.DefaultTagName);
        const _t = tag;

        if (!_k.get(_t)) throw 'Tags were not generated correctly.';

        if (_k.get(_t) > 1) {
          _k.set(_t, _k.get(_t) - 1);
        } else {
          _k.delete(_t);
        }

        if (m.get(UserConfig.DefaultTagName).size === 0) {
          m.delete(UserConfig.DefaultTagName);
        }
      }
    });
  }

  function _json(m) {
    const _output = JSON.stringify(Object.fromEntries(m), (_, v) => {
      if (v instanceof Map) {
        return Object.fromEntries(v);
      }
      return v;
    });
    return _output;
  }

  return {
    set: (tags) => {
      _set(_tags, tags);
    },
    delete: (tags) => {
      _del(_tags, tags);
    },
    get: (k) => {
      return _tags.get(k);
    },
    clear: () => {
      _tags.clear();
    },
    raw: () => {
      return _tags;
    },
    json: () => {
      return _json(_tags);
    },
    read: (str) => {
      const _input = JSON.parse(str, (_, v) => {
        if (typeof v === 'object') {
          return new Map(Object.entries(v));
        }
        return v;
      });
      _tags.clear();
      _tags = _input;
    },
  };
})();
