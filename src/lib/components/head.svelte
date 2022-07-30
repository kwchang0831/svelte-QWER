<script lang="ts">
  import { dev } from '$app/env'
  import { headConfig } from '$config/site'
</script>

<svelte:head>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.png" />
  <meta name="author" content="kwchang0831" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {#if headConfig.custom}
    {#each headConfig.custom({ dev}) as tag}
      {@html tag}
    {/each}
  {/if}
</svelte:head>