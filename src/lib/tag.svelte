<script lang="ts">
  export let name: string;
  export let bc: Array<string>;

  function handleClick() {
    console.log(bc);
  }
</script>

<button
  class="text-sm m-1 normal-case border-2 border-dotted btn btn-ghost border-black/[0.5] dark:(border-white/[0.5])"
  on:click={handleClick}>
  {name}
</button>
