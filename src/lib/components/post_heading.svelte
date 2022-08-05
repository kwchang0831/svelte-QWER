<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { dateConfig, siteConfig } from '$config/site';
  import ImgZ from '$lib/components/image_zoom.svelte';

  export let data: Post.Post;

  const postPublishedStr = new Date(data.published).toLocaleString(
    dateConfig.toPublishedString.locales,
    dateConfig.toPublishedString.options,
  );
  const postUpdatedStr = new Date(data.updated).toLocaleString(
    dateConfig.toUpdatedString.locales,
    dateConfig.toUpdatedString.options,
  );
</script>

<div class="flex flex-col pt8 mx8">
  <div class="flex justify-between items-center mx--4 md:mx0">
    <div class="flex items-center gap-1 pl-0 font-bold shrink-0">
      {#if siteConfig.author.avator && siteConfig.author.avator_32}
        <picture>
          <source srcset={siteConfig.author.avator_32[0]} type="image/avif" />
          <source srcset={siteConfig.author.avator_32[1]} type="image/webp" />
          <img
            decoding="async"
            loading="lazy"
            class="inline-block !w-8 !h-8 mr-1 object-cover aspect-1 rounded-full hover:rotate-[360deg] transition-transform !duration-1000 ease-in-out"
            src={siteConfig.author.avator}
            alt={siteConfig.author.avator} />
        </picture>
      {:else}
        <div
          class="i-akar-icons-question !h-6 !w-6 hover:rotate-[360deg] transition-transform !duration-1000 ease-in-out" />
      {/if}
      <span>
        <a rel="author" href={siteConfig.author.github}>{siteConfig.author.name}</a>
      </span>
    </div>
    <time class="dt-published" datetime={data.published} itemprop="datePublished">
      {postPublishedStr}
    </time>
    <time class="hidden dt-updated" datetime={data.updated} itemprop="dateModified">
      {postUpdatedStr}
    </time>
  </div>

  <h1 itemprop="name headline" class="text-3xl my4 mx--4 md:mx0">{data.title}</h1>

  <div class="mx--8 md:mx0">
    {#if data.cover}
      <ImgZ src={data.cover} class="w-full h-auto aspect-auto object-cover md:(rounded-2xl shadow-xl)">
        {#if data.coverCaption}
          {@html data.coverCaption}
        {/if}
      </ImgZ>
    {/if}
  </div>
</div>
