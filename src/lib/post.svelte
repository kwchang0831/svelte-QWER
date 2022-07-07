<script lang="ts">
  import './styles/prism.scss';
  import './styles/prose.scss';

  import GiscusSvelte from '@giscus/svelte';
  import PostToc from '$lib/toc.svelte';
  import PostHeading from '$lib/post_heading.svelte';

  import { theme } from '$lib/stores/themes';
  import { commentConfig } from '$config/site';

  import { post } from '$lib/stores/post';

  import { onMount } from 'svelte';

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            post.add_visiableTOC(`#${entry.target.id}`);
            return;
          }
          post.remove_visiableTOC(`#${entry.target.id}`);
        });
      },
      { threshold: 0 },
    );
    const allHeading = document.querySelectorAll('[toc-heading]');
    allHeading.forEach((elm) => {
      observer.observe(elm);
    });
  });
</script>

<div class="relative flex flex-nowrap justify-center">
  <div class="max-w-screen-md flex-1" />

  <div
    class="flex-none max-w-[55rem] w-full prose prose-slate dark:prose-invert md:(rounded-2xl bg-white/[0.5] dark:bg-[#252525]/[0.5])">
    <PostHeading />

    <slot name="post_content" />

    <div class="divider" />

    {#if $post}
      <nav class="flex flex-col mx-[-1.5rem] h-[20rem] md:(flex-row h-[10rem])">
        {#if $post.next}
          <div id="next-post" class="relative flex-1 group overflow-hidden">
            <div class="absolute z-10 i-mdi-chevron-left !w-[1.5rem] !h-[1.5rem] top-[1.25rem] left-[0.75rem]" />
            <a
              href={$post.next.slug}
              alt={$post.next.title}
              class="absolute text-2xl font-bold z-10 !decoration-none !underline-none title-link-orange-500-orange-500 top-[3rem] left-[1rem] mr8">
              {$post.next.title}
            </a>
            <img
              src={$post.next.cover}
              alt=""
              class="absolute z-1 w-full h-full object-cover op50 group-hover:(scale-110) transition-transform duration-350 ease-in-out" />
          </div>
        {/if}
        {#if $post.prev}
          <div id="prev-post" class="relative flex-1 group overflow-hidden">
            <a
              href={$post.prev.slug}
              alt={$post.prev.title}
              class="absolute text-2xl font-bold z-10 !decoration-none !underline-none title-link-orange-500-orange-500 top-[3rem] right-[1rem] ml8">
              {$post.prev.title}
            </a>
            <div class="absolute z-10 i-mdi-chevron-right !w-[1.5rem] !h-[1.5rem] top-[6rem] right-[0.75rem]" />
            <img
              src={$post.prev.cover}
              alt=""
              class="absolute z-1 w-full h-full object-cover op50 group-hover:(scale-110) transition-transform duration-350 ease-in-out" />
          </div>
        {/if}
      </nav>
    {/if}
    {#key $theme}
      <div class="mt8">
        <GiscusSvelte {...commentConfig} theme={$theme} />
      </div>
    {/key}
  </div>

  <div class="max-w-screen-md flex-1 relative">
    {#if $post && $post.toc}
      <PostToc toc={$post.toc} toc_visiable={$post.toc_visiable} />
    {/if}
  </div>
</div>

<style>
  .divider {
    --at-apply: 'border-b-2 m8 border-gray op70';
  }
</style>
