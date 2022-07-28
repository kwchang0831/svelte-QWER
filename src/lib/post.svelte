<script lang="ts">
  import type { Post } from '$lib/types/post';
  import '$lib/styles/prism.scss';
  import '$lib/styles/prose.scss';
  import { page } from '$app/stores';
  import { AllPosts } from '$lib/stores/allPosts';
  import { CurTOC } from '$lib/stores/curTOC';

  import GiscusSvelte from '@giscus/svelte';
  import PostToc from '$lib/toc.svelte';
  import PostHeading from '$lib/post_heading.svelte';

  import { theme } from '$lib/stores/themes';
  import { commentConfig } from '$lib/../config/site';

  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/env';

  const thisPost = $AllPosts.get($page.url.pathname) as Post.Post;
  const prevPost = thisPost.prev ? $AllPosts.get(thisPost.prev) : undefined;
  const nextPost = thisPost.next ? $AllPosts.get(thisPost.next) : undefined;
  let observer: IntersectionObserver;
  let postElement: HTMLElement;

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const heading = entry.target.getAttribute('toc-heading');
          if (heading) {
            if (entry.isIntersecting) {
              CurTOC.addTOC(heading);
              return;
            }
            CurTOC.delTOC(heading);
          }
        });
      },
      { rootMargin: '-64px 0px -64px 0px' },
    );

    /**
     * Sibilings right after heading are assigned the attribute to the heading
     */
    let allelements = postElement.querySelector('article');
    if (allelements) {
      if (allelements.children && allelements.children.length > 0) {
        let curHeading = '';
        for (let i = 0; i < allelements.children.length; i += 1) {
          if (/^h/i.test(allelements.children[i].tagName)) {
            curHeading = `#${allelements.children[i].id}`;
          }
          allelements.children[i].setAttribute('toc-heading', curHeading);
          observer.observe(allelements.children[i]);
        }
      }
    }
  });

  // onDestroy(()=>{
  //   if(observer) observer.disconnect()
  //   console.log("DESTORY", thisPost)
  // })
</script>

<div class="flex flex-nowrap justify-center">
  <div class="max-w-screen-md flex-1" />

  <div
    class="flex-none max-w-[55rem] w-full prose prose-slate dark:prose-invert md:(rounded-2xl bg-white/[0.5] dark:bg-[#252525]/[0.5])"
    bind:this={postElement}>
    <PostHeading postData={thisPost} />

    <slot name="post_content" />

    <div class="divider" />

    {#if nextPost || prevPost}
      <nav class="flex flex-col mx-[-1.5rem] h-[20rem] md:(flex-row h-[10rem])">
        {#if nextPost}
          <div id="next-post" class="relative flex-1 group overflow-hidden">
            <div class="absolute z-10 i-mdi-chevron-left !w-[1.5rem] !h-[1.5rem] top-[1.25rem] left-[0.75rem]" />
            <a
              rel="next"
              href={nextPost.slug}
              alt={nextPost.slug}
              class="absolute text-2xl font-bold z-10 !decoration-none !underline-none title-link-orange-500-orange-500 top-[3rem] left-[1rem] mr8">
              {nextPost.title}
            </a>
            <img
              src={nextPost.cover}
              alt=""
              class="absolute z-1 w-full h-full object-cover op50 group-hover:(scale-110) transition-transform duration-350 ease-in-out" />
          </div>
        {/if}
        {#if prevPost}
          <div id="prev-post" class="relative flex-1 group overflow-hidden">
            <a
              rel="prev"
              href={prevPost.slug}
              alt={prevPost.slug}
              class="absolute text-2xl font-bold z-10 !decoration-none !underline-none title-link-orange-500-orange-500 top-[3rem] right-[1rem] ml8">
              {prevPost.title}
            </a>
            <div class="absolute z-10 i-mdi-chevron-right !w-[1.5rem] !h-[1.5rem] top-[6rem] right-[0.75rem]" />
            <img
              src={prevPost.cover}
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
    {#if thisPost && thisPost.toc}
      <PostToc toc={thisPost.toc} />
    {/if}
  </div>
</div>

<style>
  .divider {
    --at-apply: 'border-b-2 m8 border-gray op70';
  }
</style>
