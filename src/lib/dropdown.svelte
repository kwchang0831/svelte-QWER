<script lang="ts">
  let active: boolean;

  export let name: any;
  export let link: any;
  export let links: any;
  export let location: string;
</script>

<div class="relative">
  {#if link}
    <a class="btn btn-ghost" href={link}>{name}</a>
  {:else}
    {name}
  {/if}
</div>
