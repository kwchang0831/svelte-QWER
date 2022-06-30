<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import '@unocss/reset/tailwind.css';
  import 'uno.css';

  import Header from '$lib/header.svelte';
</script>

<Header />
<slot />

<style>
  :global(body) {
    @apply bg-[#E1E3DD]/[0.9] text-black;
  }
  :global(body.dark) {
    @apply bg-[#191919]/[0.9] text-white;
  }
</style>
