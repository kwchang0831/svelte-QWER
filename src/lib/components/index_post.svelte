<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { fly } from 'svelte/transition';
  import { dateConfig } from '$config/site';
  import { UserConfig } from '$config/QWER.config';
  import { tagsCur } from '$stores/tags';
  import { postsShow } from '$stores/posts';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import type { Tags } from '$lib/types/tags';

  import ImgBanner from '$lib/components/image_banner.svelte';

  const numberPostsEager = 3;

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
    class="index-post flex flex-col relative w-full overflow-hidden group shadow-xl hover:(shadow-2xl) transform transition duration-300 md:(w-3xl rounded-lg hover:(scale-105))  ">
    {#if data.series_tag && data.series_title}
      <div class="series flex items-stretch gap-0 z10">
        <div
          class="series-tag py2 cursor-pointer"
          on:click={() => handleClick({ name: data.series_tag ?? '', category: UserConfig.SeriesTagName })}
          on:keydown={(e) => {
            if (e.key === 'Enter') {
              handleClick({ name: data.series_tag ?? '', category: UserConfig.SeriesTagName });
            }
          }}>
          <div class="pl-4 pr-3 text-sm font-bold"># {data.series_tag} {UserConfig.SeriesTagName}</div>
        </div>
        <div class="series-title flex-1 py-2 md:rounded-tr-2xl">
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
        <div class="coverStyle-IN z2 px8 pt4 pb6 flex flex-col gap2 bg-white/[0.25] dark:bg-black/[0.25]">
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
            {['TOP', 'BOT'].indexOf(data.coverStyle) !== -1 ? 'coverStyle-TOPnBOT' : ''}
            {['RIGHT', 'LEFT'].indexOf(data.coverStyle) !== -1 ? 'coverStyle-RnL' : ''}"
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
          <div class="index-post-panel px8 pt4 pb6 flex flex-col gap2 flex-1">
            <time class="dt-published op80 group-hover:font-600" datetime={data.published} itemprop="datePublished">
              {postPublishedStr}
            </time>
            <time class="hidden dt-updated" datetime={data.updated} itemprop="dateModified">
              {postUpdatedStr}
            </time>
            <h2 class="text-2xl font-bold line-clamp-2 text-ellipsis group-hover:font-900" itemprop="name headline">
              <a href={data.slug} alt={data.title} class="u-url title-link-orange-500-orange-500" itemprop="url">
                {data.title}
              </a>
            </h2>
            <p class="text-lg line-clamp-2 group-hover:font-600" itemprop="description">{data.summary}</p>
          </div>
        </div>
      {/if}
    {:else}
      <div class="index-post-panel flex flex-col flex-1 gap2 px8 pt4 pb6">
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

<style lang="scss">
  .index-post {
    border-top: var(--qwer-border-mobile);
    border-bottom: var(--qwer-border-mobile);
    color: var(--qwer-text-color);
    h2 a {
      color: var(--qwer-title-color);

      &:hover {
        color: var(--qwer-title-hover-color);
      }
    }
  }

  .coverStyle-TOPnBOT {
    height: var(--qwer-cover-height-TOPnBOT-mobile);
  }
  .coverStyle-RnL {
    width: var(--qwer-cover-width-RnL-mobile);
  }

  .coverStyle-IN {
    height: var(--qwer-cover-height-IN-mobile);
  }

  @media (min-width: 768px) {
    .index-post {
      border: var(--qwer-border-desktop);
    }

    .coverStyle-TOPnBOT {
      height: var(--qwer-cover-height-TOPnBOT);
    }
    .coverStyle-RnL {
      width: var(--qwer-cover-width-RnL);
    }
    .coverStyle-IN {
      height: var(--qwer-cover-height-IN);
    }
  }

  .index-post-panel {
    background-color: var(--qwer-bg-color);
    min-height: var(--qwer-min-height);
  }

  .series {
    border-bottom: 3px solid var(--qwer-series-border-color);
    box-shadow: 0 0 3px var(--qwer-series-border-color);
  }

  .series-tag {
    background-color: var(--qwer-series-bg-color);
    color: var(--qwer-series-tag-text-color);
    &:hover {
      background-color: var(--qwer-series-bg-hover-color);
    }
  }

  .series-title {
    background-color: var(--qwer-bg-color);
    color: var(--qwer-series-title-text-color);
  }
</style>
