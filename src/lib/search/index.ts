import type { Post } from '$lib/types/post';
import Index from 'flexsearch/dist/module/index.js';
import LZString from 'lz-string';

export const search = (() => {
  const _index = new Index({ tokenize: 'full' });
  let _inited = false;

  const _init = (posts: Post.Post[]) => {
    if (_inited) return;

    for (const post of posts) {
      _index.add(post.slug, `${post.title};${post.summary};${LZString.decompressFromBase64(post.content ?? '')}`);
    }

    _inited = true;
  };

  const _search = (query: string) => {
    if (!_inited) return;

    const result = _index.search(query);
    return result;
  };

  return {
    inited: _inited,
    init: _init,
    search: _search,
  };
})();
