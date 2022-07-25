<script lang="ts">
  import IndexPost from '$lib/index_post.svelte';

  // import { AllPosts } from '$lib/stores/allPosts'
  import { ShowPosts } from '$lib/stores/showPosts';

  let className: any = undefined;
  export { className as class };
</script>

{#key $ShowPosts}
  {#if $ShowPosts.length > 0}
  <div id="index-posts" class="flex flex-col items-center mt-4 gap-4 {className}">
    {#each $ShowPosts as p, index}
      <IndexPost data={p} index={index}/>
    {/each}
  </div>
  {:else}
  <div id="index-posts" class="flex flex-col items-center mt-4 gap-4 {className}">
    <h2>
      Not found: [{#each ShowPosts.getTags() as tag, i}
      '{tag}'{#if i + 1 < ShowPosts.getTags().length},{/if}
    {/each}]
    </h2>
  </div>
  {/if}
{/key}

<style>
</style>
