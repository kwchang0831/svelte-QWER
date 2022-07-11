<script lang="ts" context="module">
  export const prerender = true;
  export const load = async ({ url }: { url: URL }) => ({
    props: {
      path: url.pathname,
    },
  });
</script>

<script lang="ts">
  import '@unocss/reset/sanitize/sanitize.css';
  import '@unocss/reset/sanitize/assets.css';
  import '@unocss/reset/tailwind.css';
  import 'uno.css';
  import { fly } from 'svelte/transition';
  import Header from '$lib/header.svelte';
  import Footer from '$lib/footer.svelte';
  export let path: string;
</script>

<Header />
{#key path}
  <div in:fly={{ y: 100, duration: 300, delay: 300 }} out:fly={{ y: -100, duration: 300 }} class="pt-[4rem] min-h-50vh">
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
