<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { dateConfig, siteConfig } from '$config/site';
  import ImgZoom from '$lib/components/image_zoom.svelte';
  import tippy from '$lib/actions/tippy';
  import { lastUpdatedStr, defaultPublishedStr, defaultUpdatedStr } from '$lib/utli/timeFormat';
  import AuthorAvatar from '$lib/components/image_avatar.svelte';
  import LL from '$i18n/i18n-svelte';

  export let data: Post.Post;
</script>

<div class="flex flex-col pt8 mx8">
  <div class="flex justify-between items-center mx--4 md:mx0">
    <a class="hidden u-url u-uid" href={new URL(data.slug, siteConfig.url).href}>
      {new URL(data.slug, siteConfig.url).href}
    </a>
    <div class="p-author h-card flex items-center gap-1 pl-0 shrink-0">
      <AuthorAvatar
        width="32px"
        height="32px"
        class="inline-block !w-8 !h-8 mr-1 object-cover aspect-1 rounded-full hover:rotate-[360deg] transition-transform duration-1000 ease-in-out" />
      <span class="font-bold text-base">
        <a use:tippy aria-label="Github Page" rel="author external" href={siteConfig.author.github} class="u-url u-uid">
          <span class="p-name">{siteConfig.author.name}</span>
        </a>
      </span>
    </div>
    <div class="flex flex-col gap1 text-right text-sm font-semibold op80">
      <time
        use:tippy
        class="dt-published"
        aria-label="{$LL.FirstPublishedAt()} {new Date(data.published).toLocaleString(
          dateConfig.toPublishedString.locales,
          {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZone: `${siteConfig.timeZone}`,
          },
        )}"
        datetime={data.published}
        itemprop="datePublished">
        {defaultPublishedStr(data.published)}
      </time>
      <time class="hidden dt-updated" datetime={data.updated} itemprop="dateModified">
        {defaultUpdatedStr(data.updated)}
      </time>
      <span
        use:tippy
        aria-label="{$LL.LastUpdatedAt()} {new Date(data.updated).toLocaleString(dateConfig.toPublishedString.locales, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: `${siteConfig.timeZone}`,
        })}">
        {$LL.Updated()}
        {lastUpdatedStr(data.updated)}
      </span>
    </div>
  </div>

  <h1 itemprop="name headline" class="p-name text-4xl my4 mx--4 md:mx0">{data.title}</h1>

  <div class="mx--8 md:mx0">
    {#if data.cover}
      <ImgZoom
        src={data.cover}
        class="w-full h-auto aspect-auto object-cover md:(rounded-2xl shadow-xl)"
        loading="eager">
        {#if data.coverCaption}
          {@html data.coverCaption}
        {/if}
      </ImgZoom>
    {/if}
  </div>
</div>
