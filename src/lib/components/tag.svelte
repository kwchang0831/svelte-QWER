<script lang="ts">
  import type { Tags } from '$lib/types/tags';
  export let data: Tags.Tag;

  import { tagsCur } from '$stores/tags';
  import { postsShow } from '$stores/posts';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { replaceState } from '$app/navigation';

  function handleClick() {
    let category = data.category === 'tags' ? data.category : `tags-${encodeURI(data.category)}`;
    if (tagsCur.has(data)) {
      $page.url.searchParams.delete(category);
    }
    tagsCur.toggle(data);
    const activeTags = $tagsCur.get(data.category);
    if (activeTags) {
      $page.url.searchParams.set(category, Array.from(activeTags).join(','));
    }
    const params = $page.url.searchParams.toString();
    if (browser) {
      replaceState('', params.length > 0 ? `?${params}` : '/');
    }
    postsShow.filter();
  }
</script>

{#key $tagsCur}
  <button
    class:btn_active={tagsCur.has(data)}
    class="text-sm m-1 normal-case border-2 border-dotted btn hover:(border-[#007300] border-solid) border-black/[0.5] dark:(border-white/[0.5]) active:(scale-80 transition-transform duration-250 ease-in-out)"
    on:click={handleClick}
    on:touchstart={handleClick}>
    {data.name}
  </button>
{/key}

<style>
  .btn_active {
    --at-apply: 'font-bold shadow-lg bg-black/[0.6] text-white dark:(bg-white/[0.85] text-black) hover:(border-[#CC0000] border-solid)';
  }
</style>
