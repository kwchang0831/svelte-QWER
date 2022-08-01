<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { assets } from '$generated/assets';

  let className: string | undefined = undefined;
  export { className as class };

  export let src: string;
  export let alt: string = src;
  export let loading: 'eager' | 'lazy' = 'lazy';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';

  let asset: Post.Asset | undefined = $assets.get(src);
</script>

{#if asset}
  <picture>
    <source media="(min-width: 768px)" srcset="{asset[1280][1]} 2x, {asset[1024][1]}" type="image/avif" />
    <source media="(min-width: 768px)" srcset="{asset[1280][0]} 2x, {asset[1024][0]}" type="image/webp" />
    <source media="(min-width: 640px)" srcset="{asset[800][1]} 2x, {asset[640][1]}" type="image/avif" />
    <source media="(min-width: 640px)" srcset="{asset[800][0]} 2x, {asset[640][0]}" type="image/webp" />
    <img
      class={className ?? 'w-full h-auto aspect-video object-cover md:(rounded-2xl shadow-xl)'}
      {decoding}
      {loading}
      src={asset.original}
      {alt} />
  </picture>
{:else}
  <img
    class={className ? className : 'w-full h-auto aspect-video object-cover md:(rounded-2xl shadow-xl)'}
    {decoding}
    {loading}
    {src}
    {alt} />
{/if}
