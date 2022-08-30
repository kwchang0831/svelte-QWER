<script lang="ts">
  import { dev } from '$app/environment';
  import { headConfig, siteConfig } from '$config/site';
  import { Base64 } from 'js-base64';
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
  <meta name="author" content={siteConfig.author.name} />

  <link rel="apple-touch-icon" href={siteConfig.author.avatar_192_png} sizes="192x192" type="image/png" />
  <link rel="shortcut icon" href="/favicon.png" type="image/png" />

  <meta name="generator" content={Base64.atob('Z2g6a3djaGFuZzA4MzEvc3ZlbHRlLVFXRVI=').toString()} />
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
      {@html tag}
    {/each}
  {/if}
</svelte:head>
