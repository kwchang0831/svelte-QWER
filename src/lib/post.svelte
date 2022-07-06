<script lang="ts">
  import '../styles/prism.scss';
  import '../styles/prose.scss';

  import GiscusSvelte from '@giscus/svelte';
  import { theme } from '$lib/stores/themes';
  import { commentConfig } from '$config/site';

  let postData = {
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
</script>

<div class="relative flex flex-nowrap justify-center">
  <div class="max-w-screen-md flex-1" />

  <div
    class="flex-none max-w-[55rem] w-full prose prose-slate dark:prose-invert md:(rounded-2xl bg-white/[0.5] dark:bg-[#252525]/[0.5])">
    <slot name="post_heading" />

    <slot name="post_content" />

    <div class="divider" />

    <nav class="flex flex-col mx-[-1.5rem] h-[20rem] md:(flex-row h-[10rem])">
      <div id="next-post" class="relative flex-1 group overflow-hidden">
        <div class="absolute z-10 i-mdi-chevron-left !w-[1.5rem] !h-[1.5rem] top-[1.25rem] left-[0.75rem]" />
        <a
          href={postData.next.slug}
          alt={postData.next.title}
          class="absolute text-2xl font-bold z-10 !decoration-none !underline-none title-link-orange-500-orange-500 top-[3rem] left-[1rem] mr8">
          {postData.next.title}
        </a>
        <img
          src={postData.next.cover}
          alt=""
          class="absolute z-1 w-full h-full object-cover op50 hover:(scale-125) transition duration-300 ease-in-out" />
      </div>
      <div id="prev-post" class="relative flex-1 group overflow-hidden">
        <a
          href={postData.prev.slug}
          alt={postData.prev.title}
          class="absolute text-2xl font-bold z-10 !decoration-none !underline-none title-link-orange-500-orange-500 top-[3rem] right-[1rem] ml8">
          {postData.prev.title}
        </a>
        <div class="absolute z-10 i-mdi-chevron-right !w-[1.5rem] !h-[1.5rem] top-[6rem] right-[0.75rem]" />
        <img
          src={postData.prev.cover}
          alt=""
          class="absolute z-1 w-full h-full object-cover op50 hover:(scale-125) transition duration-300 ease-in-out" />
      </div>
    </nav>
    {#key $theme}
      <div class="mt8">
        <GiscusSvelte {...commentConfig} theme={theme.current()} />
      </div>
    {/key}
  </div>

  <div class="max-w-screen-md flex-1 relative">
    <slot name="post_toc" />
  </div>
</div>

<style>
  .divider {
    --at-apply: 'border-b-2 m8 border-gray op70';
  }
</style>
