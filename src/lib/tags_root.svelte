<script lang="ts">
  import { slide } from 'svelte/transition';
  import Tags from '$lib/tags.svelte';

  let className: any = undefined;
  export { className as class };

  export let rootExpaned = true;

  function rootToggle() {
    rootExpaned = !rootExpaned;
  }

  let data = [
    {
      type: 'category',
      name: 'year',
      tags: [
        { name: '2020', bc: ['year', '2020'] },
        { name: '2021', bc: ['year', '2021'] },
        { name: '2022', bc: ['year', '2022'] },
      ],
    },
    {
      type: 'category',
      name: 'lang',
      tags: [
        { name: 'elixir', bc: ['lang', 'elixir'] },
        { name: 'svelte', bc: ['lang', 'svelte'] },
        { name: 'javascript', bc: ['lang', 'javascript'] },
        { name: 'typescript', bc: ['lang', 'typescript'] },
        { name: 'elixir', bc: ['lang', 'elixir'] },
        { name: 'svelte', bc: ['lang', 'svelte'] },
        { name: 'javascript', bc: ['lang', 'javascript'] },
        { name: 'typescript', bc: ['lang', 'typescript'] },
        { name: 'elixir', bc: ['lang', 'elixir'] },
        { name: 'svelte', bc: ['lang', 'svelte'] },
        { name: 'javascript', bc: ['lang', 'javascript'] },
        { name: 'typescript', bc: ['lang', 'typescript'] },
      ],
    },
    {
      type: 'tags',
      name: 'tags',
      tags: [
        { name: 'disc', bc: ['disc'] },
        { name: 'woop', bc: ['woop'] },
        { name: 'unorg', bc: ['unorg'] },
        { name: 'disc', bc: ['disc'] },
        { name: 'woop', bc: ['woop'] },
        { name: 'unorg', bc: ['unorg'] },
        { name: 'disc', bc: ['disc'] },
        { name: 'woop', bc: ['woop'] },
        { name: 'unorg', bc: ['unorg'] },
        { name: 'disc', bc: ['disc'] },
        { name: 'woop', bc: ['woop'] },
        { name: 'unorg', bc: ['unorg'] },
        { name: 'disc', bc: ['disc'] },
        { name: 'woop', bc: ['woop'] },
        { name: 'unorg', bc: ['unorg'] },
        { name: 'disc', bc: ['disc'] },
        { name: 'woop', bc: ['woop'] },
        { name: 'unorg', bc: ['unorg'] },
        { name: 'disc', bc: ['disc'] },
        { name: 'woop', bc: ['woop'] },
        { name: 'unorg', bc: ['unorg'] },
      ],
    },
  ];
</script>

<side id="index-tags" class={className}>
  <h2 on:click={rootToggle} class="text-2xl border-b-2 py-1">Tags</h2>

  {#if rootExpaned}
    <div transition:slide={{ duration: 300 }} class="py-4 ">
      {#each data as d}
        <Tags {...d} expanded />
      {/each}
    </div>
  {/if}
</side>
