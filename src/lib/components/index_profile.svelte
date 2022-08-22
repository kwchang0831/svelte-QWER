<script lang="ts">
  import { fly } from 'svelte/transition';
  import { siteConfig } from '$config/site';
  import AuthorAvatar from '$lib/components/image_avatar.svelte';
  import tippy from '$lib/actions/tippy';

  let className: any = undefined;
  export { className as class };
</script>

<section id="index-profile" class={className}>
  <div class="relative group">
    <AuthorAvatar />
    <div
      class="absolute rounded-full w-8 h-8 bottom-0 left-24 shadow-xl text-lg bg-white flex justify-center items-center animate-heart-beat dark:bg-[#212121]">
      {siteConfig.author.status ?? ''}
    </div>
  </div>

  <h1 class="text-2xl font-bold">{siteConfig.author.name}</h1>
  <p class="text-base op75">
    {@html siteConfig.author.bio}
  </p>

  <div class="flex flex-row">
    {#if siteConfig.author.email}
      <a use:tippy href="mailto:{siteConfig.author.email}" class="btn btn-ghost" aria-label="Email">
        <div class="!w-[1.75rem] !h-[1.75rem]  i-ic-baseline-mail" />
      </a>
    {/if}
    {#if siteConfig.author.github}
      <a use:tippy href={siteConfig.author.github} class="btn btn-ghost" aria-label="Github">
        <div class="!w-[1.75rem] !h-[1.75rem]  i-carbon-logo-github" />
      </a>
    {/if}
    {#if siteConfig.author.twitter}
      <a use:tippy href={siteConfig.author.github} class="btn btn-ghost" aria-label="Twitter">
        <div class="!w-[1.75rem] !h-[1.75rem]  i-carbon-logo-twitter" />
      </a>
    {/if}
  </div>
</section>

<style>
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
