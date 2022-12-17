<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { browser } from '$app/environment';
  import { siteConfig, navConfig, mobilenavConfig } from '$config/site';
  import { theme } from '$stores/themes';
  import { fly, fade } from 'svelte/transition';
  import Dropdown from '$lib/components/dd.svelte';
  import { tagsCur, tagsShowMobile, tagsShowDesktop } from '$stores/tags';
  import { postsShow } from '$stores/posts';
  import { navigating, page } from '$app/stores';
  import { postsAll } from '$stores/posts';
  import AuthorAvatar from '$lib/components/image_avatar.svelte';
  import { lastUpdatedStr } from '$lib/utli/timeFormat';
  import { afterUpdate, onMount } from 'svelte';
  import { query, result, searching } from '$lib/search/stores';
  import { LL } from '$i18n/i18n-svelte';

  function resetHome() {
    tagsCur.init();
    postsShow.init();
    if (browser) {
      window.history.replaceState({}, '', '/');
    }
  }

  let searchbox: HTMLElement;
  let curPost: Post.Post | undefined;
  let lastUpdated: string;

  $: curPost = $postsAll.get($page.route?.id?.substring(1) ?? '');
  $: lastUpdated = lastUpdatedStr(curPost?.updated ?? '');
  $: if (searchbox) searchbox.focus();

  let scrollY: number;
  let lastY = 0;
  let innerHeight: number;
  let scrollHeight: number;
  let scrollPercent: number;
  let pageEndTopBound: number;
  let scrollingUp = false;
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

  let timer: number | undefined;
  let input: string;

  function handleInput() {
    query.set(input);
  }

  function onSubmit() {
    query.set(input);

    if (input && input.length) {
      $page.url.searchParams.set('query', input);
    } else {
      $page.url.searchParams.delete('query');
    }

    const params = $page.url.searchParams.toString();
    window.history.replaceState({}, '', params.length > 0 ? `?${params}` : '/');

    $searching = false;
  }

  function closeSearch() {
    input = '';
    query.reset();
    $searching = false;
    $page.url.searchParams.delete('query');
    const params = $page.url.searchParams.toString();
    window.history.replaceState({}, '', params.length > 0 ? `?${params}` : '/');
  }

  const debounce = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      handleInput();
    }, 500);
  };

  onMount(() => {
    query.init();
  });

  $: if ($navigating) {
    $searching = false;
    input = '';
    query.reset();
    $result = undefined;
  }
</script>

<svelte:window
  bind:scrollY
  bind:innerHeight
  on:keydown={(e) => {
    if (e.key === '/') {
      e.preventDefault();
      if (!$searching) {
        $searching = true;
        input = $query;
      }
    }
  }} />

<header id="header" class="fixed w-screen ease-in-out z-40" aria-label="Header Nav">
  {#if !$searching}
    <nav
      id="header-nav"
      class:backdrop-blur={scrollY > scrollThresholdStep}
      class="py-2 px-4 min-h-4rem max-h-16 {scrollY >= scrollThresholdStep ? 'shadow-lg' : ''}"
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
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <div class="lg:hidden rounded-lg btn btn-ghost !p0">
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
            {#if $page.route?.id && $page.route.id === '/'}
              {#key $page}
                <button
                  id="search"
                  aria-label="search"
                  tabindex="0"
                  on:click={() => {
                    $searching = true;
                  }}
                  in:fade={{ duration: 300, delay: 300 }}
                  out:fade={{ duration: 300 }}
                  class="mx2 btn active:translate-y-2 duration-600 ease-out group flex items-center gap2 md:(border-1 border-black/[0.25] dark:border-white/[0.25])">
                  <div
                    class="!w7 !h7 i-carbon-search group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
                  <label for="#search" class="hidden md:inline-block">
                    <span class="mx2">{$LL.IndexSearchBox()}</span>
                    <kbd>/</kbd>
                  </label>
                </button>
              {/key}
            {/if}
            {#if $page.route?.id && $page.route.id === '/'}
              <button
                in:fade={{ duration: 300, delay: 300 }}
                out:fade={{ duration: 300 }}
                aria-label="Tags"
                on:click={() => {
                  $tagsShowDesktop = !$tagsShowDesktop;
                }}
                class="btn active:translate-y-2 duration-600 ease-out group hidden xl:inline-block">
                <div
                  class:i-mdi-tag-off={$tagsShowDesktop}
                  class:i-mdi-tag={!$tagsShowDesktop}
                  class="!w7 !h7 group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
              </button>
              <button
                in:fade={{ duration: 300, delay: 300 }}
                out:fade={{ duration: 300 }}
                aria-label="Tags"
                on:click={() => {
                  $tagsShowMobile = !$tagsShowMobile;
                }}
                class="btn active:translate-y-2 duration-600 ease-out group xl:hidden">
                <div
                  class:i-mdi-tag-off={$tagsShowMobile}
                  class:i-mdi-tag={!$tagsShowMobile}
                  class="!w7 !h7 group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
              </button>
            {/if}
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
      <form on:submit|preventDefault={onSubmit} class="grow flex items-center" action="/search">
        <input
          bind:this={searchbox}
          bind:value={input}
          on:input={debounce}
          on:keydown={(e) => {
            if (e.code === 'Escape') {
              closeSearch();
            }
          }}
          type="text"
          name="query"
          placeholder={$LL.IndexSearchBox()}
          spellcheck="false"
          id="index-search"
          class="grow mx4 px2 h10 rounded bg-transparent border-1 border-black dark:border-white focus:!border-red" />
        <button class="btn display-inline-block active:translate-y-2 duration-500 ease-out group md:hidden">
          <div class="!w8 !h8 i-carbon-search group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
        </button>
      </form>
      <button
        on:click={() => ($searching = false)}
        class="mx2 btn active:translate-y-2 duration-500 ease-out group flex items-center gap2 md:(border-1 border-black/[0.25] dark:border-white/[0.25])"
        aria-label="close-search"
        id="close-search">
        <div class="!w8 !h8 i-carbon-close group-hover:(transition-transform duration-300 scale-120 ease-in-out)" />
        <label for="#close-search" class="hidden md:inline-block">
          <span class="mx2">{$LL.IndexCloseSearchBox()}</span>
          <kbd>ESC</kbd>
        </label>
      </button>
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

<style>
  #header {
    background-color: var(--qwer-bg-color);
    color: var(--qwer-text-color);
  }

  kbd {
    --at-apply: 'border-1 px2 py1 rounded';
    border-color: var(--qwer-text-color);
  }

  input:focus {
    --at-apply: '!border-transparent';
    outline-color: var(--qwer-input-outline-color) !important;
  }
</style>
