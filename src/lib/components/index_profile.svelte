<script lang="ts">
  import { siteConfig } from '$config/site';
  import AuthorAvatar from '$lib/components/image_avatar.svelte';
  import tippy from '$lib/actions/tippy';

  let className: string | undefined = undefined;
  export { className as class };
</script>

<section id="index-profile" class="h-card p-author rounded-2xl py10 px12 my4 {className ?? ''}">
  <a href={siteConfig.url} class="hidden u-url u-uid">{siteConfig.title}</a>
  {#if siteConfig.author.email}
    <p class="hidden u-email">
      {siteConfig.author.email}
    </p>
  {/if}

  <div class="relative group">
    <AuthorAvatar />
    <div
      id="status-tip"
      role="tooltip"
      use:tippy={{ placement: 'right', interactive: true, allowHTML: true }}
      data-tippy-content={siteConfig.author.statusTip}
      class="absolute rounded-full w-8 h-8 bottom-0 left-24 shadow-xl text-lg flex justify-center items-center animate-heart-beat">
      {siteConfig.author.status ?? ''}
    </div>
  </div>

  <h1 class="p-name text-2xl font-bold">{siteConfig.author.name}</h1>
  <p class="p-note text-base op75">
    {@html siteConfig.author.bio}
  </p>

  <div class="flex">
    {#if siteConfig.author.email}
      <a
        use:tippy
        href="mailto:{siteConfig.author.email}"
        rel="author external"
        class="btn btn-ghost"
        aria-label="Email">
        <div class="!w-[1.75rem] !h-[1.75rem] i-ic-baseline-mail" />
      </a>
    {/if}
    {#if siteConfig.author.github}
      <a
        use:tippy
        href={siteConfig.author.github}
        rel="author external"
        class="u-url u-uid btn btn-ghost"
        aria-label="Github">
        <div class="!w-[1.75rem] !h-[1.75rem] i-carbon-logo-github" />
      </a>
    {/if}
    {#if siteConfig.author.twitter}
      <a
        use:tippy
        href={siteConfig.author.twitter}
        rel="author external"
        class="u-url u-uid btn btn-ghost"
        aria-label="Twitter">
        <div class="!w-[1.75rem] !h-[1.75rem] i-carbon-logo-twitter" />
      </a>
    {/if}
  </div>
</section>

<style lang="scss">
  #index-profile {
    background-color: var(--qwer-bg-color);
    color: var(--qwer-text-color);
  }
  #status-tip {
    background-color: var(--qwer-bg-color);
  }

  .animate-heart-beat {
    animation: heartbeat 2s ease-in-out 2s infinite;
  }
  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }

    2% {
      transform: scale(1);
    }

    4% {
      transform: scale(1.1);
    }

    8% {
      transform: scale(1.12);
    }

    20% {
      transform: scale(0.94);
    }

    24% {
      transform: scale(1.12);
    }

    32% {
      transform: scale(1.1);
    }

    40% {
      transform: scale(1);
    }
  }
</style>
