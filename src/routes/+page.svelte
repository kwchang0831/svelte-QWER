<script lang="ts">
  import IndexProfile from '$lib/components/index_profile.svelte';
  import IndexPosts from '$lib/components/index_posts.svelte';
  import Tags from '$lib/components/tags_root.svelte';
  import { tagsCur } from '$stores/tags';
  import { postsShow } from '$stores/posts';
  import { siteConfig } from '$config/site';

  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  onMount(() => {
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

    postsShow.filter($tagsCur);
  });

  let iW: number;
</script>

<svelte:window bind:innerWidth={iW} />

<svelte:head>
  <title>{siteConfig.title}</title>
  <meta name="description" content={siteConfig.description} />
  <link rel="canonical" href={siteConfig.url} />

  <!-- OpenGraph -->
  <meta property="og:site_name" content={siteConfig.title} />
  <meta property="og:locale" content={siteConfig.lang} />

  <meta property="og:title" content={siteConfig.title} />
  <meta property="og:description" content={siteConfig.description} />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={siteConfig.url} />

  {#if siteConfig.author.avatar}
    <meta property="og:image" content={siteConfig.author.avatar} />
    <meta name="twitter:card" content="summary_large_image" />
  {:else}
    <meta property="og:image" content={new URL(siteConfig.og_card, $page.url.origin).href} />
    <meta name="twitter:card" content="summary" />
  {/if}
</svelte:head>

<div class="flex flex-nowrap justify-center flex-col items-center xl:(flex-row items-stretch)">
  <div
    in:fly={{ x: iW < 1280 ? 0 : -100, y: iW < 1280 ? 0 : -100, duration: 300, delay: 300 }}
    out:fly={{ x: iW < 1280 ? 0 : -100, y: iW < 1280 ? 0 : 100, duration: 300 }}
    class="max-w-screen-md flex-1 relative ml6">
    <IndexProfile class="flex flex-col gap2 items-center text-center xl:(items-end text-right sticky top-[5rem])" />
  </div>

  <div
    in:fly={{ y: 100, duration: 300, delay: 300 }}
    out:fly={{ y: -100, duration: 300 }}
    class="max-w-[55rem] flex-none w-full md:(rounded-2xl)">
    <IndexPosts />
  </div>

  <div
    in:fly={{ x: 100, y: -100, duration: 300, delay: 300 }}
    out:fly={{ x: 100, y: 100, duration: 300 }}
    class="max-w-screen-md flex-1 relative mr6">
    <Tags class="hidden max-w-[20rem] xl:(flex flex-col)" />
  </div>
</div>
