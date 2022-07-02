<script context="module">
</script>

<script lang="ts">
  import type { DD } from '$types/dd';

  import { site } from '$config/site';
  import { theme } from '$lib/stores/themes';
  import { fly } from 'svelte/transition';
  import Dropdown from '$lib/dd.svelte';

  let search = false;

  /** Mockup data*/
  let nav: Array<DD.Nav | DD.Link> = [
    {
      name: 'About',
      orientation: 2,
      links: [
        {
          name: 'QWER',
          orientation: 1,
          links: [
            {
              name: 'Svelte',
              url: '/qwer-Svelte',
            },
            {
              name: 'Introduction',
              url: '/qwer-introduction',
            },
          ],
        },
        {
          name: 'Me',
          orientation: 3,
          links: [
            {
              name: 'Left',
              url: '/me-left',
            }
          ],
        }
      ],
    },
    {
      name: 'Projects',
      url: '/projects',
    },
  ];
  let mobile_nav: DD.Nav = {
    orientation: 2,
    links: [
      {
        name: 'About Me',
        orientation: 1,
        links: [
          {
            name: 'first',
            orientation: 1,
            links: [
              {
                name: 'first-byte',
                url: '/first-byte',
              },
              {
                name: 'first-second-byte',
                url: '/first-second-byte',
              },
            ],
          },
          {
            name: 'second',
            orientation: 1,
            links: [
              {
                name: 'first-byte',
                url: '/first-byte',
              },
              {
                name: 'first-second-byte',
                url: '/first-second-byte',
              },
            ],
          }
        ],
      },
      {
        name: 'Projects',
        url: '/projects',
      },
    ],
  };
</script>

<header id="header" class="fixed w-screen all:(transition-500) ease-in-out border-transparent max-h-16 z-40">
  {#if !search}
    <div
      id="header-nav"
      class="flex items-center justify-items-center border-transparent backdrop-blur py-2 px-4"
      in:fly={{ x: -50, duration: 300, delay: 300 }}
      out:fly={{ x: -50, duration: 300 }}>
      <div class="lg:hidden">
        <Dropdown nav={mobile_nav} class="text-sm p2">
          <button aria-label="nav menu" class="flex items-center">
            <div class="i-mdi-hamburger-menu !w-[1.5rem] !h-[1.5rem]" />
          </button>
        </Dropdown>
      </div>

      <a sveltekit:prefetch href="/" target="_self" class="text-xl font-semibold normal-case btn btn-ghost">
        {site.title}
      </a>

      <div class="hidden lg:(flex)">
        {#each nav as n}
          <Dropdown class="text-lg px3 py2 btn btn-ghost " nav={n} />
        {/each}
      </div>

      <div class="ml-auto">
        <button aria-label="search" on:click={() => (search = !search)} tabindex="0" class="btn btn-ghost">
          <div class="!w-[1.75rem] !h-[1.75rem] i-carbon-search" />
        </button>
      </div>
      {#key $theme}
        <div>
          <button aria-label="Dark Mode Switch" on:click={theme.toggle} class="btn btn-ghost">
            <div class="!w-[1.75rem] !h-[1.75rem] i-carbon-sun dark:i-carbon-moon" />
          </button>
        </div>
      {/key}
    </div>
  {:else}
    <div
      id="header-nav"
      class="flex border-transparent backdrop-blur items-center py-2"
      in:fly={{ x: 50, duration: 300, delay: 300 }}
      out:fly={{ x: 50, duration: 300 }}>
      <form accept-charset="UTF-8" class="grow flex">
        <input
          type="text"
          name="q"
          id="index-search"
          class="grow mx-4 my-2 px-2 h-8 rounded  bg-transparent border-1" />
        <button class="btn btn-ghost display-inline-block">
          <div class="!w-[1.75rem] !h-[1.75rem] i-carbon-search" />
        </button>
      </form>
      <div class="mr-4">
        <button on:click={() => (search = !search)} class="btn btn-ghost">
          <div class="!w-[2rem] !h-[2rem] i-carbon-close" />
        </button>
      </div>
    </div>
  {/if}
</header>

<style>
</style>
