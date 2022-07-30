<script lang="ts">
  import type { TOC } from '$lib/types/toc';
  import TocContent from '$lib/components/toc_content.svelte';
  export let toc: TOC.Heading[] | undefined;
</script>

<aside class="sticky top-[5rem] hidden xl:block pb8 max-h-80vh overflow-auto">
  <h2 class="text-2xl font-bold p4">Table of Content</h2>
  {#if toc && toc.length > 0}
    <ul class="text-base font-semibold flex flex-col">
      {#each toc as c}
        <TocContent content={c} expanded />
      {/each}
    </ul>
  {/if}
</aside>
