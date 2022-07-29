<script context="module">
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import { siteConfig, navConfig, mobilenavConfig } from '$config/site';
  import { theme } from '$stores/themes';
  import { fly } from 'svelte/transition';
  import Dropdown from '$lib/dd.svelte';
  import { tagsCur } from '$stores/tags';
  import { postsShow } from '$stores/posts';

  let search = false;
  let pin: boolean = true;
  let percent: number;
  let [scrollY, lastY] = [0, 0];
  $: if (scrollY) {
    pin = lastY - scrollY > 0 || scrollY === 0 ? true : false;
    lastY = scrollY;
    if (browser)
      percent =
        Math.round(
          (scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 10000,
        ) / 100;
  }

  function resetHome() {
    if (browser && window.location.pathname === '/') {
      window.history.replaceState({}, '', '/');
      tagsCur.init();
      postsShow.init();
    }
  }
</script>

<svelte:window bind:scrollY />

<header id="header" class="fixed w-screen ease-in-out border-transparent max-h-16 z-40">
  {#if !search}
    <div
      id="header-nav"
      class="flex items-center justify-items-center border-transparent backdrop-blur py-2 px-4"
      in:fly={{ x: -50, duration: 300, delay: 300 }}
      out:fly={{ x: -50, duration: 300 }}>
      <div class="lg:hidden rounded-lg light:(hover:bg-gray/[0.5]) dark:(hover:bg-gray/[0.25])">
        <Dropdown nav={mobilenavConfig} class="text-sm p2 ">
          <button aria-label="nav menu" class="flex items-center ">
            <div class="i-mdi-hamburger-menu !w-[1.5rem] !h-[1.5rem]" />
          </button>
        </Dropdown>
      </div>

      <a href="/" class="text-xl font-semibold normal-case btn btn-ghost" on:click={resetHome}>
        {siteConfig.title}
      </a>

      <div class="hidden lg:(flex)">
        {#each navConfig as n}
          <Dropdown class="text-lg px3 py2 btn btn-ghost " nav={n} />
        {/each}
      </div>

      <div class="ml-auto">
        <button
          aria-label="search"
          on:click={() => (search = !search)}
          tabindex="0"
          class="btn active:translate-y-2 duration-500 ease-out group">
          <div
            class="!w-[1.75rem] !h-[1.75rem] i-carbon-search group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
        </button>
      </div>
      {#key $theme}
        <div>
          <button
            aria-label="Dark Mode Switch"
            on:click={theme.toggle}
            class="btn active:translate-y-2 duration-500 ease-out group">
            <div
              class="!w-[1.75rem] !h-[1.75rem] i-carbon-sun dark:i-carbon-moon group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
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
        <input type="text" name="q" id="index-search" class="grow mx-4 my-2 px-2 h-8 rounded bg-transparent border-1" />
        <button class="btn display-inline-block active:translate-y-2 duration-500 ease-out group">
          <div
            class="!w-[1.75rem] !h-[1.75rem] i-carbon-search group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
        </button>
      </form>
      <div class="mr-4">
        <button on:click={() => (search = !search)} class="btn active:translate-y-2 duration-500 ease-out group">
          <div
            class="!w-[2rem] !h-[2rem] i-carbon-close group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
        </button>
      </div>
    </div>
  {/if}
</header>

<button
  id="totop"
  on:click={() => {
    window.scrollTo(0, 0);
  }}
  class:translate-y-24={!pin || scrollY === 0}
  aria-label="scroll to top"
  class="fixed grid group border-none bottom-2 right-2 z-50 duration-500 ease-in-out rounded-full bg-transparent"
  class:opacity-100={scrollY}>
  <div
    class="backdrop-blur rounded-full col-start-1 row-start-1 transition-all duration-500 ease-in-out scale-75 relative bg-transparent">
    <div class="absolute z-50 top-[2rem] left-[1.9rem] i-mdi-chevron-up !h-[2.5rem] !w-[2.5rem]" />
    <svg
      height="100"
      width="100"
      class="fill-none group-hover:fill-stone-300"
      style="transform: rotate(-90deg);stroke-dasharray: 251;">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#428bca"
        stroke-width="6"
        style="stroke-dashoffset: {251 - (251 * Math.trunc(percent)) / 100};" />
    </svg>
  </div>
</button>

<style lang="scss">
</style>
