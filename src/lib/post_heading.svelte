<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { dateConfig, siteConfig } from '$config/site';

  export let postData: Post.Post | undefined;
  let publishedDate: string | undefined = postData
    ? new Date(postData.published).toLocaleString(
        dateConfig.toPublishedString.locales,
        dateConfig.toPublishedString.options,
      )
    : undefined;
</script>

<div class="flex flex-col pt8">
  <div class="flex justify-between">
    <div class="gap-1 pl-0 font-bold  shrink-0">
      <img
        class="inline-block w-6 h-6 mr-1 rounded-full"
        src={siteConfig.author.avator}
        alt={siteConfig.author.name}
        width="192"
        height="192"
        decoding="async"
        loading="lazy" />
      <span>
        <a rel="author" class="" href={siteConfig.author.website}>{siteConfig.author.name}</a>
      </span>
    </div>
    <div>{publishedDate}</div>
  </div>

  <h1 class="!text-3xl">{postData?.title}</h1>

  <figure class="flex flex-col w-auto mx-4 md:mx-0">
    <picture>
      <img
        data-zoomable
        src={postData?.cover}
        alt={postData?.cover}
        itemprop="image"
        class="w-full z-50 rounded-2xl shadow-xl h-auto"
        loading="eager"
        decoding="async" />
    </picture>
    <figcaption class="italic" />
  </figure>
</div>
