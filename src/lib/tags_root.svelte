<script lang="ts">
  import { slide, fade } from 'svelte/transition';
  import Tags from '$lib/tags.svelte';
  import { onMount } from 'svelte';

  let ready = false;
  onMount(() => (ready = true));

  let className: any = undefined;
  export { className as class };

  export let expaned = true;

  function toggle() {
    expaned = !expaned;
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

{#if ready}
  <side id="index-tags" class={className} transition:fade={{ duration: 300 }}>
    <div class="flex justify-between items-center border-b-2 py-2 cursor-pointer" on:click={toggle}>
      <h2 class:expaned class="text-2xl">Tags</h2>
      <div
        class="{expaned ? 'i-tabler-fold-down' : 'i-tabler-fold-up'} display-inline-block !w-[1.75rem] !h-[1.75rem]" />
    </div>

    {#if expaned}
      <div transition:slide={{ duration: 300 }} class="py-4 ">
        {#each data as d}
          <Tags {...d} expanded />
        {/each}
      </div>
    {/if}
  </side>
{/if}
