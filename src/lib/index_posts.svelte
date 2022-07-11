<script lang="ts">
  import IndexPost from '$lib/index_post.svelte';

  // import { AllPosts } from '$lib/stores/allPosts'
  import { ShowPosts } from '$lib/stores/showPosts'

  let className: any = undefined;
  export { className as class };
</script>

<div id="index-posts" class="flex flex-col items-center mt-4 gap-4 {className}">
  {#each $ShowPosts as p, i}
    <IndexPost post={p} order={i}></IndexPost>
  {/each}
</div>

<style>
</style>
