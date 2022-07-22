import { readable } from 'svelte/store';

import postsjson from '$generated/posts.json';
const posts = new Map(Object.entries(postsjson));

// const map = new Map<string, Post.Post>(JSON.parse(mockup));
// const sortByPublishedDateLatestFirst = (a: Post.Post, b: Post.Post): number => {
//   const da = new Date(a['published']);
//   const db = new Date(b['published']);
//   if (db == da) return 0;
//   if (db > da) return 1;
//   return -1;
// };

export const AllPosts = readable(posts);

// console.log(JSON.parse(mockup));
