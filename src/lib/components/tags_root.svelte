<script lang="ts">
  import { slide, fly } from 'svelte/transition';
  import TagsCategory from '$lib/components/tags_category.svelte';
  let scrollY = 0;
  let className: any = undefined;
  export { className as class };

  export let expaned = true;
  import { tagsAll } from '$stores/tags';

  function toggle() {
    expaned = !expaned;
  }
</script>

<svelte:window bind:scrollY />

{#if $tagsAll.length}
  <aside
    in:fly={{ x: -25, duration: 300, delay: 300 }}
    out:fly={{ x: -25, duration: 300 }}
    id="index-tags"
    class="{className} {scrollY > 0 ? 'sticky top-[4rem]' : ''}">
    <div
      class="select-none flex justify-between items-center border-b-2 border-black dark:border-white cursor-pointer"
      on:click={toggle}>
      <h2 class:expaned class="text-2xl my2">Tags</h2>
      <div
        class="{expaned ? 'i-tabler-fold-down' : 'i-tabler-fold-up'} display-inline-block !w-[1.75rem] !h-[1.75rem]" />
    </div>

    {#if expaned}
      <div transition:slide={{ duration: 300 }} class="py-4 select-none">
        {#each $tagsAll as c}
          <TagsCategory data={c} expanded />
        {/each}
      </div>
    {/if}
  </aside>
{/if}
