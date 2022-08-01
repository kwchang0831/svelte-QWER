<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { dateConfig, siteConfig } from '$config/site';
  import { assets } from '$generated/assets';
  import Post from '$lib/layouts/post.svelte';

  export let postData: Post.Post;

  let coverFromAsset = postData.cover && $assets.get(postData.cover);
  let publishedDate: string = new Date(postData.published).toLocaleString(
    dateConfig.toPublishedString.locales,
    dateConfig.toPublishedString.options,
  );
</script>

<div class="flex flex-col pt8">
  <div class="flex justify-between my4">
    <div class="flex gap-1 pl-0 font-bold shrink-0">
      {#if siteConfig.author.avator}
        <img
          class="inline-block w-6 h-6 mr-1 rounded-full hover:rotate-[360deg] transition-transform !duration-1000 ease-in-out"
          src={siteConfig.author.avator}
          alt={siteConfig.author.name}
          width="32"
          height="32"
          decoding="async"
          loading="lazy" />
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

  <h1 class="text-3xl my4">{postData.title}</h1>

  {#if postData.cover}
    <figure class="flex flex-col gap4 md:(mx0) mx--10">
      {#if coverFromAsset}
        <picture>
          <source
            media="(min-width: 768px)"
            srcset="{coverFromAsset[1280][1]} 2x, {coverFromAsset[1024][1]}"
            type="image/avif" />
          <source
            media="(min-width: 768px)"
            srcset="{coverFromAsset[1280][0]} 2x, {coverFromAsset[1024][0]}"
            type="image/webp" />
          <source
            media="(min-width: 640px)"
            srcset="{coverFromAsset[800][1]} 2x, {coverFromAsset[640][1]}"
            type="image/avif" />
          <source
            media="(min-width: 640px)"
            srcset="{coverFromAsset[800][0]} 2x, {coverFromAsset[640][0]}"
            type="image/webp" />
          <img
            class="w-full h-auto aspect-video object-cover md:(rounded-2xl shadow-xl)"
            decoding="async"
            loading="lazy"
            src={coverFromAsset.original}
            alt={postData.cover} />
        </picture>
      {:else}
        <img
          class="w-full h-auto aspect-video object-cover md:(rounded-2xl shadow-xl)"
          decoding="async"
          loading="lazy"
          src={postData.cover}
          alt={postData.cover} />
      {/if}
      {#if postData.coverCaption}
        <figcaption class="text-center italic op75">
          {@html postData.coverCaption}
        </figcaption>
      {/if}
    </figure>
  {/if}
</div>
