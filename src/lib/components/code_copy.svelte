<script lang="ts">
  import { dev } from '$app/environment';
  import { fly, fade } from 'svelte/transition';

  let hovered = false;
  let copied = false;
  let codeblock: HTMLElement;

  function handleEnter() {
    hovered = true;
  }

  function handleLeave() {
    hovered = false;
    copied = false;
  }

  function handleCopy() {
    copied = true;
    const codes = codeblock.querySelectorAll('.code-content');
    const allCodeContent = Array.from(codes)
      .map((e) => e.textContent)
      .join('\n');

    if (dev) {
      console.log('COPY:', allCodeContent);
    } else {
      navigator.clipboard.writeText(allCodeContent);
      setTimeout(() => {
        copied = false;
      }, 2000);
    }
  }
</script>

<div
  bind:this={codeblock}
  on:mouseenter={handleEnter}
  on:mouseleave={handleLeave}
  class="relative overflow-hidden"
  role="button"
  tabindex="0">
  {#if hovered}
    <button
      aria-label="Copy all codes"
      type="button"
      in:fly|global={{ y: -25, duration: 300, delay: 300 }}
      out:fly|global={{ y: -25, duration: 300 }}
      on:click={handleCopy}
      class="group absolute z-40 right-2 top-2 p2 h-10 w-10 rounded-xl border-2 bg-gray-700 dark:bg-gray-800 {copied
        ? 'border-green-400 focus:border-green-500 focus:outline-none'
        : 'border-gray-300 hover:border-sky-500'}">
      {#key copied}
        <div
          in:fade|global={{ duration: 300, delay: 300 }}
          out:fade|global={{ duration: 300 }}
          class:i-carbon-document-blank={!copied}
          class:i-carbon-document-tasks={copied}
          class="!w5 !h5 color-white m-auto" />
      {/key}
    </button>
  {/if}
  <slot />
</div>
