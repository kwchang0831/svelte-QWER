<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { fly } from 'svelte/transition';

  export let indexPost: Post.IndexPost;

  const postPublishedStr = new Date(indexPost.post.published).toLocaleString('en-US', {
    year: 'numeric',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Taipei',
  });

  const postCoverPath = indexPost.post.cover?.startsWith('./')
    ? `${indexPost.post.slug}/${indexPost.post.cover.slice(2)}`
    : `${indexPost.post.cover}`;
</script>

{#if indexPost && indexPost.post}
  <article
    in:fly={{ x: indexPost.id % 2 ? 100 : -100, duration: 300, delay: 300 }}
    out:fly={{ x: indexPost.id % 2 ? -100 : 100, duration: 300 }}
    class="min-h-[12rem] overflow-hidden group hover:shadow-2xl w-full transform transition duration-250 border-t-1 border-b-1 border-black md:(min-h-[9rem] w-3xl rounded-lg !border-none border-transparent hover:(scale-105)) bg-[#FAF9F6]/[0.75]  dark:(bg-[#171717]/[0.75] border-white)">
    {#if indexPost.post.cover}
      {#if indexPost.post.coverStyle !== undefined}
        {#if indexPost.post.coverStyle === 'IN'}
          <div
            class="z-2 absolute px-8 py-6 flex flex-col gap1 h-full w-full dark:(bg-black/[0.5]) bg-white/[0.5] min-h-[9rem]">
            <div class="">{postPublishedStr}</div>
            <h2 class="text-2xl font-bold">
              <a sveltekit:prefetch href={indexPost.post.slug} class="title-link-orange-500-orange-500">
                {indexPost.post.title}
              </a>
            </h2>
            <p class="font-medium">{indexPost.post.summary}</p>
          </div>
          <img
            class="z-1 op50 group-hover:scale-105 absolute w-full h-full transition-all duration-500 ease-in-out transform object-cover"
            src={postCoverPath}
            alt={postCoverPath} />
        {:else}
          <div
            class:flex-col={['TOP', 'BOT'].indexOf(indexPost.post.coverStyle) !== -1}
            class="flex md:border-none relative min-h-[9rem]">
            <div
              class="overflow-hidden
              {['TOP', 'BOT'].indexOf(indexPost.post.coverStyle) !== -1 ? 'h-[16rem]' : ''}
              {['RIGHT', 'LEFT'].indexOf(indexPost.post.coverStyle) !== -1 ? 'w-[14rem]' : ''}"
              class:order-first={indexPost.post.coverStyle === 'TOP' || indexPost.post.coverStyle === 'LEFT'}
              class:order-last={indexPost.post.coverStyle === 'BOT' || indexPost.post.coverStyle === 'RIGHT'}>
              <a sveltekit:prefetch href={indexPost.post.slug} alt={indexPost.post.title} class="cursor-pointer">
                <img
                  class="op90 group-hover:scale-110 transition-all duration-500 ease-in-out transform object-cover w-full h-full"
                  src={postCoverPath}
                  alt={postCoverPath} />
              </a>
            </div>
            <div class="px8 py6 flex flex-col gap1 grow">
              <div class="">{postPublishedStr}</div>
              <h2 class="text-2xl font-bold">
                <a
                  sveltekit:prefetch
                  href={indexPost.post.slug}
                  alt={indexPost.post.title}
                  class="title-link-orange-500-orange-500">
                  {indexPost.post.title}
                </a>
              </h2>
              <p class="font-medium">{indexPost.post.summary}</p>
            </div>
          </div>
        {/if}
      {/if}
    {:else}
      <div class="flex flex-col border-t-1 border-b-1 md:border-none">
        <div class="px-8 py-8 grow">
          <div class="">{postPublishedStr}</div>
          <h2 class="text-2xl font-bold">
            <a sveltekit:prefetch href={indexPost.post.slug} class="title-link-orange-500-orange-500">
              {indexPost.post.title}
            </a>
          </h2>
          <p class="font-medium">{indexPost.post.summary}</p>
        </div>
      </div>
    {/if}
  </article>
{/if}
