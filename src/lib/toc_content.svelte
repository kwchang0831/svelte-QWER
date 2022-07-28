<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { TOC } from '$lib/types/toc';
  import { CurTOC } from '$lib/stores/curTOC';

  export let content: TOC.Heading;
  export let expanded = false;
  export let depth = 1;
</script>

<li class="group">
  <div
    toc-link
    class="flex items-center gap2 py2 {$CurTOC.get(content.slug) ? 'border-[#0096FF]' : 'border-transparent'}"
    class:pl4={depth === 1}
    class:pl8={depth === 2}
    class:pl12={depth === 3}
    class:pl16={depth === 4}
    class:pl18={depth === 5}>
    {#if content.child && content.child.length > 0}
      <span
        on:click={() => {
          expanded = !expanded;
        }}
        class="!w-[1.25rem] !h-[1.25rem] inline-block duration-350 ease-out {expanded
          ? 'i-akar-icons-circle-chevron-up active:translate-y--1 hover:i-akar-icons-circle-chevron-up-fill'
          : 'i-akar-icons-circle-chevron-down active:translate-y-1 hover:i-akar-icons-circle-chevron-down-fill'}" />
    {:else}
      <span class="!w-[1.25rem] !h-[1.25rem]  i-akar-icons-circle inline-block" />
    {/if}
    <a href={content.slug} class="text-black/[0.6] group-hover:text-black dark:(text-white/[0.6] hover:text-white) ">
      {content.heading}
    </a>
  </div>
  {#if content.child && content.child.length > 0}
    {#if expanded}
      <ul transition:slide={{ duration: 300 }} class="flex flex-col">
        {#each content.child as c}
          <svelte:self content={c} depth={depth + 1} expanded />
        {/each}
      </ul>
    {/if}
  {/if}
</li>

<style>
  [toc-link] {
    --at-apply: 'border-l-4 hover:bg-gray/[0.25]';
  }
</style>
