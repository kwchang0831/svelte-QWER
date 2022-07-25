<script lang="ts">
  import IndexProfile from '$lib/index_profile.svelte';
  import IndexPosts from '$lib/index_posts.svelte';
  import Tags from '$lib/tags_root.svelte';
</script>

<div class="flex flex-nowrap justify-center flex flex-col items-center xl:(flex-row items-stretch) ">
  <div class="max-w-screen-md flex-1 relative">
    <IndexProfile class="sticky self-start top-[5rem] flex flex-col gap2 items-center text-center pl6 xl:(items-end text-right)" />
  </div>

  <div class="flex-none max-w-[55rem] w-full min-h-[20rem] md:(rounded-2xl)">
    <IndexPosts />
  </div>

  <div class="max-w-screen-md flex-1 relative">
    <Tags class="sticky self-start top-[5rem] hidden xl:display-block max-w-[20rem] min-h-[20rem] pr6" />
  </div>
</div>
