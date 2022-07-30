<script lang="ts">
  import { fade } from 'svelte/transition';
  import IndexPost from '$lib/components/index_post.svelte';
  import { postsShow } from '$stores/posts';

  let className: any = undefined;
  export { className as class };
</script>

<div id="index-posts" class="flex flex-col items-center mt-4 gap-4 {className}">
  {#if $postsShow.length === 0}
    <div
      class="h-[20rem] flex items-center justify-center"
      in:fade={{ duration: 300, delay: 300 }}
      out:fade={{ duration: 300 }}>
      <h2 class="text-3xl">No Post Found.</h2>
    </div>
  {:else}
    {#key $postsShow}
      {#each $postsShow as p, index}
        <IndexPost data={p} {index} />
      {/each}
    {/key}
  {/if}
</div>

<style>
</style>
