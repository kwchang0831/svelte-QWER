<script lang="ts">
  let className: any = undefined;
  export { className as class };

  import { fly } from 'svelte/transition';
</script>

<section id="index-profile" class={className}>
  <div class="relative group">
    <figure>
      <img
        src="https://www.kwchang0831.dev/assets/maskable@192.webp"
        alt="index profile avatar"
        class="rounded-full shadow-xl w-32 h-32 hover:rotate-[360deg] transition-transform !duration-1000 ease-in-out" />
    </figure>
    <div
      class="absolute rounded-full w-8 h-8 bottom-0 left-24 shadow-xl text-lg bg-white flex justify-center items-center animate-heart-beat dark:bg-[#212121]">
      ❤️
    </div>
  </div>

  <h1 class="text-2xl font-bold">kwchang0831</h1>
  <p class="text-base op75">
    Do it. Just do it!
    <br />
    Don't let your dreams be dreams!
  </p>

  <div class="flex flex-row">
    <a href="mailto:contact@kwchang0831.dev" class="btn btn-ghost" aria-label="Email">
      <div class=":uno: !w-[1.75rem] !h-[1.75rem]  i-ic-baseline-mail" />
    </a>
    <a href="https://github.com/kwchang0831" class="btn btn-ghost" aria-label="Github">
      <div class=":uno: !w-[1.75rem] !h-[1.75rem]  i-carbon-logo-github" />
    </a>
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
