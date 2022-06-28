<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import '@unocss/reset/tailwind.css';
  import 'uno.css';

  // import SvelteTheme from 'svelte-themes/SvelteTheme.svelte';
  import Header from '$lib/header.svelte';
  import Footer from '$lib/footer.svelte';
</script>

<Header />

<slot />

<Footer />

<style>
  :global(body) {
    @apply bg-white text-black;
  }
  :global(body.dark) {
    @apply bg-black/[0.9] text-white;
  }
</style>
