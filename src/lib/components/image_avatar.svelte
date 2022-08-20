<script lang="ts">
  let className: string | undefined = undefined;
  export { className as class };

  import { siteConfig } from '$config/site';
  import { dev } from '$app/env';

  export let width: string = '128px';
  export let height: string = '128px';
</script>

<figure>
  {#if siteConfig.author.avatar && siteConfig.author.avatar_128}
    <!--
      DirtyFix: ASSET PATH INCORRECT TRANSFORMED
      The image asset path is expected to transfrom to "/_app/immutable/assets/..."
      But, instead transform to "./_app/immutable/assets/..."
      So, we add "/" in front to force it. Not sure if there's other side effects for now.
    -->
    <picture>
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
        decoding="async"
        loading="lazy"
        src={siteConfig.author.avatar}
        alt={siteConfig.author.avatar}
        {width}
        {height}
        class={className ??
          'rounded-full shadow-xl !w-32 !h-32 aspect-auto object-cover hover:rotate-[360deg] transition-transform duration-1000 ease-in-out'} />
    </picture>
  {:else}
    <div
      class="i-akar-icons-question {className ??
        '!h-32 !w-32 hover:rotate-[360deg] transition-transform duration-1000 ease-in-out'}" />
  {/if}
</figure>
