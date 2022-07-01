<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import { quartIn } from 'svelte/easing';

  export let links: any;
  export let orientation: any;

  let show = false;
</script>

<div
  class="relative btn btn-ghost gap-2 text-lg flex items-center justify-start select-none "
  on:mouseenter={() => (show = true)}
  on:mouseleave={() => (show = false)}>
  <slot {show} />

  {#if show && links}
    <div
      class:pos-r={orientation === 'r'}
      class:pos-b={orientation === 'b'}
      class="w-max max-w-[screen] min-w-[8em] text-left"
      transition:slide={{ duration: 350, easing: quartIn }}>
      <ul class="flex flex-col tracking-wide rounded p-2 bg-white dark:bg-black ">
        {#each links as l}
          {#if l.links}
            <svelte:self links={l.links} orientation="r">
              <div class="flex p-2">
                <a href={l.link ? l.link : '#'} alt={l.link ? l.link : '#'}>{l.name}</a>
                {#if l.links}
                  <div class="!w-[1.5rem] !h-[1.5rem] i-mdi-chevron-right" />
                {/if}
              </div>
            </svelte:self>
          {:else}
            <li
              class="p-4 rounded text-black hover:bg-black/[0.5] dark:(hover:bg-white/[0.5] text-white) {$page.url
                .pathname === l.link
                ? 'font-bold'
                : ''}">
              <a sveltekit:prefetch href={l.link} alt={l.link} target="_self" class="">{l.name}</a>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .pos-b {
    --at-apply: 'absolute left-0 top-[150%]';
  }
  .pos-b ul:before {
    --at-apply: 'content-none absolute top-[-30px] left-[30px] translate-x-[-50%] border-solid border-15 z-1 border-transparent border-b-white dark:border-b-black';
  }

  .pos-r {
    --at-apply: 'absolute right-[-135%] top-[-10px]';
  }

  .pos-r ul:before {
    --at-apply: 'content-none absolute top-[15px] left-[-15px]  border-solid border-15 z-1 border-transparent border-r-white';
  }
</style>
