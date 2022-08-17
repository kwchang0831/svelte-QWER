<script lang="ts">
  import { siteConfig } from '$config/site';
  import { fly } from 'svelte/transition';
  import { postsShow } from '$stores/posts';
  import tippy from '$lib/actions/tippy';

  let className: any = undefined;
  export { className as class };

  const sinceYear = siteConfig.since ? siteConfig.since.toString() : undefined;
  const curYear = new Date().toJSON().substring(0, 4);
  const copyrightYear = `${sinceYear && sinceYear !== curYear ? `${sinceYear}-${curYear}` : `${curYear}`}`;
</script>

{#key $postsShow}
  <footer
    in:fly={{ y: 100, duration: 1200, delay: 900 }}
    out:fly={{ y: 100, duration: 300 }}
    class="flex flex-col justify-center items-center flex-none w-full mx-auto xl:mx-0  {className}">
    <main
      class="my4 gap1 md:(border-t-2 w-3xl mt-8 border-black border-opacity-20 dark:(border-white border-opacity-10)) flex flex-col justify-center items-center">
      <div class="flex justify-center mt-4">
        <a use:tippy href="/atom.xml" class="btn btn-ghost" aria-label="Atom Feed">
          <div class="!w-[1.75rem] !h-[1.75rem] i-ic-baseline-rss-feed" />
        </a>
        <a use:tippy href="/sitemap.xml" class="btn btn-ghost" aria-label="Sitemap">
          <div class="!w-[1.75rem] !h-[1.75rem] i-mdi-sitemap-outline" />
        </a>
      </div>
      <p>
        Copyright © {copyrightYear}
        <a href={siteConfig.author.github} rel="noopener external" class="hover:(text-sky-500)">
          {siteConfig.author.name}
        </a>
      </p>
      <div>
        Powered by <a
          use:tippy
          aria-label="🚀 QWER [α] - Built using Svelte with ❤"
          rel="noopener external"
          target="_blank"
          href="https://github.com/kwchang0831/svelte-QWER"
          class="hover:(text-sky-500)">
          QWER
        </a>
      </div>
      <a
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
        aria-label="Creative Commons License"
        target="_blank"
        rel="license noopener noreferrer"
        style="display:inline-block;"
        class="hover:(text-sky-500)">
        CC BY-NC-SA 4.0
      </a>
    </main>
  </footer>
{/key}
