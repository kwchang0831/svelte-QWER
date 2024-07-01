<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import type { Asset } from '$generated/asset';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { assets } from '$generated/assets';
  import type { Post } from '$lib/types/post';
  import { siteConfig } from '$config/site';

  export let post: Post.Post;
  let post_cover: Asset.Image | undefined | string = $assets.get(post.cover ?? '') || post.cover;
</script>

<svelte:head>
  <title>{post.title} | {siteConfig.title}</title>
  <meta name="description" content={post.description} />
  <link rel="canonical" href={new URL(post.slug, siteConfig.url).href} />

  <!-- OpenGraph -->
  <meta property="og:site_name" content={siteConfig.title} />
  <meta property="og:locale" content={siteConfig.lang} />
  <meta property="og:type" content="article" />

  <meta property="og:title" content={post.title} />
  <meta name="twitter:title" content={new URL(post.slug, siteConfig.url).href} />

  <meta property="og:description" content={post.description} />
  <meta name="twitter:description" content={post.description} />

  <meta property="og:url" content={new URL(post.slug, siteConfig.url).href} />
  <meta property="twitter:url" content={new URL(post.slug, siteConfig.url).href} />

  <meta property="article:author" content={siteConfig.author.name} />
  <meta property="article:published_time" content={post.published} />
  <meta property="article:modified_time" content={post.updated} />

  <meta name="twitter:card" content="summary_large_image" />

  {#if post_cover && typeof post_cover !== 'string' && post_cover.original}
    <meta property="og:image" content={new URL(post_cover.original, siteConfig.url).href} />
    <meta property="og:image:width" content={'' + post_cover.width} />
    <meta property="og:image:height" content={'' + post_cover.height} />
    <meta name="twitter:image" content={new URL(post_cover.original, siteConfig.url).href} />
  {:else if typeof post_cover === 'string'}
    <meta property="og:image" content={post_cover} />
    <meta name="twitter:image" content={post_cover} />
  {:else}
    <meta property="og:image" content={new URL(siteConfig.cover, siteConfig.url).href} />
    <meta name="twitter:image" content={new URL(siteConfig.cover, siteConfig.url).href} />
  {/if}

  {@html `<script type="application/ld+json">${
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      image: post_cover
        ? [new URL(typeof post_cover === 'string' ? post_cover : post_cover.original, siteConfig.url).href]
        : [],
      datePublished: post.published,
      dateModified: post.updated,
      author: [
        {
          '@type': 'Person',
          name: siteConfig.author.name,
          url: siteConfig.author.github,
        },
      ],
    }) + '<'
  }/script>`}
</svelte:head>
