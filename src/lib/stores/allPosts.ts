import { readable } from 'svelte/store';
import type { Post } from '$lib/types/post';
import postsjson from '$generated/posts.json';

// const posts = new Map(Object.entries(postsjson));

const getPosts = () => {
  const sortByPublishedDateLatestFirst = (a: [string, Post.Post], b: [string, Post.Post]): number => {
    const da = new Date(a[1]['published']);
    const db = new Date(b[1]['published']);
    if (db == da) return 0;
    if (db > da) return 1;
    return -1;
  };

  const _posts = Array.from(Object.entries(postsjson)).sort(sortByPublishedDateLatestFirst);
  const _output = new Map<string, Post.Post>();

  for (let i = 0; i < _posts.length; i += 1) {
    const prev = i + 1 < _posts.length ? _posts[i + 1][1].slug : undefined;
    const next = i - 1 >= 0 ? _posts[i - 1][1].slug : undefined;
    _output.set(_posts[i][0], { ..._posts[i][1], prev: prev, next: next });
  }
  return _output;
};

export const AllPosts = readable(getPosts());
