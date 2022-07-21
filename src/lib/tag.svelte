<script lang="ts">
  import type { Tags } from '$lib/types/tags';
  export let thisTag: Tags.AllTags;

  function handleClick() {
    console.log(thisTag);
  }
</script>

<button
  class="text-sm m-1 normal-case border-2 border-dotted btn btn-ghost border-black/[0.5] dark:(border-white/[0.5]) active:(scale-80 transition-transform duration-250 ease-in-out)"
  on:click={handleClick}>
  {thisTag.name}
</button>
