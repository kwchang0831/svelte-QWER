<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import type { Asset } from '$generated/asset';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { assets } from '$generated/assets';
  import { onMount } from 'svelte';
  import { dev } from '$app/env';
  import { ImageConfig } from '$config/QWER.confitg';
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
    <img itemprop="image" class={imgClass} {decoding} {loading} src={asset.original} {alt} {width} {height} />
  </picture>
{:else}
  <img itemprop="image" class={imgClass} {decoding} {loading} {src} {alt} {width} {height} />
{/if}
