<script lang="ts" context="module">
  export const load = async ({ url }: { url: URL }) => {
    return {
      props: {
        path: url.pathname,
      },
    };
  };
</script>

<script lang="ts">
  import '@unocss/reset/sanitize/sanitize.css';
  import '@unocss/reset/sanitize/assets.css';
  import '@unocss/reset/tailwind.css';
  import 'uno.css';
  import { fly } from 'svelte/transition';
  import Head from '$lib/components/head.svelte';
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
  export let path: string;
</script>

<Head />

<Header />

{#key path}
  <div in:fly={{ y: 100, duration: 300, delay: 300 }} out:fly={{ y: -100, duration: 300 }} class="pt-[4rem]">
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
</style>
