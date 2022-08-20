<script lang="ts">
  import type { Asset } from '$generated/asset';
  import { assets } from '$generated/assets';
  import { onMount } from 'svelte';
  import { dev } from '$app/env';
  import { siteConfig } from '$config/site';

  export let pictureClass: string | undefined = undefined;
  export let imgClass: string | undefined = undefined;

  export let src: string;
  export let alt: string = src;
  export let loading: 'eager' | 'lazy' = 'eager';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;

  let asset: Asset.Image | undefined = $assets.get(src);

  onMount(async () => {
    width = asset?.width;
    height = asset?.height;
  });
</script>

{#if asset}
  <!--
    DirtyFix: ASSET PATH INCORRECT TRANSFORMED
    The image asset path is expected to transfrom to "/_app/immutable/assets/..."
    But, instead transform to "./_app/immutable/assets/..."
    So, we add "/" in front to force it. Not sure if there's other side effects for now.
  -->
  <picture class={pictureClass}>
    <source
      srcset={dev ? `${asset['banner'][0]}` : `${new URL(asset['banner'][0], siteConfig.url).href}`}
      width="900"
      type="image/avif" />
    <source
      srcset={dev ? `${asset['banner'][1]}` : `${new URL(asset['banner'][1], siteConfig.url).href}`}
      width="900"
      type="image/webp" />
    <img itemprop="image" class={imgClass} {decoding} {loading} src={asset.original} {alt} {width} {height} />
  </picture>
{:else}
  <img itemprop="image" class={imgClass} {decoding} {loading} {src} {alt} {width} {height} />
{/if}
