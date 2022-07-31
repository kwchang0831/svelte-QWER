<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { dateConfig, siteConfig } from '$config/site';

  export let title: string;
  export let published: string;

  let publishedDate: string = new Date(published).toLocaleString(
    dateConfig.toPublishedString.locales,
    dateConfig.toPublishedString.options,
  );
</script>

<div class="flex flex-col pt8">
  <div class="flex justify-between my4">
    <div class="flex gap-1 pl-0 font-bold shrink-0">
      <img
        class="inline-block w-6 h-6 mr-1 rounded-full"
        src={siteConfig.author.avator}
        alt={siteConfig.author.name}
        width="32"
        height="32"
        decoding="async"
        loading="lazy" />
      <span>
        <a rel="author" class="" href={siteConfig.author.website}>{siteConfig.author.name}</a>
      </span>
    </div>
    <div>{publishedDate}</div>
  </div>

  <h1 class="text-3xl my4">{title}</h1>

  <figure class="flex flex-col md:(mx6) mx--6">
    <slot name="cover" />
    <figcaption class="text-center italic op75">
      <slot name="cover_caption" />
    </figcaption>
  </figure>
</div>
