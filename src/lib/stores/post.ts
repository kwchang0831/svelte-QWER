import { writable } from 'svelte/store';
import type { Post } from '$lib/types/post';

const mockup: Post.Detail = {
  slug: 'post/1',
  title: '升級 Ubuntu 從 20.04 至 22.04 (Jammy Jellyfish)',
  cover: 'https://www.kwchang0831.dev/dev-env/ubuntu/upgrade-from-20.04-to-22.04/cover.webp',
  toc: [
    {
      heading: '開頭',
      slug: '#kai1-tou2',
    },
    {
      heading: '環境',
      slug: '#huan2-jing4',
    },
    {
      heading: '確認空間',
      slug: '#que4-ren4-kong1-jian1',
    },
    {
      heading: '開始更新',
      slug: '#kai1-shi3-geng4-xin1',
    },
    {
      heading: '檢查升級',
      slug: '#jian3-cha2-sheng1-ji2',
    },
    {
      heading: '清除垃圾',
      slug: '#qing1-chu2-la1-ji1',
    },
    {
      heading: '最後',
      slug: '#zui4-hou4',
    },
    {
      heading: '完結',
      slug: '#wan2-jie2',
    },
  ],
  tocVisible: new Map<string, number>(),
  next: {
    slug: '/post/0',
    title: '升級 Ubuntu 從 20.04 至 22.04 (Jammy Jellyfish)',
    cover: 'https://www.kwchang0831.dev/dev-env/ubuntu/upgrade-from-20.04-to-22.04/cover.webp',
  },
  prev: {
    slug: '/post/2',
    title: '安裝新版 Oh My Posh 與插件來美化 PowerShell',
    cover: 'https://www.kwchang0831.dev/dev-env/pwsh/oh-my-posh/cover.webp',
  },
};

function Post() {
  const { subscribe, update } = writable<Post.Detail>(mockup);

  return {
    subscribe,
    desotry: () => {
      update(() => {
        return {}
      })
    },
    add_visiableTOC: (id: string) => {
      update((post_detail) => {
        if(post_detail.tocVisible){
          const cur = post_detail.tocVisible.get(id) || 0;
          post_detail.tocVisible.set(id,  cur + 1);
        }
        return post_detail;
      });
    },
    remove_visiableTOC: (id: string) => {
      update((post_detail) => {
        if(post_detail.tocVisible){
          const cur = post_detail.tocVisible.get(id);
          if(cur)
            post_detail.tocVisible.set(id,  cur - 1);
        }
        return post_detail;
      });
    },
  };
}

export const post = Post();
