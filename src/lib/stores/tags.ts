import { readable, writable } from 'svelte/store';
import type { Tags } from '$lib/types/tags';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tagsjson from '$generated/tags.json';
import { UserConfig } from '$config/QWER.config';

const tags = Object.entries(tagsjson)
  .map((e: [string, unknown]) => {
    return {
      name: e[0],
      tags: Object.entries(e[1] as object).map((c) => {
        return { name: c[0], category: e[0] };
      }),
    };
  })
  .sort((a, b) => {
    const aIsTags = a.name === 'tags';
    const bIsTags = b.name === 'tags';
    if (aIsTags && bIsTags) return 0;
    if (aIsTags) return -1;
    if (bIsTags) return 1;
    return String(a.name).localeCompare(String(b.name), 'zh-u-co-zhuyin');
  });

export const tagsShowMobile = writable(false);
export const tagsShowDesktop = writable(UserConfig.DefaultDesktopShowTagFilter);

export const tagsAll = readable(tags);

export const tagsCur = (() => {
  let _data = new Map<string, Set<string>>();
  const { subscribe, set } = writable<Map<string, Set<string>>>(_data);

  const _addByTag = (t: Tags.Tag) => {
    if (!_data.has(t.category)) _data.set(t.category, new Set<string>());
    _data.get(t.category)?.add(t.name);
    set(_data);
  };

  const _delByTag = (t: Tags.Tag) => {
    if (_data.has(t.category)) {
      _data.get(t.category)?.delete(t.name);
      if (_data.get(t.category)?.size === 0) {
        _data.delete(t.category);
      }
      set(_data);
    }
  };

  return {
    subscribe,
    init: () => {
      _data = new Map<string, Set<string>>();
      set(_data);
    },
    add: (category: string, name: string) => {
      if (!_data.has(category)) _data.set(category, new Set<string>());
      _data.get(category)?.add(name);
      set(_data);
    },
    addByTag: _addByTag,
    delByTag: _delByTag,
    has: (t: Tags.Tag) => {
      return _data.get(t.category)?.has(t.name);
    },
    toggle: (t: Tags.Tag) => {
      if (_data.has(t.category) && _data.get(t.category)?.has(t.name)) {
        _delByTag(t);
      } else {
        _addByTag(t);
      }
    },
    toString: () => {
      const _output: string[] = [];
      _data.forEach((v, k) => {
        _output.push(`${k === 'tags' ? k : `tags-${k}`}=${Array.from(v).toString()}`);
      });

      return _output.join('&');
    },
  };
})();
