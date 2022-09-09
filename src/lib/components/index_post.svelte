<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { fly } from 'svelte/transition';
  import { dateConfig } from '$config/site';
  import { Config } from '$config/QWER.confitg';
  import { tagsCur } from '$stores/tags';
  import { postsShow } from '$stores/posts';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import type { Tags } from '$lib/types/tags';

  import ImgBanner from '$lib/components/image_banner.svelte';

  const numberPostsEager = 5;

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

  function handleClick(tag: Tags.Tag) {
    tagsCur.toggle(tag);
    postsShow.filter();
    if (browser && window.location.pathname === '/') {
      let output = new URLSearchParams();
      $page.url.searchParams.forEach((v, k) => {
        if (k.match(/^(?!(tags(-.*)?))/)) output.append(k, v);
      });
      $tagsCur.forEach((v, k) => {
        output.append(k === 'tags' ? k : `tags-${encodeURI(k)}`, Array.from(v).join(','));
      });
      const params = output.toString();
      if (params) window.history.replaceState({}, '', `?${params}`);
      else window.history.replaceState({}, '', '/');
    }
  }
</script>

{#if data}
  <article
    itemscope
    itemtype="https://schema.org/BlogPosting"
    itemprop="blogPost"
    in:fly={{ x: index % 2 ? 100 : -100, duration: 300, delay: 300 }}
    out:fly={{ x: index % 2 ? -100 : 100, duration: 300 }}
    class="flex flex-col relative w-full overflow-hidden group shadow-xl hover:(shadow-2xl) transform transition duration-300 min-h-[12rem] md:(min-h-[9rem] w-3xl rounded-lg !border-none hover:(scale-105)) light:(border-t-1 border-b-1 border-black) ">
    {#if data.series_tag && data.series_title}
      <div class="flex items-stretch gap-0 z2 border-b-3 border-amber-400">
        <div
          class="py2 bg-green-500 hover:(bg-amber-400) cursor-pointer"
          on:click={() => handleClick({ name: data.series_tag ?? '', category: Config.SeriesTagName })}>
          <div class="pl-4 pr-3 text-sm font-bold text-black"># {data.series_tag} {Config.SeriesTagName}</div>
        </div>
        <div class="flex-1 py-2 md:rounded-tr-2xl bg-[#FAF9F6] dark:(bg-[#171717])">
          <div
            class="px-3 text-sm font-semibold tracking-wide align-middle whitespace-normal line-clamp-1 text-ellipsis">
            {data.series_title}
          </div>
        </div>
      </div>
    {/if}

    {#if data.cover && data.coverStyle !== 'NONE'}
      {#if data.coverStyle === 'IN'}
        <ImgBanner
          loading={index < numberPostsEager ? 'eager' : 'lazy'}
          decoding={index < numberPostsEager ? 'auto' : 'async'}
          src={data.cover}
          imgClass="z1 blur-sm op80 absolute object-cover w-full h-full transition transform duration-300 ease-in-out group-hover:(scale-110 blur-none)" />
        <div class="z2 px8 pt4 pb6 flex flex-col gap2 flex-1 dark:(bg-black/[0.5]) bg-white/[0.25]">
          <time class="dt-published op80 group-hover:font-600" datetime={data.published} itemprop="datePublished">
            {postPublishedStr}
          </time>
          <time class="hidden dt-updated" datetime={data.updated} itemprop="dateModified">
            {postUpdatedStr}
          </time>
          <h2 class="text-2xl font-bold line-clamp-2 text-ellipsis group-hover:font-900" itemprop="name headline">
            <a href={data.slug} class="u-url title-link-orange-500-orange-500" itemprop="url">
              {data.title}
            </a>
          </h2>
          <p class="text-lg line-clamp-2 group-hover:font-600" itemprop="description">{data.summary}</p>
        </div>
      {:else}
        <div class:flex-col={['TOP', 'BOT'].indexOf(data.coverStyle) !== -1} class="flex md:border-none relative">
          <div
            class="overflow-hidden
            {['TOP', 'BOT'].indexOf(data.coverStyle) !== -1 ? 'h-[16rem]' : ''}
            {['RIGHT', 'LEFT'].indexOf(data.coverStyle) !== -1 ? 'w-[9rem] md:(w-[12rem])' : ''}"
            class:order-first={data.coverStyle === 'TOP' || data.coverStyle === 'LEFT'}
            class:order-last={data.coverStyle === 'BOT' || data.coverStyle === 'RIGHT'}>
            <a href={data.slug} alt={data.title} class="cursor-pointer" itemprop="url">
              <ImgBanner
                src={data.cover}
                loading={index < numberPostsEager ? 'eager' : 'lazy'}
                decoding={index < numberPostsEager ? 'auto' : 'async'}
                imgClass="op90 group-hover:scale-110 transition transform duration-300 ease-in-out object-cover w-full h-full" />
            </a>
          </div>
          <div class="px8 pt4 pb6 flex flex-col gap2 flex-1">
            <time class="dt-published op80 group-hover:font-600" datetime={data.published} itemprop="datePublished">
              {postPublishedStr}
            </time>
            <time class="hidden dt-updated" datetime={data.updated} itemprop="dateModified">
              {postUpdatedStr}
            </time>
            <h2 class="text-2xl font-bold line-clamp-2 text-ellipsis group-hover:font-900" itemprop="name headline">
              <a href={data.slug} alt={data.title} class=" u-url title-link-orange-500-orange-500" itemprop="url">
                {data.title}
              </a>
            </h2>
            <p class="text-lg line-clamp-2 group-hover:font-600" itemprop="description">{data.summary}</p>
          </div>
        </div>
      {/if}
    {:else}
      <div class="flex flex-col flex-1 gap2 px8 pt4 pb6 bg-[#FAF9F6]/[0.75] dark:(bg-[#171717]/[0.75])">
        <time class="dt-published op80 group-hover:font-600" datetime={data.published} itemprop="datePublished">
          {postPublishedStr}
        </time>
        <time class="hidden dt-updated" datetime={data.updated} itemprop="dateModified">
          {postUpdatedStr}
        </time>

        <h2 class="text-2xl font-bold line-clamp-2 text-ellipsis group-hover:font-900" itemprop="name headline">
          <a href={data.slug} class="u-url title-link-orange-500-orange-500" itemprop="url">
            {#if data.title}
              {data.title}
            {:else}
              No Title
            {/if}
          </a>
        </h2>
        {#if data.summary}
          <p class="text-lg line-clamp-2 group-hover:font-600" itemprop="description">{data.summary}</p>
        {/if}
      </div>
    {/if}
  </article>
{/if}
