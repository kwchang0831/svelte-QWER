<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { assets } from '$generated/assets';

  export let pictureClass: string | undefined = undefined;
  export let imgClass: string | undefined = undefined;

  export let src: string;
  export let alt: string = src;
  export let loading: 'eager' | 'lazy' = 'lazy';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';

  let asset: Post.Asset | undefined = $assets.get(src);
</script>

{#if asset}
  <picture class={pictureClass}>
    <source media="(min-width: 1280px)" srcset={asset[1280][1]} width="1280" type="image/avif" />
    <source media="(min-width: 1280px)" srcset={asset[1280][0]} width="1280" type="image/webp" />
    <source media="(min-width: 1024px)" srcset={asset[1024][1]} width="1024" type="image/avif" />
    <source media="(min-width: 1024px)" srcset={asset[1024][0]} width="1024" type="image/webp" />
    <source media="(min-width: 768px)" srcset={asset[800][1]} width="800" type="image/avif" />
    <source media="(min-width: 768px)" srcset={asset[800][0]} width="800" type="image/webp" />
    <source media="(min-width: 360px)" srcset={asset[640][1]} width="640" type="image/avif" />
    <source media="(min-width: 360px)" srcset={asset[640][0]} width="640" type="image/webp" />
    <img itemprop="image" class={imgClass} {decoding} {loading} src={asset.original} {alt} />
  </picture>
{:else}
  <img class={imgClass} {decoding} {loading} {src} {alt} />
{/if}
