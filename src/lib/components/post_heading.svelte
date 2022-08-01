<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { dateConfig, siteConfig } from '$config/site';
  import ImgZ from '$lib/components/image_zoom.svelte';

  export let postData: Post.Post;

  let publishedDate: string = new Date(postData.published).toLocaleString(
    dateConfig.toPublishedString.locales,
    dateConfig.toPublishedString.options,
  );
</script>

<div class="flex flex-col pt8 mx8">
  <div class="flex justify-between items-center mx--6 md:mx0">
    <div class="flex items-center gap-1 pl-0 font-bold shrink-0">
      {#if siteConfig.author.avator && siteConfig.author.avator_32}
        <picture>
          <source srcset={siteConfig.author.avator_32[1]} type="image/avif" />
          <source srcset={siteConfig.author.avator_32[0]} type="image/webp" />
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
    <div>{publishedDate}</div>
  </div>

  <h1 class="text-3xl my4 mx--6 md:mx0">{postData.title}</h1>

  <div class="mx--8 md:mx0">
    {#if postData.cover}
      <ImgZ src={postData.cover} class="w-full h-auto aspect-auto object-cover md:(rounded-2xl shadow-xl)">
        {#if postData.coverCaption}
          {@html postData.coverCaption}
        {/if}
      </ImgZ>
    {/if}
  </div>
</div>
