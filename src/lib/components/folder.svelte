<script lang="ts">
  import File from '$lib/components/file.svelte';
  import type { Folder } from '$lib/types/folder';

  export let expanded = true;
  export let name: string;
  export let files: Array<Folder.Item>;

  function toggle() {
    expanded = !expanded;
  }
</script>

<div
  class="flex justify-start items-center cursor-pointer"
  on:click={toggle}
  on:keydown={(e) => {
    if (e.key === 'Enter') {
      toggle();
    }
  }}>
  <div
    class="{expanded ? 'i-fluent-emoji-flat-open-file-folder' : 'i-fluent-emoji-flat-file-folder'} !w8 !h8 shrink-0" />
  <div class="px2">
    {name}
  </div>
</div>

{#if expanded}
  <ul>
    {#each files as file}
      <li>
        {#if file.files}
          <svelte:self {...file} />
        {:else}
          <File name={file.name} icon={file.icon} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    --at-apply: 'border-gray/[0.5] border-l-2';
    padding: 0.2em 0 0 0.5em;
    margin: 0 0 0 0.5em;
    list-style: none;
  }

  li {
    padding: 0.2em 0;
  }
</style>
