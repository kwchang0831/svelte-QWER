import { writable } from 'svelte/store';
import type { Post } from '$lib/types/post';
// const mockup: Post.CurrentPost = {
//   slug: 'post/1',
//   tocVisible: new Map<string, number>(),
//   postData:
// };

export const CurPost = (() => {
  const { subscribe, update, set } = writable<Post.CurrentPost | undefined>(undefined);

  return {
    subscribe,
    desotry: () => {
      set(undefined);
    },
    init: () => {
      set({ tocVisible: new Map<string, number>() });
    },
    add_visiableTOC: (id: string) => {
      update((post_detail) => {
        if (post_detail) {
          if (!post_detail.tocVisible) {
            post_detail.tocVisible = new Map<string, number>();
          }
          const cur = post_detail.tocVisible.get(id) || 0;
          post_detail.tocVisible.set(id, cur + 1);
        }
        return post_detail;
      });
    },
    remove_visiableTOC: (id: string) => {
      update((post_detail) => {
        if (post_detail) {
          if (post_detail.tocVisible) {
            const cur = post_detail.tocVisible.get(id);
            if (cur) post_detail.tocVisible.set(id, cur - 1);
          }
        }
        return post_detail;
      });
    },
  };
})();
