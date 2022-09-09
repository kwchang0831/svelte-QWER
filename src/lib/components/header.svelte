<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { browser } from '$app/environment';
  import { siteConfig, navConfig, mobilenavConfig } from '$config/site';
  import { theme } from '$stores/themes';
  import { fly } from 'svelte/transition';
  import Dropdown from '$lib/components/dd.svelte';
  import { tagsCur } from '$stores/tags';
  import { postsShow } from '$stores/posts';
  import { navigating, page } from '$app/stores';
  import { postsAll } from '$stores/posts';
  import AuthorAvatar from '$lib/components/image_avatar.svelte';
  import { lastUpdatedStr } from '$lib/utli/timeFormat';
  import { afterUpdate, onMount } from 'svelte';
  import { query, result } from '$lib/search/stores';

  function resetHome() {
    if (browser && window.location.pathname === '/') {
      window.history.replaceState({}, '', '/');
      tagsCur.init();
      postsShow.init();
    }
  }

  let search = false;
  let searchbox: HTMLElement;
  let curPost: Post.Post | undefined;
  let lastUpdated: string;

  $: curPost = $postsAll.get($page.routeId ?? '');
  $: lastUpdated = lastUpdatedStr(curPost?.updated ?? '');
  $: if (searchbox) searchbox.focus();

  let scrollY: number;
  let lastY: number = 0;
  let innerHeight: number;
  let scrollHeight: number;
  let scrollPercent: number;
  let pageEndTopBound: number;
  let scrollingUp: boolean = false;
  let scrollThresholdStep: number;
  const topPercent = 0.025;
  const botPercent = 0.975;

  $: scrollThresholdStep = innerHeight * 0.1;
  $: if (browser) {
    scrollPercent = scrollY / pageEndTopBound;
    pageEndTopBound = scrollHeight - innerHeight;
    if (Math.abs(lastY - scrollY) > scrollThresholdStep) {
      scrollingUp = lastY - scrollY > 0;
      lastY = scrollY;
    }
  }
  afterUpdate(() => {
    scrollHeight = document.documentElement.scrollHeight;
  });

  let timer: string | number | NodeJS.Timeout | undefined;
  let input: string;
  function handleInput() {
    query.set(input);
  }
  function onSubmit() {
    query.set(input);

    let params = new URLSearchParams(window.location.search);
    params.set('query', input);

    if (params) {
      window.history.replaceState({}, '', `?${params.toString()}`);
    } else {
      window.history.replaceState({}, '', '/');
    }

    search = false;
    input = '';
  }
  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleInput();
    }, 500);
  };

  onMount(() => {
    query.init();
  });

  $: if ($navigating) {
    search = false;
    input = '';
    query.reset();
    $result = undefined;
  }
</script>

<svelte:window bind:scrollY bind:innerHeight />

<header id="header" class="fixed w-screen ease-in-out z-40" aria-label="Header Nav">
  {#if !search}
    <nav
      id="header-nav"
      class="backdrop-blur py-2 px-4 min-h-4rem max-h-16 {scrollY >= scrollThresholdStep ? 'shadow-lg' : ''}"
      in:fly={{ x: -50, duration: 300, delay: 300 }}
      out:fly={{ x: -50, duration: 300 }}>
      {#if curPost && scrollY > scrollThresholdStep}
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
              <AuthorAvatar
                width="16px"
                height="16px"
                class="inline-block !w4 !h4 object-cover aspect-1 rounded-full hover:rotate-[360deg] transition-transform duration-1000 ease-in-out" />
              <span class="font-semibold mx1">{siteConfig.author.name}</span>
              <span class="font-semibold mx1">·</span>
              {lastUpdated}
            </p>
          </div>
          <div class="ml-auto flex">
            {#key $theme}
              <button
                aria-label="Dark Mode Switch"
                on:click={theme.toggle}
                class="btn active:translate-y-2 duration-500 ease-out group">
                <div
                  class="!w8 !h8 i-line-md-sunny-outline-loop dark:i-line-md-moon group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
              </button>
            {/key}
          </div>
        </div>
      {:else}
        <div
          class="flex items-center justify-items-center"
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

          <div class="ml-auto flex">
            {#key $page}
              <button
                class:hidden={$page.routeId !== ''}
                aria-label="search"
                tabindex="0"
                on:click={() => {
                  search = !search;
                }}
                class="btn active:translate-y-2 duration-600 ease-out group">
                <div
                  class="!w8 !h8 i-carbon-search group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
              </button>
            {/key}
            {#key $theme}
              <button
                aria-label="Dark Mode Switch"
                on:click={theme.toggle}
                class="btn active:translate-y-2 duration-600 ease-out group">
                <div
                  class="!w8 !h8 i-line-md-sunny-outline-loop dark:i-line-md-moon group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
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
      <form on:submit|preventDefault={onSubmit} accept-charset="UTF-8" class="grow flex">
        <input
          bind:this={searchbox}
          bind:value={input}
          on:input={debounce}
          on:keydown={(e) => {
            if (e.code === 'Escape') {
              input = '';
              search = false;
              $result = undefined;
              handleInput();
            }
          }}
          type="text"
          name="query"
          id="index-search"
          class="grow mx-4 my-2 px-2 h-8 rounded bg-transparent border-1" />
        <button class="btn display-inline-block active:translate-y-2 duration-500 ease-out group">
          <div class="!w8 !h8 i-carbon-search group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
        </button>
      </form>
      <div class="mr-4">
        <button on:click={() => (search = !search)} class="btn active:translate-y-2 duration-500 ease-out group">
          <div
            class="!w-[2rem] !h-[2rem] i-carbon-close group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
        </button>
      </div>
    </nav>
  {/if}
</header>

{#if scrollingUp && scrollPercent > topPercent && scrollPercent < botPercent}
  <button
    id="totop"
    on:click={() => {
      scrollY = 0;
    }}
    aria-label="scroll to top"
    in:fly={{ y: 50, duration: 300, delay: 300 }}
    out:fly={{ y: 50, duration: 300 }}
    class="fixed grid group border-none bottom-2 right-2 z-50 duration-600 delay-300 ease-in-out rounded-full bg-transparent">
    <div
      class="backdrop-blur rounded-full col-start-1 row-start-1 transition-all duration-600 ease-in-out scale-70 relative bg-transparent">
      <div
        class="absolute z-50 top-[1.85rem] left-[1.85rem] i-mdi-chevron-up !h-[2.5rem] !w-[2.5rem] group-hover:text-black" />
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
          style="stroke-dashoffset: {251 - 251 * scrollPercent};" />
      </svg>
    </div>
  </button>
{/if}

{#if !scrollingUp && scrollPercent > topPercent && scrollPercent < botPercent}
  <button
    id="tobotoom"
    on:click={() => {
      scrollY = scrollHeight;
    }}
    aria-label="scroll to bottom"
    in:fly={{ y: 50, duration: 300, delay: 300 }}
    out:fly={{ y: 50, duration: 300 }}
    class="fixed grid group border-none bottom-2 right-2 z-50 duration-600 delay-300 ease-in-out rounded-full bg-transparent">
    <div
      class="backdrop-blur rounded-full col-start-1 row-start-1 transition-all duration-600 ease-in-out scale-70 relative bg-transparent">
      <div
        class="absolute z-50 top-[1.85rem] left-[1.85rem] i-mdi-chevron-down !h-[2.5rem] !w-[2.5rem] group-hover:text-black" />
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
          style="stroke-dashoffset: {251 - 251 * scrollPercent};" />
      </svg>
    </div>
  </button>
{/if}
