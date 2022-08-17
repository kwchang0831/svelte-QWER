<script lang="ts">
  let className: string | undefined = undefined;
  export { className as class };

  import { siteConfig } from '$config/site';
</script>

<figure>
  {#if siteConfig.author.avatar && siteConfig.author.avatar_128}
    <picture>
      <source srcset={siteConfig.author.avatar_128[0]} type="image/avif" />
      <source srcset={siteConfig.author.avatar_128[1]} type="image/webp" />
      <img
        decoding="async"
        loading="lazy"
        src={siteConfig.author.avatar}
        alt={siteConfig.author.avatar}
        class="rounded-full shadow-xl w-32 h-32 aspect-auto object-cover hover:rotate-[360deg] transition-transform !duration-1000 ease-in-out {className}" />
    </picture>
  {:else}
    <div
      class="i-akar-icons-question !h-32 !w-32 hover:rotate-[360deg] transition-transform !duration-1000 ease-in-out {className}" />
  {/if}
</figure>
