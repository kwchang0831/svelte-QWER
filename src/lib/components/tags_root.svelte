<script lang="ts">
  import LL from '$i18n/i18n-svelte';
  import { slide, fly } from 'svelte/transition';
  import TagsCategory from '$lib/components/tags_category.svelte';
  let scrollY = 0;
  let className: any = undefined;
  export { className as class };

  export let expaned = true;
  import { tagsAll } from '$stores/tags';

  function toggle() {
    expaned = !expaned;
  }

  let curTags = $tagsAll;
  let originalTags = JSON.stringify($tagsAll);
  let timer: string | number | NodeJS.Timeout | undefined;
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
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleInput();
    }, 500);
  };
</script>

<svelte:window bind:scrollY />

{#if $tagsAll.length}
  <aside
    in:fly={{ x: 100, duration: 300, delay: 300 }}
    out:fly={{ x: 100, duration: 300 }}
    id="index-tags"
    class={className ?? ''}>
    <div
      class="select-none flex justify-between items-center border-b-2 border-black dark:border-white cursor-pointer"
      on:click={toggle}>
      <h2 class:expaned class="text-2xl my2">{$LL.Tags()}</h2>

      <div
        class="{expaned ? 'i-tabler-fold-down' : 'i-tabler-fold-up'} display-inline-block !w-[1.75rem] !h-[1.75rem]" />
    </div>
    <form class="flex items-center relative">
      <input
        bind:value={input}
        on:input={debounce}
        on:keydown={(e) => {
          if (input && input.length > 0 && e.code === 'Escape') {
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
          }}>
          <div class="i-carbon-close-filled !w6 !h6" />
        </div>
      {/if}
    </form>
    {#key curTags}
      {#if expaned}
        <div transition:slide={{ duration: 300 }} class="pt2 pb4 select-none">
          {#each curTags as c}
            <TagsCategory data={c} expanded />
          {/each}
        </div>
      {/if}
    {/key}
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
