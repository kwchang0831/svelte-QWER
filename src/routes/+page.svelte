<script lang="ts">
  import IndexProfile from '$lib/components/index_profile.svelte';
  import IndexPosts from '$lib/components/index_posts.svelte';
  import Tags from '$lib/components/tags_root.svelte';
  import { tagsCur, tagsShowMobile } from '$stores/tags';
  import { postsShow } from '$stores/posts';
  import { siteConfig } from '$config/site';

  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { query } from '$lib/search/stores';
  import LL from '$i18n/i18n-svelte';

  let iW: number = 0;
  let loaded = false;

  onMount(() => {
    loaded = true;
    tagsCur.init();
    postsShow.init();

    $page.url.searchParams.forEach((v, k) => {
      k = decodeURI(k);
      if (k.match(/^tags(-.*)?/)) {
        k = k.replace(/^tags-/, '');
        v.split(',').forEach((v) => {
          tagsCur.add(k, v);
        });
      }
    });

    query.set($page.url.searchParams.get('query') ?? '');
  });
</script>

<svelte:window bind:innerWidth={iW} />

<svelte:head>
  <title>{siteConfig.title}</title>
  <meta name="description" content={siteConfig.description} />
  <link rel="canonical" href={siteConfig.url} />

  <!-- OpenGraph -->
  <meta property="og:site_name" content={siteConfig.title} />
  <meta property="og:locale" content={siteConfig.lang} />
  <meta property="og:type" content="website" />

  <meta property="og:title" content={siteConfig.title} />
  <meta name="twitter:title" content={siteConfig.title} />

  <meta property="og:description" content={siteConfig.description} />
  <meta name="twitter:description" content={siteConfig.description} />

  <meta property="og:url" content={siteConfig.url} />
  <meta property="twitter:url" content={siteConfig.url} />

  <meta property="og:image" content={new URL(siteConfig.cover, siteConfig.url).href} />
  <meta name="twitter:image" content={new URL(siteConfig.cover, siteConfig.url).href} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{#if loaded}
  {#if iW < 1280}
    {#if $tagsShowMobile}
      <div
        in:fly={{ x: -100, y: -100, duration: 300, delay: 300 }}
        out:fly={{ x: -100, y: -100, duration: 300 }}
        class="mx6 my4">
        <Tags class="flex flex-col min-w-[12rem]" />
      </div>
    {:else}
      <div
        in:fly={{ y: 100, duration: 300, delay: 300 }}
        out:fly={{ y: 100, duration: 300 }}
        itemscope
        itemtype="https://schema.org/Blog"
        itemprop="blog"
        class="flex flex-nowrap justify-center flex-col items-center xl:(flex-row items-stretch)">
        <div class="max-w-screen-md flex-1 relative ml6">
          <IndexProfile class="flex flex-col gap2 items-center text-center" />
        </div>
        <div class="h-feed min-h-50vh flex-none w-full">
          <IndexPosts />
        </div>
      </div>
    {/if}
  {:else}
    <div
      itemscope
      itemtype="https://schema.org/Blog"
      itemprop="blog"
      class="flex flex-nowrap justify-center flex-col items-center xl:(flex-row items-stretch)">
      <div
        in:fly={{ x: -100, y: -100, duration: 300, delay: 300 }}
        out:fly={{ x: -100, y: 100, duration: 300 }}
        class="max-w-screen-md flex-1 relative ml6">
        <IndexProfile
          class="flex flex-col gap2 items-center text-center xl:(items-end text-right py4 sticky top-[4rem] min-w-[10rem])" />
      </div>

      <div
        in:fly={{ y: 100, duration: 300, delay: 300 }}
        out:fly={{ y: -100, duration: 300 }}
        class="h-feed min-h-50vh flex-none w-full md:(rounded-2xl w-[55rem])">
        <IndexPosts />
      </div>

      <div
        in:fly={{ x: 100, y: -100, duration: 300, delay: 300 }}
        out:fly={{ x: 100, y: 100, duration: 300 }}
        class="max-w-screen-md flex-1 relative mr6">
        <Tags class="hidden max-w-[20rem] xl:(flex flex-col min-w-[12rem] sticky top-[4rem])" />
      </div>
    </div>
  {/if}
{:else}
  <div
    class="h-[20rem] flex flex-col items-center justify-center gap4"
    in:fade={{ duration: 300, delay: 300 }}
    out:fade={{ duration: 300 }}>
    <h2 class="text-3xl">{$LL.LoadingPosts()}</h2>
    <div class="i-line-md-loading-twotone-loop !h-16 !w-16" />
  </div>
{/if}
