import { writable } from 'svelte/store';
import type { Tags } from '$lib/types/tags'

export const CurTags = (() => {
  const { subscribe, set, update } = writable<Set<Tags.Tag>>(new Set<Tags.Tag>());

  return {
    subscribe,
    init: () => {
      set(new Set<Tags.Tag>());
    },
    add: (t: Tags.Tag) => {
      update((curtags) => {
        curtags.add(t)
        return curtags;
      });
    },
    del: (t: Tags.Tag) => {
      update((curtags) => {
        curtags.delete(t)
        return curtags;
      });
    },
    toggle:  (t: Tags.Tag) => {
      update((curtags) => {
        if(curtags.has(t))
          curtags.delete(t)
        else
          curtags.add(t)
        return curtags;
      });
    }

  }
})();