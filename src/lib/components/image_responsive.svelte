<script lang="ts">
  import type { Asset } from '$generated/asset';
  import { ImageConfig } from '$config/QWER.confitg';
  import { assets } from '$generated/assets';
  import { onMount } from 'svelte';

  export let pictureClass: string | undefined = undefined;
  export let imgClass: string | undefined = undefined;

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

{#if asset}
  <picture class={pictureClass}>
    {#if resolutions}
      {#each resolutions as [res, meta]}
        {#each meta.format as format, index}
          <source
            media={`(min-width: ${meta.minWidth})`}
            srcset={asset[res][index]}
            width={meta.width}
            type={`image/${format}`} />
        {/each}
      {/each}
    {/if}
    <img itemprop="image" class={imgClass} {decoding} {loading} src={asset.original} {alt} {width} {height} />
  </picture>
{:else}
  <img class={imgClass} {decoding} {loading} {src} {alt} {width} {height} />
{/if}
