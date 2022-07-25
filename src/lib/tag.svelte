<script lang="ts">
  import type { Tags } from '$lib/types/tags';
  export let data: Tags.Tag;

  import { CurTags } from '$lib/stores/curTags';
  import { ShowPosts } from './stores/showPosts';

  let active = false;

  function handleClick() {
    active = true;
    CurTags.toggle(data);
    ShowPosts.addTag(data);
    ShowPosts.filter();
  }
</script>

<button
  class:btn_active={active}
  class="text-sm m-1 normal-case border-2 border-dotted btn hover:(border-[#007300] border-solid) border-black/[0.5] dark:(border-white/[0.5]) active:(scale-80 transition-transform duration-250 ease-in-out)"
  on:click={handleClick}>
  {data.name}
</button>

<style>
  .btn_active {
    --at-apply: 'font-bold shadow-lg bg-black/[0.6] text-white dark:(bg-white/[0.85] text-black) hover:(border-[#CC0000] border-solid)';
  }
</style>