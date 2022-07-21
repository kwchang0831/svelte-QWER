export const allPosts = (() => {
  let _allPosts = new Map();

  return {
    set: (slug, value) => {
      _allPosts.set(slug, value);
    },
    get: (slug) => {
      return _allPosts.get(slug);
    },
    delete: (slug) => {
      _allPosts.delete(slug);
    },
    raw: () => {
      return _allPosts;
    },
    clear: () => {
      _allPosts.clear();
    },
    json: () => {
      const _output = JSON.stringify(Object.fromEntries(_allPosts), (_, v) => {
        if (v instanceof Map) {
          return Object.fromEntries(v);
        }
        return v;
      });
      return _output;
    },
    read: (str) => {
      const _input = JSON.parse(str);
      _allPosts.clear();
      _allPosts = new Map(Object.entries(_input));
    },
  };
})();
