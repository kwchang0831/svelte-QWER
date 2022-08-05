<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { assets } from '$generated/assets';
  import { onMount } from 'svelte';

  export let pictureClass: string | undefined = undefined;
  export let imgClass: string | undefined = undefined;

  export let src: string;
  export let alt: string = src;
  export let loading: 'eager' | 'lazy' = 'eager';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;

  let asset: Post.Asset | undefined = $assets.get(src);

  onMount(async () => {
    width = asset?.width;
    height = asset?.height;
  });
</script>

{#if asset}
  <picture class={pictureClass}>
    <source srcset={asset['banner'][1]} width="900" type="image/avif" />
    <source srcset={asset['banner'][0]} width="900" type="image/webp" />
    <img itemprop="image" class={imgClass} {decoding} {loading} src={asset.original} {alt} {width} {height} />
  </picture>
{:else}
  <img itemprop="image" class={imgClass} {decoding} {loading} {src} {alt} {width} {height} />
{/if}
