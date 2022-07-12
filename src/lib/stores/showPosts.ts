import type { Post } from '$lib/types/post';
import { get, writable } from 'svelte/store';
import { AllPosts } from '$lib/stores/allPosts';

export const ShowPosts = (() => {
  const sortByPublishedDateLatestFirst = (a: Post.Post, b: Post.Post): number => {
    const da = new Date(a['published']);
    const db = new Date(b['published']);
    if (db == da) return 0;
    if (db > da) return 1;
    return -1;
  };

  const getAllPosts = () => {
    const allposts = Array.from(get(AllPosts).values()).sort(sortByPublishedDateLatestFirst);

    const output = new Array<Post.IndexPost>();
    for (let i = 0; i < allposts.length; i += 1) {
      const prev = i + 1 < allposts.length ? allposts[i + 1].slug : undefined;
      const next = i - 1 >= 0 ? allposts[i - 1].slug : undefined;
      output.push({ id: i, post: allposts[i], prev: prev, next: next });
    }
    return output;
  };

  const { subscribe } = writable<Post.IndexPost[]>(getAllPosts());

  return {
    subscribe,
  };
})();

/***
 * [{id:, POST:, Prev:, Next:}
 * ]
 */
