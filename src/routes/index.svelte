<script lang="ts">
  import IndexProfile from '$lib/index_profile.svelte';
  import IndexPosts from '$lib/index_posts.svelte';
  import Tags from '$lib/tags_root.svelte';
</script>

<div class="flex flex-nowrap justify-center flex flex-col items-center xl:(flex-row items-stretch)">
  <div class="max-w-screen-md min-h-50vh flex-1 relative sticky top-[5rem]">
    <IndexProfile class="flex flex-col gap2 items-center text-center pl6 xl:(items-end text-right)" />
  </div>

  <div class="flex-none max-w-[55rem] min-h-50vh w-full md:(rounded-2xl)">
    <IndexPosts />
  </div>

  <div class="max-w-screen-md min-h-50vh flex-1 relative sticky top-[5rem]">
    <Tags class="hidden max-w-[20rem] pr6 xl:display-block" />
  </div>
</div>
