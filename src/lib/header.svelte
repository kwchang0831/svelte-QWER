<script context="module">
</script>

<script lang="ts">
  import { site } from '$config/site';
  import { theme } from '$lib/stores/themes';
  import { fly } from 'svelte/transition';
  let search: boolean = false;
</script>

<header id="header" class="fixed w-screen all:(transition-500) ease-in-out border-transparent max-h-16 z-40">
  {#if !search}
    <div
      id="header-nav"
      class="flex items-center border-transparent backdrop-blur py-2"
      in:fly={{ x: -50, duration: 300, delay: 300 }}
      out:fly={{ x: -50, duration: 300 }}>
      <a href="/" sveltekit:prefetch class="text-xl font-semibold normal-case mx-4 btn btn-ghost">{site.title}</a>

      <div class="ml-auto">
        <button aria-label="search" on:click={() => (search = !search)} tabindex="0" class="btn btn-ghost">
          <div class="!w-[2rem] !h-[2rem] i-carbon-search" />
        </button>
      </div>
      {#key $theme}
        <div class="mr-4">
          <button aria-label="Dark Mode Switch" on:click={theme.toggle} class="btn btn-ghost">
            <div class="!w-[2rem] !h-[2rem] i-carbon-sun dark:i-carbon-moon" />
          </button>
        </div>
      {/key}
    </div>
  {:else}
    <div id="header-nav" class="flex items-center py-2" in:fly={{ x: 50, duration: 300, delay: 300 }} out:fly={{ x: 50, duration: 300 }}>
      <form accept-charset="UTF-8" class="grow flex">
        <input type="text" name="index-search" id="index-search" class="grow my-2 mx-4 rounded  bg-transparent border-1">
        <button class="btn btn-ghost">
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
