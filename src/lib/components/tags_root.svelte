<script lang="ts">
  import LL from '$i18n/i18n-svelte';
  import { slide, fly } from 'svelte/transition';
  import TagsCategory from '$lib/components/tags_category.svelte';
  let scrollY = 0;
  let className: string | undefined = undefined;
  export { className as class };

  export let expaned = true;
  import { tagsAll } from '$stores/tags';

  function toggle() {
    expaned = !expaned;
  }

  let curTags = $tagsAll;
  let originalTags = JSON.stringify($tagsAll);
  let timer: number | undefined;
  let input: string;
  function handleInput() {
    curTags = JSON.parse(originalTags);

    if (!input || input.length === 0) return;

    curTags.map((c: { tags: any[] }) => {
      c.tags = c.tags.filter((tag) => {
        return tag.name.toLowerCase().includes(input.toLowerCase());
      });
      return c;
    });
    curTags = curTags.filter((c: { tags: any[] }) => {
      return c.tags.length > 0;
    });
  }
  const debounce = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      handleInput();
    }, 500);
  };

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  function mouseDownHandler(e: { clientX: number; clientY: number }) {
    const elm = document.getElementById('index-tags');
    if (elm) {
      pos = {
        left: elm.scrollLeft,
        top: elm.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  function touchStartHandler(e: TouchEvent) {
    const elm = document.getElementById('index-tags');
    if (elm) {
      pos = {
        left: elm.scrollLeft,
        top: elm.scrollTop,
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }

    document.addEventListener('touchmove', touchMoveHandler);
    document.addEventListener('touchend', touchEndHandler);
  }

  function mouseMoveHandler(e: { clientX: number; clientY: number }) {
    const elm = document.getElementById('index-tags');
    if (elm) {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      elm.scrollTop = pos.top + dy;
      elm.scrollLeft = pos.left - dx;
    }
  }

  function touchMoveHandler(e: TouchEvent) {
    const elm = document.getElementById('index-tags');
    if (elm) {
      const dx = e.touches[0].clientX - pos.x;
      const dy = e.touches[0].clientY - pos.y;

      elm.scrollTop = pos.top + dy;
      elm.scrollLeft = pos.left - dx;
    }
  }

  function mouseUpHandler() {
    const elm = document.getElementById('index-tags');
    if (elm) {
      elm.style.cursor = 'grab';
      elm.style.removeProperty('user-select');
    }
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }

  function touchEndHandler() {
    const elm = document.getElementById('index-tags');
    if (elm) {
      elm.style.cursor = 'grab';
      elm.style.removeProperty('user-select');
    }
    document.removeEventListener('touchmove', touchMoveHandler);
    document.removeEventListener('touchend', touchEndHandler);
  }

  import { browser } from '$app/environment';
  let box: Element;
  let boxH: number;
  let upMore = false;
  let downMore = false;

  $: if (browser && box) {
    const top = 0;
    upMore = box.scrollTop > top;
    downMore = boxH !== 0 && box.scrollHeight > box.scrollTop + boxH;
  }

  function handleScroll() {
    const top = 0;
    upMore = box.scrollTop > top;
    downMore = boxH !== 0 && box.scrollHeight > box.scrollTop + boxH;
  }

  function handleUpMore() {
    if (upMore) {
      const elm = document.getElementById('index-tags');
      if (elm) {
        elm.scrollBy({ top: -boxH, behavior: 'smooth' });
      }
    }
  }

  function handleDownMore() {
    if (downMore) {
      const elm = document.getElementById('index-tags');
      if (elm) {
        elm.scrollBy({ top: boxH, behavior: 'smooth' });
      }
    }
  }
</script>

<svelte:window bind:scrollY />
{#if $tagsAll.length}
  <aside
    in:fly={{ x: 100, duration: 300, delay: 300 }}
    out:fly={{ x: 100, duration: 300 }}
    on:mousedown={mouseDownHandler}
    on:touchstart|preventDefault={touchStartHandler}
    class={className ?? ''}>
    <div
      class="select-none flex justify-between items-center border-b-2 border-black dark:border-white cursor-pointer"
      on:click={toggle}
      on:keydown={(e) => {
        if (e.key === 'Enter') toggle();
      }}>
      <h2 class:expaned class="text-2xl my2">{$LL.Tags()}</h2>

      <div
        class="{expaned ? 'i-tabler-fold-down' : 'i-tabler-fold-up'} display-inline-block !w-[1.75rem] !h-[1.75rem]" />
    </div>
    <form on:submit|preventDefault class="flex items-center relative">
      <input
        bind:value={input}
        on:input={debounce}
        on:keydown={(e) => {
          if (input && input.length > 0 && e.key === 'Escape') {
            input = '';
            handleInput();
          }
        }}
        placeholder={$LL.FilterTags()}
        class="my2 px2 py1 bg-transparent border-2 border-x-2 border-black/[0.5] dark:border-white/[0.5] rounded flex-1" />
      {#if input && input.length > 0}
        <div
          class="absolute right-0 cursor-pointer w10 h8 rounded flex items-center justify-center"
          on:click={() => {
            input = '';
            handleInput();
          }}
          on:keydown={(e) => {
            if (e.key === 'Enter') {
              input = '';
              handleInput();
            }
          }}>
          <div class="i-carbon-close-filled !w6 !h6" />
        </div>
      {/if}
    </form>
    <div
      on:click={handleUpMore}
      on:touchend={handleUpMore}
      on:keydown={(e) => {
        if (e.key === 'Enter') {
          handleUpMore();
        }
      }}
      class="hidden xl:(block py1) {upMore ? 'cursor-pointer  hover:bg-gray/[0.5]' : ''}">
      <div class="i-bxs-chevrons-up w6 h6 m-auto {upMore ? 'op100' : 'op0'}" />
    </div>
    {#key curTags}
      {#if expaned}
        <div
          bind:this={box}
          bind:clientHeight={boxH}
          on:scroll={handleScroll}
          id="index-tags"
          transition:slide={{ duration: 300 }}
          class="pb4 select-none pointer-grabbing xl:(max-h-70vh overflow-hidden)">
          {#each curTags as c}
            <TagsCategory data={c} expanded />
          {/each}
        </div>
      {/if}
    {/key}
    <div
      on:click={handleDownMore}
      on:touchend={handleDownMore}
      on:keydown={(e) => {
        if (e.key === 'Enter') {
          handleDownMore();
        }
      }}
      class="hidden xl:(block py1) {downMore ? 'cursor-pointer hover:bg-gray/[0.5]' : ''}">
      <div class="i-bxs-chevrons-down w6 h6 m-auto {downMore ? 'op100 ' : 'op0'}" />
    </div>
  </aside>
{/if}

<style lang="scss">
  #index-tags {
    background-color: var(--qwer-bg-color);
    color: var(--qwer-text-color);
  }

  input::placeholder {
    color: var(--qwer-input-placeholder-text-color);
  }
</style>
