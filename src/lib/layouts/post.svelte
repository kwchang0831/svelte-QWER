<script lang="ts">
  import '$lib/styles/prism.scss';
  import '$lib/styles/prose.scss';
  import 'plyr/dist/plyr.css';
  import Plyr from 'plyr';

  import type { Post } from '$lib/types/post';
  import { page } from '$app/stores';
  import { postsAll } from '$stores/posts';
  import { tocCur } from '$stores/toc';

  import ImgBanner from '$lib/components/image_banner.svelte';
  import Giscuss from '$lib/components/giscus.svelte';
  import PostToc from '$lib/components/toc_root.svelte';
  import PostHeading from '$lib/components/post_heading.svelte';
  import SEO from '$lib/components/post_SEO.svelte';
  import TagsSection from '$lib/components/post_tags.svelte';
  import mediumZoom from 'medium-zoom';

  import { theme } from '$stores/themes';
  import { videoplayerConfig } from '$config/site';

  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  const thisPost = $postsAll.get($page.routeId ?? '') as Post.Post;
  const prevPost = thisPost?.prev ? $postsAll.get(thisPost.prev) : undefined;
  const nextPost = thisPost?.next ? $postsAll.get(thisPost.next) : undefined;
  let observer: IntersectionObserver;
  let postElement: HTMLElement;

  onMount(async () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const heading = entry.target.getAttribute('toc-heading');
          if (heading) {
            if (entry.isIntersecting) {
              tocCur.addTOC(heading);
              return;
            }
            tocCur.delTOC(heading);
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
          if (/^h[1-6]/i.test(allelements.children[i].tagName)) {
            curHeading = `#${allelements.children[i].id}`;
          }
          allelements.children[i].setAttribute('toc-heading', curHeading);
          observer.observe(allelements.children[i]);
        }
      }
    }

    mediumZoom('[data-zoomable]', {
      scrollOffset: 0,
      background: 'rgba(25, 18, 25, .9)',
    });

    Plyr.setup('.videoplayer', {
      seekTime: videoplayerConfig.seekTime,
      controls: videoplayerConfig.controls,
    });
  });
</script>

<SEO post={thisPost} />

<main in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }} class="flex flex-nowrap justify-center">
  <div class="max-w-screen-md flex-1" />

  <article
    itemprop="articleBody"
    class="flex-none flex flex-col max-w-[55rem] w-full xl:(rounded-t-2xl) bg-[#F9FBFF] dark:bg-[#252525]"
    bind:this={postElement}>
    <div class="max-w-[55rem]">
      <PostHeading data={thisPost} />
    </div>

    <div class="prose prose-slate dark:prose-invert max-w-[55rem]">
      <slot name="post_content" />
    </div>
  </article>

  <div
    in:fly={{ x: 100, y: -100, duration: 300, delay: 300 }}
    out:fly={{ x: 100, y: 100, duration: 300 }}
    class="max-w-screen-md flex-1 relative">
    {#if thisPost && thisPost.toc}
      <PostToc toc={thisPost.toc} />
    {/if}
  </div>
</main>

<div class="flex flex-nowrap justify-center">
  <div class="max-w-screen-md flex-1" />

  <div class="flex-none flex flex-col max-w-[55rem] w-full xl:(rounded-b-2xl) bg-[#F9FBFF] dark:bg-[#252525]">
    <TagsSection tags={thisPost.tags} />

    <div class="divider" />

    {#if nextPost || prevPost}
      <nav class="flex flex-col h-[12rem] md:(flex-row) my8">
        {#if nextPost}
          <div id="next-post" class="relative flex-1 group overflow-hidden bg-white/[0.5] dark:bg-black/[0.5]">
            <div class="absolute z-10 i-mdi-chevron-left !w-[1.5rem] !h-[1.5rem] top-[1.25rem] left-[0.75rem]" />
            <a
              sveltekit:prefetch
              rel="next"
              href="/{nextPost.slug}"
              alt="/{nextPost.slug}"
              class="absolute text-2xl font-bold z-10 !decoration-none !underline-none title-link-orange-500-orange-500 top-[3rem] left-[1rem] mr8">
              {nextPost.title}
            </a>
            {#if nextPost.cover}
              <ImgBanner
                src={nextPost.cover}
                imgClass="absolute z-1 w-full h-full object-cover op50 group-hover:(scale-110) transition-transform duration-350 ease-in-out" />
            {/if}
          </div>
        {/if}
        {#if prevPost}
          <div id="prev-post" class="relative flex-1 group overflow-hidden bg-white/[0.5] dark:bg-black/[0.5]">
            <a
              sveltekit:prefetch
              rel="prev"
              href="/{prevPost.slug}"
              alt="/{prevPost.slug}"
              class="absolute text-2xl font-bold z-10 !decoration-none !underline-none title-link-orange-500-orange-500 top-[3rem] right-[1rem] ml8">
              {prevPost.title}
            </a>
            <div class="absolute z-10 i-mdi-chevron-right !w-[1.5rem] !h-[1.5rem] top-[6rem] right-[0.75rem]" />
            {#if prevPost.cover}
              <ImgBanner
                src={prevPost.cover}
                imgClass="absolute z-1 w-full h-full object-cover op50 group-hover:(scale-110) transition-transform duration-350 ease-in-out" />
            {/if}
          </div>
        {/if}
      </nav>
    {/if}

    {#key $theme}
      <div class="my8 mx6">
        <Giscuss theme={$theme} />
      </div>
    {/key}
  </div>

  <div class="max-w-screen-md flex-1" />
</div>
