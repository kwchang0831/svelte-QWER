<script lang="ts">
  import { dev } from '$app/env';
  import { headConfig, siteConfig } from '$config/site';
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="generator" content="gh:kwchang0831/svelte-QWER" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content="kwchang0831" />
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />

  <link rel="shortcut icon" href="/favicon.png" type="image/png" />
  <link rel="apple-touch-icon" href={siteConfig.author.avatar_192_png} sizes="192x192" type="image/png" />

  <link rel="manifest" crossorigin="use-credentials" href="/manifest.webmanifest" />
  <link rel="alternate" type="application/feed+json" href="/feed.json" />
  <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

  {#if headConfig.custom}
    {#each headConfig.custom({ dev }) as tag}
      {@html tag}
    {/each}
  {/if}
</svelte:head>
