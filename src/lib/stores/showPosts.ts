import { get, writable } from 'svelte/store';
import { AllPosts } from '$lib/stores/allPosts';
import type { Post } from '$lib/types/post';

export const ShowPosts = (() => {
  const getAllPosts = () => {
    return Array.from(get(AllPosts).values());
  };
  let _data: Post.Post[] = getAllPosts();

  const _init = () => {
    _data = getAllPosts();
    set(_data);
  };

  const _filter = (tags: Map<string, Set<string>>) => {
    _data = getAllPosts();
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

  const { subscribe, set } = writable<Post.Post[]>(_data);

  return {
    subscribe,
    init: _init,
    filter: _filter,
  };
})();
