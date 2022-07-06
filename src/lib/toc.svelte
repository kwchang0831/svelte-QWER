<script lang="ts">
  import type { TOC } from '$types/toc';
  import TocContent from '$lib/toc_content.svelte';
  export let toc: TOC.Content[];
</script>

<div class="sticky top-[5rem] hidden xl:block pb8 max-h-80vh max-w-[20rem] overflow-auto">
  <h2 class="text-2xl font-bold p4">Table of Content</h2>
  {#if toc && toc.length > 0}
    <ul class="text-base font-semibold flex flex-col gap-2 px4">
      {#each toc as c}
        <TocContent content={c} expanded />
      {/each}
    </ul>
  {/if}
</div>
