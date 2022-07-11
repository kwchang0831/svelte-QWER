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
    return Array.from(get(AllPosts).values()).sort(sortByPublishedDateLatestFirst)
  }
  const { subscribe } = writable<Post.Post[]>(getAllPosts());

  return {
    subscribe,
  };
})();
