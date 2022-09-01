<script lang="ts">
  import { siteConfig } from '$config/site';
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let className: string | undefined = undefined;
  export { className as class };

  export let width: string = '128px';
  export let height: string = '128px';

  let loaded = false;
  onMount(() => {
    loaded = true;
  });
</script>

<figure class="select-none">
  {#if loaded && siteConfig.author.avatar && siteConfig.author.avatar_128}
    <!--
      DirtyFix: ASSET PATH INCORRECT TRANSFORMED
      The image asset path is expected to transfrom to "/_app/immutable/assets/..."
      But, instead transform to "./_app/immutable/assets/..."
      So, we add "/" in front to force it. Not sure if there's other side effects for now.
    -->
    <picture in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }} class="u-photo">
      <source
        srcset={dev
          ? `${siteConfig.author.avatar_128[0]}`
          : `${new URL(siteConfig.author.avatar_128[0], siteConfig.url).href}`}
        type="image/avif" />
      <source
        srcset={dev
          ? `${siteConfig.author.avatar_128[1]}`
          : `${new URL(siteConfig.author.avatar_128[1], siteConfig.url).href}`}
        type="image/webp" />
      <img
        draggable="false"
        src={dev
          ? `${siteConfig.author.avatar}`
          : `${
              siteConfig.author.avatar.indexOf('://') > 0 || siteConfig.author.avatar.indexOf('//') === 0
                ? siteConfig.author.avatar
                : new URL(siteConfig.author.avatar, siteConfig.url).href
            }`}
        alt={siteConfig.author.avatar}
        {width}
        {height}
        class={className ??
          'rounded-full shadow-xl !w-32 !h-32 aspect-auto object-cover hover:rotate-[360deg] transition-transform duration-1000 ease-in-out'} />
    </picture>
  {:else}
    <div class="i-line-md-github-loop {className ?? '!h-32 !w-32'}" />
  {/if}
</figure>
