<script context="module">
</script>

<script lang="ts">
  import { site } from '$config/site';
  import { theme } from '$lib/stores/themes';
</script>

<header id="header">
  <a href="/" sveltekit:prefetch>{site.title}</a>

  {#key $theme}
    <div class=":uno: all:transition-400 animate-slide-in-down">
      <button aria-label="Dark Mode Switch" on:click={theme.toggle}>
        <div class=":uno: !w-[2rem] !h-[2rem] text-inherit i-carbon-sun dark:i-carbon-moon" />
      </button>
    </div>
  {/key}
</header>

<style>
  #header {
    @apply fixed w-screen h-[3rem] bg-red-500 flex flex-wrap items-center justify-between px-5 py-2;
  }
</style>
