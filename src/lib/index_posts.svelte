<script lang="ts">
  import IndexPost from '$lib/index_post.svelte';
  import { ShowPosts } from '$lib/stores/showPosts';

  let className: any = undefined;
  export { className as class };
</script>

<div id="index-posts" class="flex flex-col items-center mt-4 gap-4 {className}">
  {#key $ShowPosts}
    {#if $ShowPosts.length > 0}
      {#each $ShowPosts as p, index}
        <IndexPost data={p} {index} />
      {/each}
    {:else}
      <h2>No Post Found.</h2>
    {/if}
  {/key}
</div>

<style>
</style>
