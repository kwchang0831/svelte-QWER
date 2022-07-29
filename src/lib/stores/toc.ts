import { writable } from 'svelte/store';

export const tocCur = (() => {
  let _data = new Map<string, number>();
  const { subscribe, update, set } = writable<Map<string, number>>(_data);

  return {
    subscribe,
    init: () => {
      _data = new Map<string, number>();
      set(_data);
    },
    addTOC: (heading: string) => {
      update((tocVisible) => {
        if (tocVisible) {
          if (!tocVisible) {
            tocVisible = new Map<string, number>();
          }
          const cur = tocVisible.get(heading) || 0;
          tocVisible.set(heading, cur + 1);
        }
        return tocVisible;
      });
    },
    delTOC: (heading: string) => {
      update((tocVisible) => {
        if (tocVisible) {
          const cur = tocVisible.get(heading);
          if (cur) {
            if (cur - 1 === 0) tocVisible.delete(heading);
            else tocVisible.set(heading, cur - 1);
          }
        }
        return tocVisible;
      });
    },
  };
})();
