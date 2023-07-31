<script lang="ts">
  import { siteConfig } from '$config/site';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let className: string | undefined = undefined;
  export { className as class };

  export let width = '128px';
  export let height = '128px';

  let loaded = false;
  onMount(() => {
    loaded = true;
  });
</script>

<figure class="avatar select-none">
  {#if loaded && siteConfig.author.avatar && siteConfig.author.avatar_128}
    <picture in:fade|global={{ duration: 300, delay: 300 }} out:fade|global={{ duration: 300 }} class="u-photo">
      <!--
        /@imagetools/... get transformed to ./_app/immutable/assets/...
        while causes problem to page that is 2+ level of depth
        DirtyFix: blindly remove leading dot
      -->
      <source srcset={`${siteConfig.author.avatar_128[0]}`.replace(/^\./, '')} type="image/avif" />
      <source srcset={`${siteConfig.author.avatar_128[1]}`.replace(/^\./, '')} type="image/webp" />
      <img
        draggable="false"
        src={siteConfig.author.avatar}
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

<style lang="scss">
  .avatar img {
    background-color: var(--qwer-bg-color);
  }
</style>
