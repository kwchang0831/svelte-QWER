<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import type { Asset } from '$generated/asset';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { assets } from '$generated/assets';
  import { dev } from '$app/environment';
  import { ImageConfig } from '$config/QWER.confitg';
  import { siteConfig } from '$config/site';
  import { fade } from 'svelte/transition';

  export let pictureClass: string | undefined = undefined;
  export let imgClass: string | undefined = undefined;

  export let src: string;
  export let alt: string = src;
  export let loading: 'eager' | 'lazy' = 'eager';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;

  let asset: Asset.Image | undefined = $assets.get(src);

  $: width = asset?.width;
  $: height = asset?.height;
</script>

{#if asset}
  <!--
    DirtyFix: ASSET PATH INCORRECT TRANSFORMED
    The image asset path is expected to transfrom to "/_app/immutable/assets/..."
    But, instead transform to "./_app/immutable/assets/..."
    So, we add "/" in front to force it. Not sure if there's other side effects for now.
  -->
  <picture in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }} class="select-none {pictureClass}">
    {#if ImageConfig.BannerImage && ImageConfig.BannerImage['format']}
      {#each ImageConfig.BannerImage['format'] as format, index}
        <source
          srcset={dev
            ? `${Array.isArray(asset['banner']) ? asset['banner'][index] : asset['banner']}`
            : `${
                new URL(Array.isArray(asset['banner']) ? asset['banner'][index] : asset['banner'], siteConfig.url).href
              }`}
          width={ImageConfig.BannerImage.width}
          height={ImageConfig.BannerImage.height}
          type={`image/${format}`} />
      {/each}
    {/if}
    <img
      draggable="false"
      itemprop="image"
      class={imgClass}
      {decoding}
      {loading}
      src={asset.original}
      {alt}
      {width}
      {height} />
  </picture>
{:else}
  <img draggable="false" itemprop="image" class={imgClass} {decoding} {loading} {src} {alt} {width} {height} />
{/if}
