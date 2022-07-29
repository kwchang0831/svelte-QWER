import { readable, writable } from 'svelte/store';
import type { Post } from '$lib/types/post';
import postsjson from '$generated/posts.json';

const _allposts = postsjson as [string, Post.Post][];

export const postsAll = readable<Map<string, Post.Post>>(new Map(_allposts));

export const postsShow = (() => {
  const _default = _allposts
    .filter((e) => {
      return !(e[1]['options'] && e[1]['options'].includes('unlisted'));
    })
    .flatMap((e) => e[1]);

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
