import { readable, writable } from 'svelte/store';
import type { Post } from '$lib/types/post';
import postsjson from '$generated/posts.json';

const getPosts = () => {
  const sortByPublishedDateLatestFirst = (a: [string, Post.Post], b: [string, Post.Post]): number => {
    const da = new Date(a[1]['published']);
    const db = new Date(b[1]['published']);
    if (db == da) return 0;
    if (db > da) return 1;
    return -1;
  };

  const _posts = Array.from(Object.entries(postsjson)).sort(sortByPublishedDateLatestFirst);
  const _output = new Map<string, Post.Post>();

  for (let i = 0; i < _posts.length; i += 1) {
    const prev = i + 1 < _posts.length ? _posts[i + 1][1].slug : undefined;
    const next = i - 1 >= 0 ? _posts[i - 1][1].slug : undefined;
    _output.set(_posts[i][0], { ..._posts[i][1], prev: prev, next: next });
  }
  return _output;
};

const _allposts: Map<string, Post.Post> = getPosts();

export const postsAll = readable<Map<string, Post.Post>>(_allposts);

export const postsShow = (() => {
  const _default = Array.from(_allposts.values());

  let _data: Post.Post[] = _default;
  const { subscribe, set } = writable<Post.Post[]>(_data);

  const _init = () => {
    _data = _default;
    set(_data);
  };

  const _filter = (tags: Map<string, Set<string>>) => {
    _data = _default;
    tags.forEach((v, category) => {
      if (category === 'tags') {
        v.forEach((searchTag) => {
          _data = _data.filter((e) => {
            return e.tags.find(
              (tagItem: string | string[] | { [key: string]: string } | { [key: string]: string[] }) => {
                if (typeof tagItem === 'string') {
                  return tagItem === searchTag;
                }
                if (Array.isArray(tagItem)) {
                  return tagItem.includes(searchTag);
                }
                return false;
              },
            );
          });
        });
      } else {
        v.forEach((searchTag) => {
          _data = _data.filter((e) => {
            return e.tags.find((tagItem: { [key: string]: string } | { [key: string]: string[] }) => {
              if (typeof tagItem === 'object' && tagItem[category] !== undefined) {
                if (Array.isArray(tagItem[category])) {
                  return tagItem[category].includes(searchTag);
                }
                return tagItem[category] === searchTag;
              }
            });
          });
        });
      }
    });
    set(_data);
  };

  return {
    subscribe,
    init: _init,
    filter: _filter,
  };
})();
