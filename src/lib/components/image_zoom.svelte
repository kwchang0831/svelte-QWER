<script lang="ts">
  import type { Asset } from '$generated/asset';
  import { ImageConfig } from '$config/QWER.confitg'
  import { assets } from '$generated/assets';
  import { onMount } from 'svelte';

  let className: string | undefined = undefined;
  export { className as class };

  export let captionClass: string | undefined = undefined;

  export let src: string;
  export let alt: string = src;
  export let loading: 'eager' | 'lazy' = 'eager';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;

  let asset: Asset.Image | undefined = $assets.get(src);
  const resolutions = Object.entries(ImageConfig.ExtraResolutions).filter(e=>asset&&asset[e[0] as keyof Asset.Image]).sort((a, b)=>{
    return +b[0] - +a[0]
  })

  onMount(async () => {
    width = asset?.width;
    height = asset?.height;
  });
</script>

<figure class="flex flex-col gap2">
  {#if asset}
    <picture>
      {#if resolutions}
        {#each resolutions as [res, meta]}
          {#each meta.format as format, index}
            <source media={`(min-width: ${meta.minWidth})`} srcset={asset[res][index]} width={meta.width} type={`image/${format}`} />
          {/each}
        {/each}
      {/if}
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
