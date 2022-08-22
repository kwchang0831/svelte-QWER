<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import type { TOC } from '$lib/types/toc';
  import TocContent from '$lib/components/toc_content.svelte';
  export let toc: TOC.Heading[] | undefined;

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  function mouseDownHandler(e: { clientX: any; clientY: any }) {
    const post_toc = document.getElementById('post-toc');
    if (post_toc) {
      post_toc.style.cursor = 'grabbing';
      post_toc.style.userSelect = 'none';

      pos = {
        left: post_toc.scrollLeft,
        top: post_toc.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  function mouseMoveHandler(e: { clientX: any; clientY: any }) {
    const post_toc = document.getElementById('post-toc');
    if (post_toc) {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      post_toc.scrollTop = pos.top + dy;
      post_toc.scrollLeft = pos.left - dx;
    }
  }

  function mouseUpHandler() {
    const post_toc = document.getElementById('post-toc');
    if (post_toc) {
      post_toc.style.cursor = 'grab';
      post_toc.style.removeProperty('user-select');
    }
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }
</script>

<!-- in:fly={{ x: 200, duration: 300, delay: 150 }}
out:fade={{ duration: 300 }} -->

{#if toc && toc.length > 0}
  <aside
    id="post-toc"
    aria-label="Table Of Content"
    on:mousedown={mouseDownHandler}
    class="sticky top-[5rem] hidden xl:block pb8 max-h-80vh overflow-hidden cursor-grab">
    <nav>
      <h2 class="text-2xl font-bold p4">Table of Content</h2>
      {#if toc && toc.length > 0}
        <ul class="text-base font-semibold flex flex-col">
          {#each toc as c}
            <TocContent content={c} expanded />
          {/each}
        </ul>
      {/if}
    </nav>
  </aside>
{/if}
