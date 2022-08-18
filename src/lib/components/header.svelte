<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { browser } from '$app/env';
  import { siteConfig, navConfig, mobilenavConfig } from '$config/site';
  import { theme } from '$stores/themes';
  import { fly } from 'svelte/transition';
  import Dropdown from '$lib/components/dd.svelte';
  import { tagsCur } from '$stores/tags';
  import { postsShow } from '$stores/posts';
  import { page } from '$app/stores';
  import { postsAll } from '$stores/posts';
  import AuthorAvatar from '$lib/components/author_avatar.svelte';
  import { lastUpdatedStr } from '$lib/utli/timeFormat';

  let search = false;
  let pin: boolean = true;
  let percent: number;
  let [scrollY, lastY] = [0, 0];
  $: if (scrollY) {
    pin = lastY - scrollY > 0 || scrollY === 0 ? true : false;
    lastY = scrollY;
    if (browser) {
      percent =
        Math.round(
          (scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 10000,
        ) / 100;
    }
  }

  function resetHome() {
    if (browser && window.location.pathname === '/') {
      window.history.replaceState({}, '', '/');
      tagsCur.init();
      postsShow.init();
    }
  }

  let curPost: Post.Post | undefined;
  let lastUpdated: string;

  $: curPost = $postsAll.get($page.routeId ?? '');
  $: lastUpdated = lastUpdatedStr(curPost?.updated ?? '');
</script>

<svelte:window bind:scrollY />

<header tabindex="0" id="header" class="fixed w-screen ease-in-out border-transparent z-40" aria-label="Header Nav">
  {#if !search}
    <nav
      id="header-nav"
      class="border-transparent backdrop-blur py-2 px-4 min-h-4rem max-h-16 {scrollY >= 32
        ? 'light:bg-white/[0.25]'
        : ''}"
      in:fly={{ x: -50, duration: 300, delay: 300 }}
      out:fly={{ x: -50, duration: 300 }}>
      {#if curPost && scrollY > 32}
        <div
          class="flex items-center justify-items-center justify-between"
          in:fly={{ y: -50, duration: 300, delay: 300 }}
          out:fly={{ y: -50, duration: 300 }}>
          <div class="flex flex-col items-start overflow-hidden">
            <button
              class="m1 link text-left w-full"
              on:click={() => {
                window.scrollTo(0, 0);
              }}>
              <p class="mx2 text-xl font-semibold normal-case truncate text-ellipsis">
                {curPost.title}
              </p>
            </button>
            <p class="text-xs mx2 op80 flex items-center">
              <AuthorAvatar class="h4 w4" />
              <span class="font-semibold mx1">{siteConfig.author.name}</span>
              <span class="font-semibold mx1">·</span>
              {lastUpdated}
            </p>
          </div>
          <div class="ml-auto flex">
            <!-- <button
        aria-label="search"
        on:click={() => (search = !search)}
        tabindex="0"
        class="btn active:translate-y-2 duration-500 ease-out group">
        <div
          class="!w-[1.75rem] !h-[1.75rem] i-carbon-search group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
      </button> -->
            {#key $theme}
              <button
                aria-label="Dark Mode Switch"
                on:click={theme.toggle}
                class="btn active:translate-y-2 duration-500 ease-out group">
                <div
                  class="!w-[1.75rem] !h-[1.75rem] i-carbon-sun dark:i-carbon-moon group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
              </button>
            {/key}
          </div>
        </div>
      {:else}
        <div
          class="flex items-center justify-items-center"
          in:fly={{ y: -50, duration: 300, delay: 300 }}
          out:fly={{ y: -50, duration: 300 }}>
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

          <div class="ml-auto flex">
            <!-- <button
        aria-label="search"
        on:click={() => (search = !search)}
        tabindex="0"
        class="btn active:translate-y-2 duration-500 ease-out group">
        <div
          class="!w-[1.75rem] !h-[1.75rem] i-carbon-search group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
      </button> -->
            {#key $theme}
              <button
                aria-label="Dark Mode Switch"
                on:click={theme.toggle}
                class="btn active:translate-y-2 duration-500 ease-out group">
                <div
                  class="!w-[1.75rem] !h-[1.75rem] i-carbon-sun dark:i-carbon-moon group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
              </button>
            {/key}
          </div>
        </div>
      {/if}
    </nav>
  {:else}
    <nav
      id="header-nav"
      class="flex border-transparent backdrop-blur items-center py-2"
      in:fly={{ x: 50, duration: 300, delay: 300 }}
      out:fly={{ x: 50, duration: 300 }}>
      <!-- <form accept-charset="UTF-8" class="grow flex">
        <input type="text" name="q" id="index-search" class="grow mx-4 my-2 px-2 h-8 rounded bg-transparent border-1" />
        <button class="btn display-inline-block active:translate-y-2 duration-500 ease-out group">
          <div
            class="!w-[1.75rem] !h-[1.75rem] i-carbon-search group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
        </button>
      </form> -->
      <div class="mr-4">
        <button on:click={() => (search = !search)} class="btn active:translate-y-2 duration-500 ease-out group">
          <div
            class="!w-[2rem] !h-[2rem] i-carbon-close group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
        </button>
      </div>
    </nav>
  {/if}
</header>

<button
  id="totop"
  on:click={() => {
    window.scrollTo(0, 0);
  }}
  class:translate-y-24={!pin || scrollY <= 7.5}
  aria-label="scroll to top"
  class="fixed grid group border-none bottom-2 right-2 z-50 duration-500 ease-in-out rounded-full bg-transparent"
  class:opacity-100={scrollY}>
  <div
    class="backdrop-blur rounded-full col-start-1 row-start-1 transition-all duration-500 ease-in-out scale-75 relative bg-transparent">
    <div
      class="absolute z-50 top-[2rem] left-[1.9rem] i-mdi-chevron-up !h-[2.5rem] !w-[2.5rem] group-hover:text-black" />
    <svg
      height="100"
      width="100"
      class="fill-none group-hover:fill-gray-500/[0.5]"
      style="transform: rotate(-90deg);stroke-dasharray: 251;">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke-width="6"
        class="stroke-emerald"
        style="stroke-dashoffset: {251 - (251 * Math.trunc(percent)) / 100};" />
    </svg>
  </div>
</button>

<button
  id="tobotoom"
  on:click={() => {
    window.scrollTo(0, document.body.scrollHeight);
  }}
  class:translate-y-24={pin || percent > 92.5}
  aria-label="scroll to bottom"
  class="fixed grid group border-none bottom-2 right-2 z-50 duration-500 ease-in-out rounded-full bg-transparent"
  class:opacity-100={scrollY}>
  <div
    class="backdrop-blur rounded-full col-start-1 row-start-1 transition-all duration-500 ease-in-out scale-75 relative bg-transparent">
    <div
      class="absolute z-50 top-[2rem] left-[1.9rem] i-mdi-chevron-down !h-[2.5rem] !w-[2.5rem] group-hover:text-black" />
    <svg
      height="100"
      width="100"
      class="fill-none group-hover:fill-gray-500/[0.5]"
      style="transform: rotate(-90deg);stroke-dasharray: 251;">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke-width="6"
        class="stroke-emerald"
        style="stroke-dashoffset: {251 - (251 * Math.trunc(percent)) / 100};" />
    </svg>
  </div>
</button>
