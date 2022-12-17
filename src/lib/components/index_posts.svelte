<script lang="ts">
  import LL from '$i18n/i18n-svelte';
  import { fade } from 'svelte/transition';
  import IndexPost from '$lib/components/index_post.svelte';
  import { postsShow } from '$stores/posts';
  import { onMount } from 'svelte';

  let className: string | undefined = undefined;
  export { className as class };

  let loaded = false;
  onMount(() => {
    loaded = true;
  });
</script>

<main
  id="index-posts"
  class="flex flex-col items-center py4 gap6 {className ?? ''}"
  itemscope
  itemprop="mainEntityOfPage"
  itemtype="https://schema.org/Blog">
  {#if loaded}
    {#key $postsShow}
      {#if $postsShow.length === 0}
        <div
          class="h-[20rem] flex items-center justify-center"
          in:fade={{ duration: 300, delay: 300 }}
          out:fade={{ duration: 300 }}>
          <h2 class="text-3xl">{$LL.NoPostFound()}</h2>
        </div>
      {:else}
        {@const years = [new Date().getFullYear()]}
        {#each $postsShow as p, index}
          {@const year = new Date(p.published).getFullYear()}
          {#if !isNaN(year) && !years.includes(year)}
            <div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }} class="year-divider my-4 md:my-0">
              {years.push(year) && year}
            </div>
          {/if}
          <IndexPost data={p} {index} />
        {/each}
      {/if}
    {/key}
  {:else}
    <div
      class="h-[20rem] flex flex-col items-center justify-center gap4"
      in:fade={{ duration: 300, delay: 300 }}
      out:fade={{ duration: 300 }}>
      <h2 class="text-3xl">{$LL.LoadingPosts()}</h2>
      <div class="i-line-md-loading-twotone-loop !h-16 !w-16" />
    </div>
  {/if}
</main>

<style lang="scss">
  .year-divider {
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
