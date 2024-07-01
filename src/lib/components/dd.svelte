<script lang="ts">
  import type { DD } from '$lib/types/dd';

  /**
   * //TODO: page.url.pathname
   * For now, we teats all links as internal links
   * Need to make sure make account for external links
   *
   * //TODO: CSS Version of dropdown instead of JS
   *
   * //TODO: Mobile: scroll away to hide
   */
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let className = '';
  export { className as class };

  import { slide } from 'svelte/transition';
  import { quartIn } from 'svelte/easing';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let nav: DD.Nav | DD.Link;

  export let active = false;

  function show() {
    active = true;
  }
  function hide() {
    active = false;
    dispatch('message', {
      ddActive: false,
    });
  }

  function handleMessage(event: { ddActive: boolean }) {
    active = event.ddActive;
  }

  function isInternalLink(url: string) {
    if (!url) return false;
    const domain = window.location.origin;
    return url.startsWith('/') || url.startsWith(domain);
  }

  function handleNavigation(link: string | undefined) {
    if (link) {
      if (isInternalLink(link)) {
        goto(link);
      } else {
        window.location.href = link;
      }
      hide();
    }
  }
</script>

{#if nav}
  <div
    role="button"
    tabindex="0"
    on:message
    on:mouseenter={show}
    on:mouseleave={hide}
    class="relative cursor-pointer {className ?? ''}">
    <slot>
      {#if nav.url}
        <a href={nav.url} target={nav.target} rel={nav.rel} class="flex items-center cursor-pointer gap-2">
          {nav.name}
          {#if 'links' in nav && nav.links}
            <span
              class="!w-[1.5rem] !h-[1.5rem] display-inline-block"
              class:i-mdi-chevron-up={nav.orientation === 0}
              class:i-mdi-chevron-right={nav.orientation === 1}
              class:i-mdi-chevron-down={nav.orientation === 2}
              class:i-mdi-chevron-left={nav.orientation === 3} />
          {/if}
        </a>
      {:else}
        <span class="flex items-center cursor-pointer gap-2">
          {nav.name}
          {#if 'links' in nav && nav.links}
            <span
              class="!w-[1.5rem] !h-[1.5rem] display-inline-block"
              class:i-mdi-chevron-up={nav.orientation === 0}
              class:i-mdi-chevron-right={nav.orientation === 1}
              class:i-mdi-chevron-down={nav.orientation === 2}
              class:i-mdi-chevron-left={nav.orientation === 3} />
          {/if}
        </span>
      {/if}
    </slot>

    {#if active && 'links' in nav && nav.links}
      <div
        transition:slide|global={{ duration: 300, easing: quartIn }}
        class:pos-up={nav.orientation === 0}
        class:pos-right={nav.orientation === 1}
        class:pos-down={nav.orientation === 2}
        class:pos-left={nav.orientation === 3}
        class="absolute w-max bg-white dark:bg-black rounded-lg">
        <ul class="flex flex-col tracking-wide rounded-lg border-1 border-black dark:border-white">
          {#each nav.links as link}
            {#if 'links' in link}
              <li
                class="first:rounded-t-lg last:rounded-b-lg text-black hover:bg-black/[0.2] dark:(hover:bg-white/[0.2] text-white)">
                <svelte:self nav={link} on:message={handleMessage}>
                  <!-- TODO: page.url.pathname -->
                  <a
                    href={link.url}
                    target={nav.target}
                    rel={nav.rel}
                    on:click={() => {
                      handleNavigation(link.url);
                    }}
                    on:touchstart={() => {
                      handleNavigation(link.url);
                    }}
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
                {#if link.url}
                  <a
                    data-sveltekit-preload-data={link.prefetch ? '' : 'off'}
                    href={link.url}
                    target={nav.target}
                    rel={nav.rel}
                    on:click={() => {
                      handleNavigation(link.url);
                    }}
                    on:touchstart={() => {
                      handleNavigation(link.url);
                    }}
                    on:keydown={(e) => {
                      if (e.key === 'Enter') {
                        handleNavigation(link.url);
                      }
                    }}
                    class="flex items-center cursor-pointer">
                    {link.name}
                  </a>
                {:else}
                  <span
                    role="button"
                    tabindex="0"
                    on:click={() => {
                      handleNavigation(link.url);
                    }}
                    on:touchstart={() => {
                      handleNavigation(link.url);
                    }}
                    on:keydown={(e) => {
                      if (e.key === 'Enter') {
                        handleNavigation(link.url);
                      }
                    }}
                    class="flex items-center cursor-pointer">
                    {link.name}
                  </span>
                {/if}
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
