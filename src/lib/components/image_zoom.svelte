<script lang="ts">
  import type { Asset } from '$generated/asset';
  import { ImageConfig } from '$config/QWER.confitg';
  import { assets } from '$generated/assets';
  import { onMount } from 'svelte';
  import { dev } from '$app/env';
  import { siteConfig } from '$config/site';

  let className: string | undefined = undefined;
  export { className as class };

  export let captionClass: string | undefined = undefined;

  export let src: string;
  export let alt: string = src;
  export let loading: 'eager' | 'lazy' = 'lazy';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;

  let asset: Asset.Image | undefined = $assets.get(src);
  const resolutions = Object.entries(ImageConfig.ExtraResolutions)
    .filter((e) => asset && asset[e[0] as keyof Asset.Image])
    .sort((a, b) => {
      return +b[0] - +a[0];
    });

  onMount(async () => {
    width = asset?.width;
    height = asset?.height;
  });
</script>

<figure class="my6">
  {#if asset}
    <picture>
      {#if resolutions}
        {#each resolutions as [res, meta]}
          {#each meta.format as format, index}
            <!--
              DirtyFix: ASSET PATH INCORRECT TRANSFORMED
              The image asset path is expected to transfrom to "/_app/immutable/assets/..."
              But, instead transform to "./_app/immutable/assets/..."
              So, we add "/" in front to force it. Not sure if there's other side effects for now.
            -->
            <source
              media={`(min-width: ${meta.minWidth})`}
              srcset={dev ? `${asset[res][index]}` : new URL(asset[res][index], siteConfig.url).href}
              width={meta.width}
              type={`image/${format}`} />
          {/each}
        {/each}
      {/if}
      <img
        data-zoomable
        itemprop="image"
        class="z-50 m-auto md:(rounded-2xl shadow-xl) {className ?? 'h-full w-auto aspect-auto object-cover'}"
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
      class="z-50 m-auto md:(rounded-2xl shadow-xl) {className ?? 'h-full w-auto aspect-auto object-cover'}"
      {decoding}
      {loading}
      {src}
      {alt}
      {width}
      {height} />
  {/if}
  <figcaption class={captionClass ?? 'italic op70 text-center mt2'}>
    <slot />
  </figcaption>
</figure>
