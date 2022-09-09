import { writable, get } from 'svelte/store';
import { postsShow } from '$stores/posts';
import SearchWorker from '$lib/workers/search.js?worker';

export const inited = writable(false);
export const searching = writable(false);
export const result = writable(undefined);

export const query = (() => {
  const { subscribe, set } = writable<string>('');
  let searchWorker: Worker;

  const _init = () => {
    if (get(inited)) return;
    searchWorker = new SearchWorker();
    searchWorker.addEventListener('message', (event) => {
      const { type, payload } = event.data;
      if (type === 'query') {
        searching.set(false);
        result.set(payload);
        postsShow.filter();
      }
    });
    searchWorker.postMessage({
      type: 'init',
    });
    inited.set(true);
  };
  const _set = (q: string) => {
    set(q);
    if (q && q.length > 0) {
      searching.set(true);
      searchWorker.postMessage({
        type: 'query',
        payload: q,
      });
    } else {
      postsShow.init();
    }
  };

  const _reset = () => {
    set('');
  };

  return {
    subscribe,
    init: _init,
    set: _set,
    reset: _reset,
  };
})();
