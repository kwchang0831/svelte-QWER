<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { TOC } from '$types/toc';
  export let content: TOC.Content;
  export let expanded = false;
</script>

<li class="">
  <div class="flex items-center gap2">
    {#if content.child && content.child.length > 0}
      <span
        on:click={() => {
          expanded = !expanded;
        }}
        class="!w-[1.25rem] !h-[1.25rem] inline-block duration-350 ease-out {expanded
          ? 'i-akar-icons-circle-chevron-up active:translate-y--1 hover:i-akar-icons-circle-chevron-up-fill'
          : 'i-akar-icons-circle-chevron-down active:translate-y-1 hover:i-akar-icons-circle-chevron-down-fill'}" />
    {:else}
      <span class="!w-[1.25rem] !h-[1.25rem] i-akar-icons-circle inline-block" />
    {/if}
    <a href={content.slug} class="text-black/[0.6] hover:text-black dark:(text-white/[0.6] hover:text-white)">
      {content.heading}
    </a>
  </div>
  {#if content.child && content.child.length > 0}
    {#if expanded}
      <ul transition:slide={{ duration: 300 }} class="mt2 flex flex-col gap-2 ml4">
        {#each content.child as c}
          <svelte:self content={c} expanded />
        {/each}
      </ul>
    {/if}
  {/if}
</li>
