<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { dateConfig, siteConfig } from '$config/site';
  import ImgZ from '$lib/components/image_zoom.svelte';
  import tippy from '$lib/actions/tippy';
  import { lastUpdatedStr, defaultPublishedStr, defaultUpdatedStr } from '$lib/utli/timeFormat';
  import { dev } from '$app/env';
  import AuthorAvatar from '$lib/components/image_avatar.svelte';

  export let data: Post.Post;
</script>

<div class="flex flex-col pt8 mx8">
  <div class="flex justify-between items-center mx--4 md:mx0">
    <div class="flex items-center gap-1 pl-0 shrink-0">
      <AuthorAvatar
        width="32px"
        height="32px"
        class="inline-block !w-8 !h-8 mr-1 object-cover aspect-1 rounded-full hover:rotate-[360deg] transition-transform duration-1000 ease-in-out" />
      <span class="font-bold text-base">
        <a use:tippy aria-label="{siteConfig.author.name}'s Github Page" rel="author" href={siteConfig.author.github}>
          {siteConfig.author.name}
        </a>
      </span>
    </div>
    <div class="flex flex-col gap1 text-right text-sm font-semibold op80">
      <time
        use:tippy
        class="dt-published"
        aria-label="First published at {new Date(data.published).toLocaleString(dateConfig.toPublishedString.locales, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          timeZone: 'Asia/Taipei',
        })}"
        datetime={data.published}
        itemprop="datePublished">
        {defaultPublishedStr(data.published)}
      </time>
      <time class="hidden dt-updated" datetime={data.updated} itemprop="dateModified">
        {defaultUpdatedStr(data.updated)}
      </time>
      <span
        use:tippy
        aria-label="Last updated at {new Date(data.updated).toLocaleString(dateConfig.toPublishedString.locales, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          timeZone: 'Asia/Taipei',
        })}">
        Updated: {lastUpdatedStr(data.updated)}
      </span>
    </div>
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
