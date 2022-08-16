<script lang="ts">
  import { page } from '$app/stores';

  import '@unocss/reset/sanitize/sanitize.css';
  import '@unocss/reset/sanitize/assets.css';
  import '@unocss/reset/tailwind.css';
  import 'uno.css';
  import 'tippy.js/dist/tippy.css';
  import 'tippy.js/themes/material.css';
  import 'tippy.js/animations/shift-away.css';

  import { fly } from 'svelte/transition';
  import Head from '$lib/components/head.svelte';
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
</script>

<Head />

<Header />

<!-- {#key data && data['props']['path']} -->
{#key $page.url.pathname}
  <div in:fly={{ y: 100, duration: 300, delay: 300 }} out:fly={{ y: -100, duration: 300 }} class="pt-[4rem] min-h-75vh">
    <slot />
  </div>
{/key}

<Footer />

<style lang="scss">
  :global(body) {
    @apply bg-[#E1E3DD]/[0.9] text-black;
  }
  :global(body.dark) {
    @apply bg-[#191919]/[0.9] text-white;
  }

  :global(.tippy-box) {
    --at-apply: 'text-base text-center';
  }
</style>
