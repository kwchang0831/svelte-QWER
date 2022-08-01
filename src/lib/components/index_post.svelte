<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { fly } from 'svelte/transition';
  import { dateConfig } from '$config/site';

  import ImgR from '$lib/components/image_responsive.svelte';
  import { onMount } from 'svelte';

  export let data: Post.Post;
  export let index: number;

  const postPublishedStr = new Date(data.published).toLocaleString(
    dateConfig.toPublishedString.locales,
    dateConfig.toPublishedString.options,
  );

  onMount(() => {});
</script>

{#if data}
  <article
    in:fly={{ x: index % 2 ? 100 : -100, duration: 300, delay: 300 }}
    out:fly={{ x: index % 2 ? -100 : 100, duration: 300 }}
    class="flex flex-col relative w-full overflow-hidden group shadow-xl hover:(shadow-2xl) transform transition duration-250 min-h-[12rem] md:(min-h-[9rem] w-3xl rounded-lg !border-none hover:(scale-105)) light:(border-t-1 border-b-1 border-black) ">
    {#if data.cover}
      {#if data.coverStyle !== undefined}
        {#if data.coverStyle === 'IN'}
          <ImgR
            src={data.cover}
            imgClass="z1 blur-sm op50 absolute object-cover w-full h-full transition transform duration-250 ease-in-out group-hover:(scale-110 blur-none)" />
          <div class="z2 px-8 py-6 flex flex-col gap1 flex-1 dark:(bg-black/[0.5]) bg-white/[0.25]">
            <div class="">{postPublishedStr}</div>
            <h2 class="text-2xl font-bold">
              <a sveltekit:prefetch href={data.slug} class="title-link-orange-500-orange-500">
                {data.title}
              </a>
            </h2>
            <p class="font-medium line-clamp-2">{data.summary}</p>
          </div>
        {:else}
          <div class:flex-col={['TOP', 'BOT'].indexOf(data.coverStyle) !== -1} class="flex md:border-none relative">
            <div
              class="overflow-hidden
            {['TOP', 'BOT'].indexOf(data.coverStyle) !== -1 ? 'h-[16rem]' : ''}
            {['RIGHT', 'LEFT'].indexOf(data.coverStyle) !== -1 ? 'w-[9rem] md:(w-[12rem])' : ''}"
              class:order-first={data.coverStyle === 'TOP' || data.coverStyle === 'LEFT'}
              class:order-last={data.coverStyle === 'BOT' || data.coverStyle === 'RIGHT'}>
              <a sveltekit:prefetch href={data.slug} alt={data.title} class="cursor-pointer">
                <ImgR
                  src={data.cover}
                  imgClass="op90 group-hover:scale-110 transition transform duration-300 ease-in-out object-cover w-full h-full" />
              </a>
            </div>
            <div class="px8 py6 flex flex-col gap1 flex-1">
              <div class="">{postPublishedStr}</div>
              <h2 class="text-2xl font-bold">
                <a sveltekit:prefetch href={data.slug} alt={data.title} class="title-link-orange-500-orange-500">
                  {data.title}
                </a>
              </h2>
              <p class="font-medium line-clamp-2">{data.summary}</p>
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
        <p class="font-medium line-clamp-2">{data.summary}</p>
      </div>
    {/if}
  </article>
{/if}
