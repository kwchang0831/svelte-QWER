import { readable, writable, get } from 'svelte/store';
import type { Post } from '$lib/types/post';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import postsjson from '$generated/posts.json';
import { tagsCur } from '$stores/tags';
import { result } from '$lib/search/stores';

const _allposts = postsjson as [string, Post.Post][];

export const postsAll = readable<Map<string, Post.Post>>(new Map(_allposts));

export const postsShow = (() => {
  const _default = _allposts
    .filter((e) => {
      return !(e[1]['options'] && e[1]['options'].includes('unlisted'));
    })
    .flatMap((e) => e[1]);
  const { subscribe, set } = writable<Post.Post[]>(_default);

  const _init = () => {
    set(_default);
  };

  const _filterBySlugs = (data: Post.Post[]) => {
    let _data = data;
    const slugs: Array<string> | undefined = get(result);
    if (slugs) {
      _data = _data.filter((e) => {
        return (slugs as Array<string>).includes(e.slug);
      });
    }
    return _data;
  };

  const _filterByTags = (data: Post.Post[]) => {
    let _data = data;
    get(tagsCur).forEach((v, category) => {
      if (category === 'tags') {
        v.forEach((searchTag) => {
          _data = _data.filter((e) => {
            if (!e.tags) return false;
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
            if (!e.tags) return false;
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
    return _data;
  };

  const _filter = () => {
    let _data = _default;
    _data = _filterByTags(_data);
    _data = _filterBySlugs(_data);
    set(_data);
  };

  return {
    subscribe,
    init: _init,
    filter: _filter,
  };
})();
