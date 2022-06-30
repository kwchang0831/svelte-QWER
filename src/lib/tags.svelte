<script lang="ts">
  import { slide } from 'svelte/transition';
  import Tag from '$lib/tag.svelte';

  let className: any = undefined;
  export { className as class };

  export let expanded = false;
  export let type: any;
  export let name: any;
  export let tags: any;

  function toggle() {
    expanded = !expanded;
  }
</script>

{#if type == 'category'}
  <div class="flex justify-between items-center border-b-1 py-2 cursor-pointer {className}" on:click={toggle}>
    <h3 class:expanded>
      {name}
    </h3>
    <div class="{expanded ? 'i-tabler-fold-down' : 'i-tabler-fold-up'} display-inline-block !w-[1.25rem] !h-[1.25rem] "></div>
  </div>

  {#if expanded}
    <div transition:slide={{ duration: 300 }} class="flex flex-row flex-wrap my-4">
      {#each tags as tag}
        <Tag {...tag} />
      {/each}
    </div>
  {/if}
{:else}
  <div transition:slide={{ duration: 300 }} class="flex flex-row flex-wrap mt-8">
    {#each tags as tag}
      <Tag {...tag} />
    {/each}
  </div>
{/if}
