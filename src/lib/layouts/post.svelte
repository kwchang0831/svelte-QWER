<script lang="ts">
  import '$lib/styles/prism.scss';
  import '$lib/styles/prose.scss';
  import 'katex/dist/katex.min.css';

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

  import { theme } from '$stores/themes';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import LL from '$i18n/i18n-svelte';

  const thisPost = $postsAll.get($page.route?.id?.substring(1) ?? '') as Post.Post;
  const prevPost = thisPost?.prev ? $postsAll.get(thisPost.prev) : undefined;
  const nextPost = thisPost?.next ? $postsAll.get(thisPost.next) : undefined;
  let observer: IntersectionObserver;
  let postElement: HTMLElement;

  let loaded = false;

  $: if (loaded && postElement) {
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
  }

  onMount(() => {
    loaded = true;
  });
</script>

{#if thisPost}
  <SEO post={thisPost} />
{/if}

<main in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }} class="flex flex-nowrap justify-center">
  <div class="max-w-screen-md flex-1" />

  <article
    id="post"
    itemscope
    itemtype="https://schema.org/BlogPosting"
    itemprop="blogPost"
    class="h-entry flex-none flex flex-col max-w-[55rem] w-full xl:(rounded-t-2xl)">
    {#if loaded}
      <div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }} class="max-w-[55rem]">
        {#if thisPost}
          <PostHeading data={thisPost} />
        {/if}
      </div>

      <div
        in:fade={{ duration: 300, delay: 300 }}
        out:fade={{ duration: 300 }}
        bind:this={postElement}
        itemprop="articleBody"
        class="e-content prose prose-slate dark:prose-invert max-w-[55rem]">
        <slot name="post_content" />
      </div>
    {:else}
      <div
        class="h-[20rem] flex flex-col items-center justify-center gap4"
        in:fade={{ duration: 300, delay: 300 }}
        out:fade={{ duration: 300 }}>
        <h2 class="text-3xl">{$LL.LoadingPost()}</h2>
        <div class="i-line-md-loading-twotone-loop !h-16 !w-16" />
      </div>
    {/if}
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

{#if loaded}
  <div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }} class="flex flex-nowrap justify-center">
    <div class="max-w-screen-md flex-1" />

    <div id="post-bottom" class="flex-none flex flex-col max-w-[55rem] w-full xl:(rounded-b-2xl)">
      {#if thisPost}
        <TagsSection tags={thisPost.tags} />
      {/if}

      <div class="divider" />

      {#if nextPost || prevPost}
        <nav class="flex flex-col h-[20rem] md:(flex-row h-[12rem]) my8">
          {#if nextPost}
            <div id="next-post" class="relative flex-1 group overflow-hidden bg-white/[0.5] dark:bg-black/[0.5]">
              <div
                class="absolute z-10 i-mdi-chevron-left !w-[1.5rem] !h-[1.5rem] top-[1.25rem] left-[0.75rem] animate-bounce-left" />
              <a
                rel="next"
                href="/{nextPost.slug}"
                alt="/{nextPost.slug}"
                class="absolute text-2xl font-bold z-10 !decoration-none !underline-none title-link-orange-500-orange-500 top-[3rem] left-[1rem] mr8">
                {nextPost.title}
              </a>
              {#if nextPost.cover}
                <ImgBanner
                  src={nextPost.cover}
                  imgClass="absolute z-1 w-full h-full object-cover op70 group-hover:(scale-110) transition-transform duration-300 ease-in-out" />
              {/if}
            </div>
          {/if}
          {#if prevPost}
            <div id="prev-post" class="relative flex-1 group overflow-hidden bg-white/[0.5] dark:bg-black/[0.5]">
              <a
                rel="prev"
                href="/{prevPost.slug}"
                alt="/{prevPost.slug}"
                class="absolute text-2xl font-bold z-10 !decoration-none !underline-none title-link-orange-500-orange-500 top-[3rem] right-[1rem] ml8">
                {prevPost.title}
              </a>
              <div
                class="absolute z-10 i-mdi-chevron-right !w-[1.5rem] !h-[1.5rem] top-[6rem] right-[0.75rem] animate-bounce-right" />
              {#if prevPost.cover}
                <ImgBanner
                  src={prevPost.cover}
                  imgClass="absolute z-1 w-full h-full object-cover op70 group-hover:(scale-110) transition-transform duration-300 ease-in-out" />
              {/if}
            </div>
          {/if}
        </nav>
      {/if}

      {#key $theme}
        <div itemscope itemtype="https://schema.org/Comment" itemprop="comment" class="my8 mx6">
          <Giscuss theme={$theme} />
        </div>
      {/key}
    </div>

    <div class="max-w-screen-md flex-1" />
  </div>
{/if}

<style lang="scss">
  #post {
    background-color: var(--qwer-bg-color);
  }

  #post-bottom {
    background-color: var(--qwer-bg-color);
  }

  @keyframes bounce-right {
    from,
    20%,
    53%,
    80%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(-30px, 0, 0);
    }
    70% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(-15px, 0, 0);
    }
    90% {
      transform: translate3d(-4px, 0, 0);
    }
  }
  .animate-bounce-right {
    animation: bounce-right 1s linear infinite;
    transform-origin: center bottom;
  }

  @keyframes bounce-left {
    from,
    20%,
    53%,
    80%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(30px, 0, 0);
    }
    70% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(15px, 0, 0);
    }
    90% {
      transform: translate3d(4px, 0, 0);
    }
  }
  .animate-bounce-left {
    animation: bounce-left 1s linear infinite;
    transform-origin: center bottom;
  }
</style>
