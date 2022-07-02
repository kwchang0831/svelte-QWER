<script lang="ts">
  import type { DD } from '$types/dd';

  /**
   * TODO: page.url.pathname
   * For now, we teats all links as internal links
   * Need to make sure make account for external links
   *
   */
  import { page } from '$app/stores';

  let className: string = '';
  export { className as class };

  import { slide } from 'svelte/transition';
  import { quartIn } from 'svelte/easing';

  export let nav: DD.Nav | DD.Link;

  export let active = false;

  function show() {
    active = true;
  }
  function hide() {
    active = false;
  }
</script>

{#if nav}
  <div on:mouseenter={show} on:mouseleave={hide} class="relative {className}">
    <slot>
      <a href={nav.url} target={nav.target} class="flex items-center cursor-pointer gap-2">
        {nav.name}
        {#if 'links' in nav && nav.links}
          <span
            class="!w-[1.5rem] !h-[1.5rem] display-inline-block "
            class:i-mdi-chevron-up={nav.orientation === 0}
            class:i-mdi-chevron-right={nav.orientation === 1}
            class:i-mdi-chevron-down={nav.orientation === 2}
            class:i-mdi-chevron-left={nav.orientation === 3} />
        {/if}
      </a>
    </slot>

    {#if active && 'links' in nav && nav.links}
      <div
        transition:slide={{ duration: 250, easing: quartIn }}
        class:pos-up={nav.orientation === 0}
        class:pos-right={nav.orientation === 1}
        class:pos-down={nav.orientation === 2}
        class:pos-left={nav.orientation === 3}
        class="absolute w-max bg-white dark:bg-black">
        <ul class="flex flex-col tracking-wide border-1">
          {#each nav.links as link}
            {#if 'links' in link}
              <li class="text-black hover:bg-black/[0.2] dark:(hover:bg-white/[0.2] text-white)">
                <svelte:self nav={link}>
                  <!-- TODO: page.url.pathname -->
                  <a
                    href={link.url}
                    target={nav.target}
                    class="p4 flex items-center cursor-pointer {$page.url.pathname === link.url ? 'font-bold' : ''}">
                    {link.name}
                    {#if link.links}
                      <span
                        class="!w-[1.5rem] !h-[1.5rem] display-inline-block ml-auto"
                        class:i-mdi-chevron-up={link.orientation === 0}
                        class:i-mdi-chevron-right={link.orientation === 1}
                        class:i-mdi-chevron-down={link.orientation === 2}
                        class:i-mdi-chevron-left={link.orientation === 3} />
                    {/if}
                  </a>
                </svelte:self>
              </li>
            {:else}
              <!-- TODO: page.url.pathname -->
              <li
                class="p4 text-black hover:bg-black/[0.2] dark:(hover:bg-white/[0.2] text-white) {$page.url.pathname ===
                link.url
                  ? 'font-bold'
                  : ''}">
                <a
                  href={link.url}
                  target={nav.target}
                  class="flex items-center cursor-pointer">
                  {link.name}
                </a>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    {/if}
  </div>
{/if}

<style>
  .pos-up {
    --at-apply: 'top-[-110%] left-0';
  }
  .pos-right {
    --at-apply: 'top-[-1px] left-[100%]';
  }
  .pos-down {
    --at-apply: 'top-[110%] left-0';
  }
  .pos-left {
    --at-apply: 'top-0 right-[100%]';
  }
</style>
