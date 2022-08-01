<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { assets } from '$generated/assets';

  let className: string | undefined = undefined;
  export { className as class };

  export let captionClass: string | undefined = undefined;

  export let src: string;
  export let alt: string = src;
  export let loading: 'eager' | 'lazy' = 'eager';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;

  let asset: Post.Asset | undefined = $assets.get(src);
</script>

<figure class="flex flex-col gap2">
  {#if asset}
    <picture>
      <source media="(min-width: 1280px)" srcset={asset[1280][1]} width="1280" type="image/avif" />
      <source media="(min-width: 1280px)" srcset={asset[1280][0]} width="1280" type="image/webp" />
      <source media="(min-width: 1024px)" srcset={asset[1024][1]} width="1024" type="image/avif" />
      <source media="(min-width: 1024px)" srcset={asset[1024][0]} width="1024" type="image/webp" />
      <source media="(min-width: 768px)" srcset={asset[800][1]} width="800" type="image/avif" />
      <source media="(min-width: 768px)" srcset={asset[800][0]} width="800" type="image/webp" />
      <source media="(min-width: 360px)" srcset={asset[640][1]} width="640" type="image/avif" />
      <source media="(min-width: 360px)" srcset={asset[640][0]} width="640" type="image/webp" />
      <img
        data-zoomable
        itemprop="image"
        class="z-50 {className ?? 'w-full h-auto aspect-auto object-cover md:(rounded-2xl shadow-xl)'}"
        {decoding}
        {loading}
        src={asset.original}
        {alt}
        {width}
        {height} />
    </picture>
  {:else}
    <img
      data-zoomable
      itemprop="image"
      class="z-50 {className ?? 'w-full h-auto aspect-auto object-cover md:(rounded-2xl shadow-xl)'}"
      {decoding}
      {loading}
      {src}
      {alt}
      {width}
      {height} />
  {/if}
  <figcaption class={captionClass ?? 'italic op75 text-center'}>
    <slot />
  </figcaption>
</figure>
