<script lang="ts">
  import { slide } from 'svelte/transition';
  import ATag from '$lib/tag.svelte';
  import type { Tag } from '$lib/types/tag';

  let className: any = undefined;
  export { className as class };

  export let expanded = false;

  export let thisTag: Tag;

  function toggle() {
    expanded = !expanded;
  }
</script>

{#if thisTag.name !== 'tags'}
  <div class="flex justify-between items-center border-b-1 py-2 cursor-pointer {className}" on:click={toggle}>
    <h3 class:expanded>
      {thisTag.name}
    </h3>
    <div
      class="{expanded ? 'i-tabler-fold-down' : 'i-tabler-fold-up'} display-inline-block !w-[1.25rem] !h-[1.25rem] " />
  </div>

  {#if expanded && thisTag.child}
    <div transition:slide={{ duration: 300 }} class="flex flex-row flex-wrap my-2">
      {#each thisTag.child as c}
        <ATag thisTag={c} />
      {/each}
    </div>
  {/if}
{:else if thisTag.child}
  <div transition:slide={{ duration: 300 }} class="flex flex-row flex-wrap">
    {#each thisTag.child as c}
      <ATag thisTag={c} />
    {/each}
  </div>
{/if}
