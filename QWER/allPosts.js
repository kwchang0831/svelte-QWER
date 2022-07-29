export const allPosts = (() => {
  let _allPosts = new Map();

  const sortByPublishedDateLatestFirst = (a, b) => {
    const da = new Date(a[1]['published']);
    const db = new Date(b[1]['published']);
    if (db == da) return 0;
    if (db > da) return 1;
    return -1;
  };

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
      const listedPost = Array.from(_allPosts).filter((e) => {
        return !(e[1]['options'] && e[1]['options'].includes('unlisted'));
      });
      listedPost.sort(sortByPublishedDateLatestFirst);

      for (let i = 0; i < listedPost.length; i += 1) {
        const prev = i + 1 < listedPost.length ? listedPost[i + 1][1].slug : undefined;
        const next = i - 1 >= 0 ? listedPost[i - 1][1].slug : undefined;
        _allPosts.set(listedPost[i][0], { ...listedPost[i][1], prev: prev, next: next });
      }

      return JSON.stringify(Array.from(_allPosts).sort(sortByPublishedDateLatestFirst));
    },
    read: (str) => {
      const _input = JSON.parse(str);
      _allPosts.clear();
      _allPosts = new Map(Object.entries(_input));
    },
  };
})();
