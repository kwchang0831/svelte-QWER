<script lang="ts">
  import { page } from '$app/stores';
  import { assets } from '$generated/assets';
  import type { Post } from '$lib/types/post';
  import { siteConfig } from '$config/site';

  export let post: Post.Post;
</script>

<svelte:head>
  <title>{post.title} | {siteConfig.title}</title>
  <meta name="description" content={post.description} />
  <link rel="canonical" href={new URL(post.slug, siteConfig.url).href} />

  <!-- OpenGraph -->
  <meta property="og:site_name" content={siteConfig.title} />
  <meta property="og:locale" content={siteConfig.lang} />

  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.description} />

  <meta property="og:type" content="article" />
  <meta property="og:url" content={new URL(post.slug, siteConfig.url).href} />
  <meta property="article:author" content={siteConfig.author.name} />
  <meta property="article:published_time" content={post.published} />
  <meta property="article:modified_time" content={post.updated} />

  {#if post.cover}
    <meta property="og:image" content={$assets.get(post.cover)?.original} />
    <meta name="twitter:card" content="summary_large_image" />
  {:else}
    <meta property="og:image" content={new URL(siteConfig.og_card, $page.url.origin).href} />
    <meta name="twitter:card" content="summary" />
  {/if}
</svelte:head>
