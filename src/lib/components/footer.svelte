<script lang="ts">
  import { siteConfig } from '$config/site';
  import { fly } from 'svelte/transition';
  import { postsShow } from '$stores/posts';
  import tippy from '$lib/actions/tippy';
  import { onMount } from 'svelte';
  import { LL } from '$i18n/i18n-svelte';

  let className: string | undefined = undefined;
  export { className as class };

  const sinceYear = siteConfig.since ? siteConfig.since.toString() : undefined;
  const curYear = new Date().toJSON().substring(0, 4);
  const copyrightYear = `${sinceYear && sinceYear !== curYear ? `${sinceYear}-${curYear}` : `${curYear}`}`;

  let loaded = false;
  onMount(() => {
    loaded = true;
  });
</script>

{#if loaded}
  {#key $postsShow}
    <footer
      id="footer"
      in:fly={{ y: 100, duration: 1200, delay: 900 }}
      out:fly={{ y: 100, duration: 300 }}
      class="flex flex-col justify-center items-center flex-none w-full mx-auto xl:mx-0 {className ?? ''}">
      <main class="rounded-b-2xl pb6 my4 gap1 flex flex-col justify-center items-center md:(border-t-2 w-3xl mt-8)">
        <div class="hidden">
          {@html '\x54\x68\x69\x73\x20\x73\x69\x74\x65\x20\x69\x73\x20\x67\x65\x6E\x65\x72\x61\x74\x65\x64\x20\x62\x79\x20\x3C\x61\x20\x72\x65\x6C\x3D\x22\x6E\x6F\x72\x65\x66\x65\x72\x72\x65\x72\x20\x6E\x6F\x6F\x70\x65\x6E\x65\x72\x20\x65\x78\x74\x65\x72\x6E\x61\x6C\x22\x20\x74\x61\x72\x67\x65\x74\x3D\x22\x5F\x62\x6C\x61\x6E\x6B\x22\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x73\x3A\x2F\x2F\x67\x69\x74\x68\x75\x62\x2E\x63\x6F\x6D\x2F\x6B\x77\x63\x68\x61\x6E\x67\x30\x38\x33\x31\x2F\x73\x76\x65\x6C\x74\x65\x2D\x51\x57\x45\x52\x22\x3E\x20\x51\x57\x45\x52\x20\x3C\x2F\x61\x3E\x20\x2D\x20\x53\x69\x6D\x70\x6C\x79\x20\x41\x77\x65\x73\x6F\x6D\x65\x20\x42\x6C\x6F\x67\x20\x53\x74\x61\x72\x74\x65\x72\x20\x62\x75\x69\x6C\x74\x20\x77\x69\x74\x68\x20\x53\x76\x65\x6C\x74\x65\x4B\x69\x74\x20\x61\x6E\x64\x20\x4C\x6F\x76\x65\x2E'}
        </div>
        <div class="flex justify-center mt-4">
          <a use:tippy href="/atom.xml" class="btn btn-ghost" aria-label="Atom Feed" data-sveltekit-preload-data="off">
            <div class="!w-[1.75rem] !h-[1.75rem] i-ic-baseline-rss-feed" />
          </a>
          <a use:tippy href="/sitemap.xml" class="btn btn-ghost" aria-label="Sitemap" data-sveltekit-preload-data="off">
            <div class="!w-[1.75rem] !h-[1.75rem] i-mdi-sitemap-outline" />
          </a>
        </div>
        <p itemprop="copyrightNotice">
          Copyright © <span itemprop="copyrightYear">{copyrightYear}</span>
          <a href={siteConfig.author.github} rel="external author">
            <span itemprop="copyrightHolder">{siteConfig.author.name}</span>
          </a>
        </p>
        <div class="">
          Powered by
          <a
            use:tippy
            aria-label={$LL.QWER()}
            rel="external"
            href="https://github.com/kwchang0831/svelte-QWER"
            class="font-900">
            QWER
          </a>
        </div>
        <a
          itemprop="copyrightNotice"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          aria-label="Creative Commons License"
          target="_blank"
          rel="noreferrer noopener license external"
          style="display:inline-block;">
          CC BY-NC-SA 4.0
        </a>
      </main>
    </footer>
  {/key}
{/if}

<style lang="scss">
  #footer main {
    background-color: var(--qwer-bg-color);
    color: var(--qwer-text-color);
    border-top-color: var(--qwer-border-top-color);
  }
  #footer a:not(.btn) {
    &:hover {
      color: var(--qwer-link-hover-color);
    }
  }
</style>
