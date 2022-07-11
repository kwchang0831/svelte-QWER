<script lang="ts">
  import IndexProfile from '$lib/index_profile.svelte';
  import IndexPosts from '$lib/index_posts.svelte';

  import Tags from '$lib/tags_root.svelte';
</script>

<!-- <div class="relative flex flex-col xl:(flex-row gap-8) justify-center">
  <div>
    <IndexProfile class="sticky top-20 flex flex-col items-center py-4 xl:(items-right text-right)" />
  </div>
  <IndexPosts />
  <Tags class="hidden xl:display-block w-72" />
</div> -->


<div class="flex flex-nowrap justify-center flex flex-col xl:(flex-row) ">
  <div class="max-w-screen-md flex-1 relative">
    <IndexProfile class="sticky top-[5rem] flex flex-col gap2 items-center text-center xl:(items-end text-right)"/>
  </div>

  <div class="flex-none max-w-[55rem] w-full md:(rounded-2xl)">
    <IndexPosts />
  </div>

  <div class="max-w-screen-md flex-1 relative">
    <Tags class="sticky top-[5rem] hidden xl:display-block max-w-[20rem]" />
  </div>
</div>