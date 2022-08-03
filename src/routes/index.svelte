<script lang="ts">
  import IndexProfile from '$lib/components/index_profile.svelte';
  import IndexPosts from '$lib/components/index_posts.svelte';
  import Tags from '$lib/components/tags_root.svelte';
  import { tagsCur } from '$stores/tags';
  import { postsShow } from '$stores/posts';
  import { siteConfig } from '$config/site';

  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';

  onMount(async () => {
    $page.url.searchParams.forEach((v, k) => {
      v.split(',').forEach((v) => {
        tagsCur.add(k, v);
      });
    });

    if ($tagsCur.size) postsShow.filter($tagsCur);
  });

  onDestroy(() => {
    tagsCur.init();
    postsShow.init();
  });
</script>

<svelte:head>
  <title>{siteConfig.title}</title>
  <meta name="description" content={siteConfig.description} />
  <link rel="canonical" href={siteConfig.url} />
</svelte:head>

<div class="flex flex-nowrap justify-center flex-col items-center xl:(flex-row items-stretch)">
  <div class="max-w-screen-md flex-1 relative ml6">
    <IndexProfile class="flex flex-col gap2 items-center text-center xl:(items-end text-right sticky top-[5rem])" />
  </div>

  <div class="max-w-[55rem] flex-none w-full md:(rounded-2xl)">
    <IndexPosts />
  </div>

  <div class="max-w-screen-md flex-1 relative mr6">
    <Tags class="hidden max-w-[20rem] xl:(flex flex-col)" />
  </div>
</div>
