<script context="module">
</script>

<script lang="ts">
  import { site } from '$config/site';
  import { theme } from '$lib/stores/themes';
  import { fly } from 'svelte/transition';
  import Dropdown from '$lib/dropdown.svelte';

  let search = false;

  let link_data = [
    {
      name: 'About',
      links: [
        {
          name: 'Intro QWER',
          link: '/about/qwer',
        },

        {
          name: 'Favorite',
          link: '/favs',
        },
      ],
    },
    {
      name: 'Projects',
      link: '/projects',
    },
  ];
</script>

<header id="header" class="fixed w-screen all:(transition-500) ease-in-out border-transparent max-h-16 z-40">
  {#if !search}
    <div
      id="header-nav"
      class="flex items-center border-transparent backdrop-blur py-2 px-4"
      in:fly={{ x: -50, duration: 300, delay: 300 }}
      out:fly={{ x: -50, duration: 300 }}>
      <div class="lg:hidden">
        <Dropdown links={link_data} orientation="b">
          <div class="i-mdi-hamburger-menu !w-[1.5rem] !h-[1.5rem]" />
        </Dropdown>
      </div>

      <a sveltekit:prefetch href="/" target="_self" class="text-xl font-semibold normal-case btn btn-ghost">
        {site.title}
      </a>

      <div class="hidden lg:(flex)">
        {#each link_data as l}
          <Dropdown links={l.links} orientation="b">
            <a href={l.link ? l.link : '/#'} alt={l.link ? l.link : '/#'}>{l.name}</a>
            {#if l.links}
              <div class="!w-[1.5rem] !h-[1.5rem] i-mdi-chevron-down" />
            {/if}
          </Dropdown>
        {/each}
      </div>

      <div class="ml-auto">
        <button aria-label="search" on:click={() => (search = !search)} tabindex="0" class="btn btn-ghost">
          <div class="!w-[2rem] !h-[2rem] i-carbon-search" />
        </button>
      </div>
      {#key $theme}
        <div>
          <button aria-label="Dark Mode Switch" on:click={theme.toggle} class="btn btn-ghost">
            <div class="!w-[2rem] !h-[2rem] i-carbon-sun dark:i-carbon-moon" />
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
          <div class="!w-[2rem] !h-[2rem] i-carbon-search" />
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
