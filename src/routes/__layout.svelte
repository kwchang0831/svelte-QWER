<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import '@unocss/reset/sanitize/sanitize.css';
  import '@unocss/reset/sanitize/assets.css';
  import '@unocss/reset/tailwind.css';
  import 'uno.css';
  import '../prism.css'

  import Header from '$lib/header.svelte';
  import Footer from '$lib/footer.svelte';
</script>

<Header />
<div class="pt-[4rem] min-h-50vh">
  <slot />
</div>
<Footer />

<style>
  :global(body) {
    @apply bg-[#E1E3DD]/[0.9] text-black;
  }
  :global(body.dark) {
    @apply bg-[#191919]/[0.9] text-white;
  }
</style>
