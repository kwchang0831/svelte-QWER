<script lang="ts">
  import { slide } from 'svelte/transition';
  import TagsCategory from '$lib/components/tags_category.svelte';

  let className: any = undefined;
  export { className as class };

  export let expaned = true;
  import { tagsAll } from '$stores/tags';

  function toggle() {
    expaned = !expaned;
  }
</script>

<aside id="index-tags" class={className}>
  <div class="select-none flex justify-between items-center border-b-2 cursor-pointer" on:click={toggle}>
    <h2 class:expaned class="text-2xl my2">Tags</h2>
    <div>
      <div
        class="{expaned ? 'i-tabler-fold-down' : 'i-tabler-fold-up'} display-inline-block !w-[1.75rem] !h-[1.75rem]" />
    </div>
  </div>

  {#if expaned}
    <div transition:slide={{ duration: 300 }} class="py-4 select-none">
      {#each $tagsAll as c}
        <TagsCategory data={c} expanded />
      {/each}
    </div>
  {/if}
</aside>
