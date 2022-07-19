import { readable } from 'svelte/store';
import type { Post } from '$lib/types/post';
const mockup = `[["/post/2",{"slug":"/post/2","title":"POST #2","summary":"Summary #2","published":"05/21/2022","cover":"https://www.kwchang0831.dev/dev-env/ubuntu/upgrade-from-20.04-to-22.04/cover.webp","coverStyle":"IN","toc":[{"heading":"開頭","slug":"#kai1-tou2"},{"heading":"環境","slug":"#huan2-jing4"},{"heading":"確認空間","slug":"#que4-ren4-kong1-jian1"},{"heading":"開始更新","slug":"#kai1-shi3-geng4-xin1"},{"heading":"檢查升級","slug":"#jian3-cha2-sheng1-ji2"},{"heading":"清除垃圾","slug":"#qing1-chu2-la1-ji1"},{"heading":"最後","slug":"#zui4-hou4"},{"heading":"完結","slug":"#wan2-jie2"}],"tags":[{"name":"ubuntu"},{"name":"windows"},{"name":"macOS"},{"name":"dev"}]}],["/post/1",{"slug":"/post/1","title":"POST #1","summary":"Summary #1","published":"05/20/2022","cover":"https://www.kwchang0831.dev/dev-env/ubuntu/upgrade-from-20.04-to-22.04/cover.webp","coverStyle":"TOP","toc":[{"heading":"開頭","slug":"#kai1-tou2"},{"heading":"環境","slug":"#huan2-jing4"},{"heading":"確認空間","slug":"#que4-ren4-kong1-jian1"},{"heading":"開始更新","slug":"#kai1-shi3-geng4-xin1"},{"heading":"檢查升級","slug":"#jian3-cha2-sheng1-ji2"},{"heading":"清除垃圾","slug":"#qing1-chu2-la1-ji1"},{"heading":"最後","slug":"#zui4-hou4"},{"heading":"完結","slug":"#wan2-jie2"}],"tags":[{"name":"ubuntu"},{"name":"windows"},{"name":"macOS"},{"name":"dev"}]}]]`;

const map = new Map<string, Post.Post>(JSON.parse(mockup));
// const sortByPublishedDateLatestFirst = (a: Post.Post, b: Post.Post): number => {
//   const da = new Date(a['published']);
//   const db = new Date(b['published']);
//   if (db == da) return 0;
//   if (db > da) return 1;
//   return -1;
// };

export const AllPosts = readable(map);

// console.log(JSON.parse(mockup));
