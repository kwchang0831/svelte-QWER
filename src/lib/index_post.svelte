<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { fly } from 'svelte/transition';

  export let post: Post.Post;
  export let order: number;
</script>

{#if post}
  <article
    in:fly={{ x: order % 2 ? 100 : -100, duration: 300, delay: 300 }}
    out:fly={{ x: order % 2 ? -100 : 100, duration: 300 }}
    class="min-h-[9rem] overflow-hidden group hover:shadow-2xl w-full transform transition duration-250 border-t-1 border-b-1 border-black md:(w-3xl rounded-lg !border-none border-transparent hover:(scale-105)) bg-[#FAF9F6]/[0.75]  dark:(bg-[#171717]/[0.75] border-white)">
    {#if post.cover}
      {#if post.coverStyle !== undefined}
        {#if post.coverStyle === 'IN'}
          <div class="z-2 absolute px-8 py-6 flex flex-col gap1 h-full w-full dark:(bg-black/[0.5]) bg-white/[0.5] min-h-[9rem]">
            <div class="">{post.published}</div>
            <h2 class="text-2xl font-bold">
              <a sveltekit:prefetch href={post.slug} class="title-link-orange-500-orange-500">{post.title}</a>
            </h2>
            <p class="font-medium">{post.summary}</p>
          </div>
          <img
            class="z-1 group-hover:scale-105 absolute w-full h-full transition-all duration-500 ease-in-out transform object-cover"
            src={post.cover}
            alt={post.cover} />
        {:else}
          <div
            class:flex-col={['TOP', 'BOT'].indexOf(post.coverStyle) !== -1}
            class="flex md:border-none relative min-h-[9rem]">
            <div
              class="overflow-hidden
              {['TOP', 'BOT'].indexOf(post.coverStyle) !== -1 ? 'h-[16rem]' : ''}
              {['RIGHT', 'LEFT'].indexOf(post.coverStyle) !== -1 ? 'w-[14rem]' : ''}"
              class:order-first={post.coverStyle === 'TOP' || post.coverStyle === 'LEFT'}
              class:order-last={post.coverStyle === 'BOT' || post.coverStyle === 'RIGHT'}>
              <a sveltekit:prefetch href={post.slug} alt={post.title} class="cursor-pointer">
                <img
                  class="op90 group-hover:scale-110 transition-all duration-500 ease-in-out transform object-cover w-full h-full"
                  src={post.cover}
                  alt={post.cover} />
              </a>
            </div>
            <div class="px8 py6 flex flex-col gap1 grow">
              <div class="">{post.published}</div>
              <h2 class="text-2xl font-bold">
                <a sveltekit:prefetch href={post.slug} alt={post.title} class="title-link-orange-500-orange-500">{post.title}</a>
              </h2>
              <p class="font-medium">{post.summary}</p>
            </div>
          </div>
        {/if}
      {/if}
    {:else}
      <div class="flex flex-col border-t-1 border-b-1 md:border-none">
        <div class="px-8 py-8 grow">
          <div class="">{post.published}</div>
          <h2 class="text-2xl font-bold">
            <a sveltekit:prefetch href={post.slug} class="title-link-orange-500-orange-500">{post.title}</a>
          </h2>
          <p class="font-medium">{post.summary}</p>
        </div>
      </div>
    {/if}
  </article>
{/if}
