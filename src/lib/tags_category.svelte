<script lang="ts">
  import { slide } from 'svelte/transition';
  import Tag from '$lib/tag.svelte';
  import type { Tags } from '$lib/types/tags';

  let className: any = undefined;
  export { className as class };

  export let expanded = false;

  export let data: Tags.Category;

  function toggle() {
    expanded = !expanded;
  }
</script>

{#if data.name !== 'tags'}
  <div class="flex justify-between items-center border-b-1 py-2 cursor-pointer {className}" on:click={toggle}>
    <h3 class:expanded>
      {data.name}
    </h3>
    <div
      class="{expanded ? 'i-tabler-fold-down' : 'i-tabler-fold-up'} display-inline-block !w-[1.25rem] !h-[1.25rem] " />
  </div>

  {#if expanded && data.tags}
    <div transition:slide={{ duration: 300 }} class="flex flex-row flex-wrap my-2">
      {#each data.tags as t}
        <Tag data={t} />
      {/each}
    </div>
  {/if}
{:else if data.tags}
  <div transition:slide={{ duration: 300 }} class="flex flex-row flex-wrap">
    {#each data.tags as t}
      <Tag data={t} />
    {/each}
  </div>
{/if}
