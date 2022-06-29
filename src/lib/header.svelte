<script context="module">
</script>

<script lang="ts">
  import { site } from '$config/site';
  import { theme } from '$lib/stores/themes';
  import { fly } from 'svelte/transition';
</script>

<header id="header" class="fixed w-screen all:(transition-500) ease-in-out border-transparent max-h-16 z-40">
  <div
    id="header-nav"
    class="flex items-center justify-between border-transparent backdrop-blur"
    in:fly={{ x: -50, duration: 300, delay: 300 }}
    out:fly={{ x: -50, duration: 300 }}>
    <a href="/" sveltekit:prefetch class="text-xl font-semibold normal-case mx-4 my-2 btn btn-ghost">{site.title}</a>

    {#key $theme}
      <div class="all:transition-300">
        <button aria-label="Dark Mode Switch" on:click={theme.toggle} class="mx-4 my-2 btn btn-ghost">
          <div class="!w-[2rem] !h-[2rem] text-inherit i-carbon-sun dark:i-carbon-moon" />
        </button>
      </div>
    {/key}
  </div>
</header>

<style>
</style>
