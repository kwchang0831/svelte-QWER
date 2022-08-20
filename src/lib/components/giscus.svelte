<script lang="ts">
  import { onMount } from 'svelte';
  import { giscusConfig } from '$config/site';

  export let theme: string;

  onMount(() => {
    if (!giscusConfig.enable) return;

    const giscus = document.createElement('script');
    Object.entries({
      src: giscusConfig.src ?? 'https://giscus.app/client.js',
      'data-repo': giscusConfig.repo,
      'data-repo-id': giscusConfig.repoId,
      'data-category': giscusConfig.category ?? '',
      'data-category-id': giscusConfig.categoryId,
      'data-mapping': giscusConfig.mapping,
      'data-reactions-enabled': giscusConfig.reactionsEnabled,
      'data-input-position': giscusConfig.inputPosition ?? 'bottom',
      'data-theme': theme ?? 'preferred_color_scheme',
      'data-lang': giscusConfig.lang ?? 'en',
      'data-loading': giscusConfig.loading ?? '',
      crossorigin: 'anonymous',
      async: '',
    }).forEach(([key, value]) => {
      if (value) {
        giscus.setAttribute(key, value);
      }
    });

    setTimeout(() => {
      const observer = new MutationObserver(() => {
        document.getElementById('giscus-loading')?.remove();
        observer.disconnect();
      });

      const eGiscus = document.getElementById('giscus');
      if (eGiscus) {
        observer.observe(eGiscus, {
          childList: true,
        });
      }

      document.getElementById('giscus-container')?.appendChild(giscus);
    }, 1000);
  });
</script>

{#if giscusConfig.enable}
  <div id="giscus-container">
    <div id="giscus-loading" class="flex flex-col items-center gap2">
      <h2>Loading Giscus...</h2>
      <div class="i-line-md-loading-twotone-loop !h-16 !w-16" />
    </div>
    <div id="giscus" class="giscus" />
  </div>
{/if}
