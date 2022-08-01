<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { fly } from 'svelte/transition';
  import { dateConfig } from '$config/site';
  import { assets } from '$generated/assets';
  import { onMount } from 'svelte';

  export let data: Post.Post;
  export let index: number;
  let assetCover = data.cover && $assets.get(data.cover);

  const postPublishedStr = new Date(data.published).toLocaleString(
    dateConfig.toPublishedString.locales,
    dateConfig.toPublishedString.options,
  );

  // onMount(() => {
  //   console.log(data);
  //   console.log(assetCover);
  // });
</script>

{#if data}
  <article
    in:fly={{ x: index % 2 ? 100 : -100, duration: 300, delay: 300 }}
    out:fly={{ x: index % 2 ? -100 : 100, duration: 300 }}
    class="flex flex-col overflow-hidden group hover:shadow-2xl w-full transform transition duration-250 border-t-1 border-b-1 border-black md:(min-h-[9rem] w-3xl rounded-lg !border-none border-transparent hover:(scale-105)) bg-[#FAF9F6]/[0.75] dark:(bg-[#171717]/[0.75] border-white)">
    {#if data.cover}
      {#if data.coverStyle !== undefined}
        {#if data.coverStyle === 'IN'}
          <div class="z-2 px-8 py-6 flex flex-col gap1 flex-1 dark:(bg-black/[0.5]) bg-white/[0.5]">
            <div class="">{postPublishedStr}</div>
            <h2 class="text-2xl font-bold">
              <a sveltekit:prefetch href={data.slug} class="title-link-orange-500-orange-500">
                {data.title}
              </a>
            </h2>
            <p class="font-medium">{data.summary}</p>
          </div>
          {#if assetCover}
            <picture
              class="z-1 op50 group-hover:scale-105 absolute w-full h-full transition-all duration-500 ease-in-out transform object-cover">
              <source srcset={assetCover.banner[1]} type="image/avif" />
              <source srcset={assetCover.banner[0]} type="image/webp" />
              <img src={assetCover.original} alt={data.cover} width="800" height="150" />
            </picture>
          {:else}
            <img
              class="z-1 op50 group-hover:scale-105 absolute w-full h-full transition-all duration-500 ease-in-out transform object-cover"
              src={data.cover}
              alt={data.cover}
              width="180"
              height="150" />
          {/if}
        {:else}
          <div class:flex-col={['TOP', 'BOT'].indexOf(data.coverStyle) !== -1} class="flex md:border-none relative">
            <div
              class="overflow-hidden
              {['TOP', 'BOT'].indexOf(data.coverStyle) !== -1 ? 'h-[16rem]' : ''}
              {['RIGHT', 'LEFT'].indexOf(data.coverStyle) !== -1 ? 'w-[16rem]' : ''}"
              class:order-first={data.coverStyle === 'TOP' || data.coverStyle === 'LEFT'}
              class:order-last={data.coverStyle === 'BOT' || data.coverStyle === 'RIGHT'}>
              <a sveltekit:prefetch href={data.slug} alt={data.title} class="cursor-pointer">
                <img
                  class="op90 group-hover:scale-110 transition-all duration-500 ease-in-out transform object-cover w-full h-full"
                  src={data.cover}
                  alt={data.cover} />
              </a>
            </div>
            <div class="px8 py6 flex flex-col gap1 grow">
              <div class="">{postPublishedStr}</div>
              <h2 class="text-2xl font-bold">
                <a sveltekit:prefetch href={data.slug} alt={data.title} class="title-link-orange-500-orange-500">
                  {data.title}
                </a>
              </h2>
              <p class="font-medium">{data.summary}</p>
            </div>
          </div>
        {/if}
      {/if}
    {:else}
      <div class="flex flex-col flex-1 gap1 px8 py6 bg-[#FAF9F6]/[0.75] dark:(bg-[#171717]/[0.75])">
        <div class="">{postPublishedStr}</div>
        <h2 class="text-2xl font-bold">
          <a sveltekit:prefetch href={data.slug} class="title-link-orange-500-orange-500">
            {data.title}
          </a>
        </h2>
        <p class="font-medium truncate">{data.summary}</p>
      </div>
    {/if}
  </article>
{/if}
