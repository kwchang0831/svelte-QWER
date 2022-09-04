<script lang="ts">
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
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  import { navigating } from '$app/stores';
  import NProgress from 'nprogress';
  import '$lib/styles/nprogress.css';
  // Full list: https://github.com/rstacruz/nprogress#configuration
  NProgress.configure({ minimum: 0.2, easing: 'ease', speed: 600 });
  $: $navigating ? NProgress.start() : NProgress.done();

  import { setLocale } from '$i18n/i18n-svelte';
  import { loadLocale } from '$i18n/i18n-util.sync';
  import { siteConfig } from '$config/site';
  import { locales, baseLocale } from '$i18n/i18n-util';

  if (locales.includes(siteConfig.lang)) {
    loadLocale(siteConfig.lang);
    setLocale(siteConfig.lang);
  } else {
    loadLocale(baseLocale);
    setLocale(baseLocale);
  }
</script>

<Head />

<Header />

{#key data.props.path}
  <div in:fly={{ y: 100, duration: 300, delay: 300 }} out:fly={{ y: -100, duration: 300 }} class="pt-[4rem] min-h-75vh">
    <slot />
  </div>
{/key}

<Footer />

<style lang="scss">
  :global(body) {
    --at-apply: 'bg-[#E1E3DD]/[0.9] text-black';
  }
  :global(body.dark) {
    --at-apply: 'bg-[#191919]/[0.9] text-white';
  }

  :global(.tippy-box) {
    --at-apply: 'text-base text-center';
  }
</style>
