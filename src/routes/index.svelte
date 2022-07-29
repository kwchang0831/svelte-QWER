<script lang="ts">
  import IndexProfile from '$lib/index_profile.svelte';
  import IndexPosts from '$lib/index_posts.svelte';
  import Tags from '$lib/tags_root.svelte';
  import { tagsCur } from '$stores/tags';
  import { postsShow } from '$stores/posts';

  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';

  onMount(() => {
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

<div class="flex flex-nowrap justify-center flex-col items-center xl:(flex-row items-stretch)">
  <div class="max-w-screen-md h-full flex-1 relative">
    <IndexProfile
      class="flex flex-col gap2 items-center text-center pl6 xl:(items-end text-right sticky top-[5rem] min-h-50vh)" />
  </div>

  <div class="flex-none max-w-[55rem] w-full md:(rounded-2xl) overflow-hidden">
    <IndexPosts />
  </div>

  <div class="max-w-screen-md h-full flex-1 relative">
    <Tags class="hidden max-w-[20rem] pr6 xl:(display-block sticky top-[5rem] min-h-50vh)" />
  </div>
</div>
