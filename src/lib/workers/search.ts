import type { Post } from '$lib/types/post';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import postsjson from '$generated/posts.json';

import { search } from '$lib/search';

const posts = (() => {
  const _allposts = postsjson as [string, Post.Post][];
  const _postsToShow = _allposts
    .filter((e) => {
      return !(e[1]['options'] && e[1]['options'].includes('unlisted'));
    })
    .flatMap((e) => e[1]);
  return {
    data: _postsToShow,
  };
})();

addEventListener('message', async (event) => {
  const { type, payload } = event.data;

  if (type === 'init') {
    search.init(posts.data);
    postMessage({ type: 'ready' });
  }

  if (type === 'query') {
    const result = search.search(payload);
    postMessage({ type: 'query', payload: result });
  }
});
