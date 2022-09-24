<script lang="ts">
  import { dev } from '$app/environment';
  import { headConfig, siteConfig } from '$config/site';
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
  <meta name="author" content={siteConfig.author.name} />

  <link rel="apple-touch-icon" href={siteConfig.author.avatar_192_png} sizes="192x192" type="image/png" />
  <link rel="shortcut icon" href="/favicon.png" type="image/png" />

  <meta
    name="generator"
    content={'\x67\x68\x3A\x6B\x77\x63\x68\x61\x6E\x67\x30\x38\x33\x31\x2F\x73\x76\x65\x6C\x74\x65\x2D\x51\x57\x45\x52'} />
  <link rel="manifest" crossorigin="use-credentials" href="/manifest.webmanifest" />
  <link rel="alternate" type="application/feed+json" href="/feed.json" />
  <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

  {#if headConfig.me}
    {#each headConfig.me as href}
      <link rel="me" {href} />
    {/each}
  {/if}

  {#if headConfig.custom}
    {#each headConfig.custom({ dev }) as tag}
      {#if tag}{@html tag}{/if}
    {/each}
  {/if}
</svelte:head>
