<script lang="ts">
  import { onMount } from 'svelte';
  import tippy from '$lib/actions/tippy';

  export let tags: [];
  let formattedTags: { category: string; name: string; url: string }[];

  onMount(async () => {
    formattedTags = tags
      ?.map((c: string | string[] | { string: string } | { string: string[] }) => {
        if (typeof c === 'string') return { category: 'tags', name: c, url: `/?tags=${c}` };
        if (Array.isArray(c)) {
          return c.map((v) => {
            return { category: 'tags', name: v, url: `/?tags=${v}` };
          });
        }
        const [key, value] = Object.entries(c)[0];
        if (Array.isArray(value)) {
          return value.map((v) => {
            return { category: key, name: v, url: `/?tags-${key}=${v}` };
          });
        }
        return { category: key, name: value, url: `/?tags-${key}=${value}` };
      })
      .flat();
  });
</script>

{#if formattedTags}
  <div class="divider" />

  <div class="flex gap-x-2 mx8 flex-wrap">
    {#each formattedTags as tag}
      <a use:tippy class="btn btn-ghost" rel="tag" href={tag.url} aria-label="{tag.category}: {tag.name}">
        #{tag.name}
      </a>
    {/each}
  </div>
{/if}
