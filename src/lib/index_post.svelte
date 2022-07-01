<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  export let id: number;
  export let title: string;
  export let published: string;
  export let summary: string;
  export let cover: string | null;
  export let cover_style: string | null;

  let ready = false;
  onMount(() => (ready = true));
</script>

{#if ready}
  <article
    in:fly={{ x: id % 2 ? 100 : -100, duration: 300, delay: 300 }}
    out:fly={{ x: id % 2 ? -100 : 100, duration: 300 }}
    class="flex flex-col gap-2 group hover:shadow-2xl w-screen transform transition duration-250 border-black md:(w-3xl rounded-lg !border-none border-transparent hover:(scale-105)) bg-[#FAF9F6]/[0.75]  dark:(bg-[#171717]/[0.75] border-white)">
    {#if cover_style && 'lr'.indexOf(cover_style) !== -1}
      <div class="flex border-t-1 border-b-1  md:border-none">
        <div
          class="ml-auto shrink-0 w-52 relative overflow-hidden md:rounded"
          class:order-first={cover_style === 'l' || cover_style === 't'}
          class:order-last={cover_style === 'r'}>
          <a href="/" alt={title} class="cursor-pointer">
            <img
              class="group-hover:scale-110 absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-cover"
              src={cover}
              alt={cover} />
          </a>
        </div>
        <div class="px-8 py-6 grow">
          <div class="">{published}</div>
          <h2 class="text-2xl font-bold">
            <a href="/" class="title-link-orange-500-orange-500">{title}</a>
          </h2>
          <p class="font-medium">{summary}</p>
        </div>
      </div>
    {:else if cover_style && 'tb'.indexOf(cover_style) !== -1}
      <div class="flex flex-col border-t-1 border-b-1 md:border-none">
        <div
          class="shrink-0 h-64 relative overflow-hidden md:rounded "
          class:order-first={cover_style === 't'}
          class:order-last={cover_style === 'b'}>
          <a href="/" alt={title} class="cursor-pointer">
            <img
              class="group-hover:scale-110 absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-cover"
              src={cover}
              alt={cover} />
          </a>
        </div>
        <div class="px-8 py-6 grow flex flex-col gap-1">
          <div class="">{published}</div>
          <h2 class="text-2xl font-bold">
            <a href="/" class="title-link-orange-500-orange-500">{title}</a>
          </h2>
          <p class="font-medium">{summary}</p>
        </div>
      </div>
    {:else}
      <div class="flex flex-col border-t-1 border-b-1 md:border-none">
        <div class="px-8 py-8 grow">
          <div class="">{published}</div>
          <h2 class="text-2xl font-bold">
            <a href="/" class="title-link-orange-500-orange-500">{title}</a>
          </h2>
          <p class="font-medium">{summary}</p>
        </div>
      </div>
    {/if}
  </article>
{/if}
