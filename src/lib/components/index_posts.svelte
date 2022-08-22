<script lang="ts">
  import { fade } from 'svelte/transition';
  import IndexPost from '$lib/components/index_post.svelte';
  import { postsShow } from '$stores/posts';

  let className: any = undefined;
  export { className as class };

  let years: Array<number> = [new Date().getFullYear()];
</script>

<main
  id="index-posts"
  class="flex flex-col items-center py4 gap6 {className}"
  itemprop="mainEntityOfPage"
  itemscope
  itemtype="https://schema.org/Blog">
  {#key $postsShow}
    {#if $postsShow.length === 0}
      <div
        class="h-[20rem] flex items-center justify-center"
        in:fade={{ duration: 300, delay: 300 }}
        out:fade={{ duration: 300 }}>
        <h2 class="text-3xl">No Post Found.</h2>
      </div>
    {:else}
      {#each $postsShow as p, index}
        {@const year = new Date(p.published).getFullYear()}
        {#if !years.includes(year)}
          <div class="divider my-4 md:my-0">
            {years.push(year) && year}
          </div>
        {/if}
        <IndexPost data={p} {index} />
      {/each}
    {/if}
  {/key}
</main>

<style lang="scss">
  .divider {
    --at-apply: 'my-4 h-4 whitespace-nowrap flex flex-row items-center self-stretch md:mx12';
    &:before {
      content: '';
      --at-apply: 'bg-black dark:bg-white op25 flex-grow h-0.5 w-full rounded-2xl';
    }
    &:after {
      content: '';
      --at-apply: 'bg-black dark:bg-white op25 flex-grow h-0.5 w-full rounded-2xl';
    }
    &:not(:empty) {
      --at-apply: 'gap-4';
    }
  }
</style>
