<script lang="ts">
  import { slide } from 'svelte/transition';
  import Tag from '$lib/components/tag.svelte';
  import type { Tags } from '$lib/types/tags';

  let className: string | undefined = undefined;
  export { className as class };

  export let expanded = false;

  export let data: Tags.Category;
  const tags = data.tags?.sort((a, b) => {
    return String(a.name).localeCompare(String(b.name), 'zh-u-co-zhuyin');
  });
</script>

<!-- {#if data.name !== 'tags'} -->
<div
  class="flex justify-between items-center border-b-1 border-black dark:border-white py2 cursor-pointer {className ??
    ''}"
  on:click={() => {
    expanded = !expanded;
  }}
  on:keydown={(e) => {
    if (e.key === 'Enter') {
      expanded = !expanded;
    }
  }}>
  {#if data.name !== 'tags'}
    <h3 class:expanded>
      {data.name}
    </h3>
  {:else}
    <h3 class:expanded>#</h3>
  {/if}
  <div
    class="{expanded
      ? 'i-tabler-fold-down'
      : 'i-tabler-fold-up'} display-inline-block !w-[1.25rem] !h-[1.25rem] ml-auto" />
</div>

{#if expanded && tags}
  <div transition:slide={{ duration: 300 }} class="flex flex-row flex-wrap my-2">
    {#each tags as t}
      <Tag data={t} />
    {/each}
  </div>
{/if}
<!-- {:else if tags}
  <div transition:slide={{ duration: 300 }} class="flex flex-row flex-wrap">
    {#each tags as t}
      <Tag data={t} />
    {/each}
  </div> -->
<!-- {/if} -->
