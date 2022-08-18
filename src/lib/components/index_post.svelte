<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { fly } from 'svelte/transition';
  import { dateConfig } from '$config/site';

  import ImgBanner from '$lib/components/image_banner.svelte';

  export let data: Post.Post;
  export let index: number;

  const postPublishedStr = new Date(data.published).toLocaleString(
    dateConfig.toPublishedString.locales,
    dateConfig.toPublishedString.options,
  );
  const postUpdatedStr = new Date(data.updated).toLocaleString(
    dateConfig.toUpdatedString.locales,
    dateConfig.toUpdatedString.options,
  );
</script>

{#if data}
  <article
    itemscope
    itemtype="https://schema.org/BlogPosting"
    itemprop="blogPost"
    in:fly={{ x: index % 2 ? 100 : -100, duration: 300, delay: 300 }}
    out:fly={{ x: index % 2 ? -100 : 100, duration: 300 }}
    class="flex flex-col relative w-full overflow-hidden group shadow-xl hover:(shadow-2xl) transform transition duration-250 min-h-[12rem] md:(min-h-[9rem] w-3xl rounded-lg !border-none hover:(scale-105)) light:(border-t-1 border-b-1 border-black) ">
    {#if data.cover && data.coverStyle !== 'NONE'}
      {#if data.coverStyle === 'IN'}
        <ImgBanner
          src={data.cover}
          imgClass="z1 blur-sm op80 absolute object-cover w-full h-full transition transform duration-250 ease-in-out group-hover:(scale-110 blur-none)" />
        <div class="z2 px-8 py-6 flex flex-col gap2 flex-1 dark:(bg-black/[0.5]) bg-white/[0.25]">
          <time class="dt-published op80" datetime={data.published} itemprop="datePublished">
            {postPublishedStr}
          </time>
          <time class="hidden dt-updated" datetime={data.updated} itemprop="dateModified">
            {postUpdatedStr}
          </time>
          <h2 class="text-3xl font-bold line-clamp-2 text-ellipsis" itemprop="name headline">
            <a sveltekit:prefetch href={data.slug} class="title-link-orange-500-orange-500" itemprop="url">
              {data.title}
            </a>
          </h2>
          <p class="text-lg line-clamp-2" itemprop="description">{data.summary}</p>
        </div>
      {:else}
        <div class:flex-col={['TOP', 'BOT'].indexOf(data.coverStyle) !== -1} class="flex md:border-none relative">
          <div
            class="overflow-hidden
            {['TOP', 'BOT'].indexOf(data.coverStyle) !== -1 ? 'h-[16rem]' : ''}
            {['RIGHT', 'LEFT'].indexOf(data.coverStyle) !== -1 ? 'w-[9rem] md:(w-[12rem])' : ''}"
            class:order-first={data.coverStyle === 'TOP' || data.coverStyle === 'LEFT'}
            class:order-last={data.coverStyle === 'BOT' || data.coverStyle === 'RIGHT'}>
            <a sveltekit:prefetch href={data.slug} alt={data.title} class="cursor-pointer" itemprop="url">
              <ImgBanner
                src={data.cover}
                imgClass="op90 group-hover:scale-110 transition transform duration-300 ease-in-out object-cover w-full h-full" />
            </a>
          </div>
          <div class="px8 py6 flex flex-col gap2 flex-1">
            <time class="dt-published op80" datetime={data.published} itemprop="datePublished">
              {postPublishedStr}
            </time>
            <time class="hidden dt-updated" datetime={data.updated} itemprop="dateModified">
              {postUpdatedStr}
            </time>
            <h2 class="text-3xl font-bold line-clamp-2 text-ellipsis" itemprop="name headline">
              <a
                sveltekit:prefetch
                href={data.slug}
                alt={data.title}
                class="title-link-orange-500-orange-500"
                itemprop="url">
                {data.title}
              </a>
            </h2>
            <p class="text-lg line-clamp-2" itemprop="description">{data.summary}</p>
          </div>
        </div>
      {/if}
    {:else}
      <div class="flex flex-col flex-1 gap2 px8 py6 bg-[#FAF9F6]/[0.75] dark:(bg-[#171717]/[0.75])">
        <time class="dt-published op80" datetime={data.published} itemprop="datePublished">
          {postPublishedStr}
        </time>
        <time class="hidden dt-updated" datetime={data.updated} itemprop="dateModified">
          {postUpdatedStr}
        </time>
        <h2 class="text-3xl font-bold line-clamp-2 text-ellipsis" itemprop="name headline">
          <a sveltekit:prefetch href={data.slug} class="title-link-orange-500-orange-500" itemprop="url">
            {#if data.title}
              {data.title}
            {:else}
              No Title
            {/if}
          </a>
        </h2>
        {#if data.summary}
          <p class="text-lg line-clamp-2" itemprop="description">{data.summary}</p>
        {/if}
      </div>
    {/if}
  </article>
{/if}
