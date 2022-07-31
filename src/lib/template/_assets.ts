// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { readable } from 'svelte/store';
import type { Post } from '$lib/types/post';

/*<!-- :QWER IMPORTS: -->*/

export const assets = (() => {
  const _data = new Map<string, Post.Asset>([
    /*<!-- :QWER MAPDATA: -->*/
  ]);

  const { subscribe } = readable<Map<string, Post.Asset>>(_data);

  return {
    subscribe,
  };
})();
