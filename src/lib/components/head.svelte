<script lang="ts">
  import { dev } from '$app/env';
  import { headConfig } from '$config/site';
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="generator" content="gh:kwchang0831/svelte-QWER" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content="kwchang0831" />
  <link rel="manifest" crossorigin="use-credentials" href="/manifest.webmanifest" />
  <link rel="alternate" type="application/feed+json" href="/feed.json" />
  <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
  <link rel="icon" href="/favicon.png" />

  {#if headConfig.custom}
    {#each headConfig.custom({ dev }) as tag}
      {@html tag}
    {/each}
  {/if}
</svelte:head>
