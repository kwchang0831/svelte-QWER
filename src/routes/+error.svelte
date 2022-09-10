<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$config/site';
  import LL from '$i18n/i18n-svelte';
  import Error404 from '$assets/404.webp';
</script>

<svelte:head>
  <title>404 | {siteConfig.title}</title>
</svelte:head>

<main>
  <article
    itemscope
    itemtype="https://schema.org/BlogPosting"
    class="pt-[4rem] relative flex flex-col items-center gap-4 justify-center">
    <h1 class="text-6xl">{$page.status ?? '404'}</h1>
    <p class="text-lg">{$page.status === 404 ? $LL.Page404NotFound() : $page.error?.message}</p>
    <img
      class:hidden={$page.status !== 404}
      draggable="false"
      class="select-none max-w-lg w-full h-auto"
      src={Error404}
      alt="404.webp" />
    <a href="/" class="btn btn-ghost underline text-lg !p4" target="_self">{$LL.Page404BackHome()}</a>
  </article>
</main>
