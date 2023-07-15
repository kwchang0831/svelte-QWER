<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import type { Asset } from '$generated/asset';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { assets } from '$generated/assets';
  import { UserConfig } from '$config/QWER.config';
  import { fade } from 'svelte/transition';

  export let pictureClass: string | undefined = undefined;
  export let imgClass: string | undefined = undefined;

  export let src: string;
  export let alt: string = src;
  export let loading: 'eager' | 'lazy' = 'eager';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';
  export let width: string | number | undefined = undefined;
  export let height: string | number | undefined = undefined;

  let asset: Asset.Image | undefined = $assets.get(src);

  $: width = asset?.width;
  $: height = asset?.height;
</script>

{#if asset}
  <picture
    in:fade|global={{ duration: 300, delay: 300 }}
    out:fade|global={{ duration: 300 }}
    class="select-none {pictureClass ?? ''}">
    {#if UserConfig.BannerImage && UserConfig.BannerImage['format']}
      {#each UserConfig.BannerImage['format'] as format, index}
        <!--
          /@imagetools/... get transformed to ./_app/immutable/assets/...
          while causes problem to page that is 2+ level of depth
          DirtyFix: blindly remove leading dot
        -->
        <source
          srcset={`${Array.isArray(asset['banner']) ? asset['banner'][index] : asset['banner']}`.replace(/^\./, '')}
          width={UserConfig.BannerImage['width']}
          height={UserConfig.BannerImage['height']}
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
