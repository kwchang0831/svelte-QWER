<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import type { Asset } from '$generated/asset';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { assets } from '$generated/assets';
  import { UserConfig } from '$config/QWER.config';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import mediumZoom from 'medium-zoom';

  let imgElement: HTMLElement;

  let className: string | undefined = undefined;
  export { className as class };

  export let captionClass: string | undefined = undefined;

  export let src: string;
  export let alt: string = src;
  export let loading: 'eager' | 'lazy' = 'lazy';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';
  export let width: string | number | undefined = undefined;
  export let height: string | number | undefined = undefined;

  let asset: Asset.Image | undefined = $assets.get(src);
  const resolutions: Array<[string, any]> = Object.entries(UserConfig.ExtraResolutions)
    .filter((e) => asset && asset[e[0] as keyof Asset.Image])
    .sort((a, b) => {
      return +b[0] - +a[0];
    });

  $: width = asset?.width;
  $: height = asset?.height;

  onMount(() => {
    mediumZoom(imgElement, {
      scrollOffset: 0,
      background: 'rgba(25, 18, 25, .9)',
    });
  });
</script>

<figure in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }} class="my6 select-none">
  {#if asset}
    <picture>
      {#if resolutions}
        {#each resolutions as [res, meta]}
          {#each meta.format as format, index}
            <source
              media={`(min-width: ${meta.minWidth})`}
              srcset={`${Array.isArray(asset[res]) ? asset[res][index] : asset[res]}`}
              width={meta.width}
              type={`image/${format}`} />
          {/each}
        {/each}
      {/if}
      {#if UserConfig.ExtraFormats && UserConfig.ExtraFormats.length}
        {#each UserConfig.ExtraFormats as format, index}
          <source
            type={`image/${format}`}
            srcset={`${Array.isArray(asset['extraFormats']) ? asset['extraFormats'][index] : asset['extraFormats']}`} />
        {/each}
      {/if}
      <img
        bind:this={imgElement}
        draggable="false"
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
      bind:this={imgElement}
      draggable="false"
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
