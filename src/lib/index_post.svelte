<script lang="ts">
  export let title: string;
  export let published: string;
  export let summary: string;
  export let cover: string | null;
  export let cover_style: string | null;
</script>

<article
  class="flex flex-col gap-2 group hover:shadow-2xl w-screen transform transition duration-250 border-black md:(w-3xl rounded-lg !border-none border-transparent hover:(scale-105)) bg-[#FAF9F6]/[0.75]  dark:(bg-[#171717]/[0.75] border-white)">
  <!-- <figure class="">
    <img class="w-full" src={cover} alt={cover}/>
  </figure> -->

  {#if cover_style && 'lr'.indexOf(cover_style) !== -1}
    <div class="flex border-1 md:!border-none">
      <div
        class="ml-auto shrink-0 w-52 relative overflow-hidden rounded"
        class:order-first={cover_style === 'l' || cover_style === 't'}
        class:order-last={cover_style === 'r'}>
        <a href="/" alt={title} class="cursor-pointer">
          <img
            class="group-hover:scale-110 absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-cover"
            src={cover}
            alt={cover} />
        </a>
      </div>
      <div class="px-8 py-8 grow">
        <div class="">{published}</div>
        <h2 class="text-2xl font-bold">
          <a href="/" class="title-link-orange-500-orange-500">{title}</a>
        </h2>
        <p class="font-medium">{summary}</p>
      </div>
    </div>
  {:else if cover_style && 'tb'.indexOf(cover_style) !== -1}
    <div class="flex flex-col border-1 md:!border-none">
      <div
        class="shrink-0 h-64 relative rounded overflow-hidden"
        class:order-first={cover_style === 't'}
        class:order-last={cover_style === 'b'}>
        <a href="/" alt={title} class="cursor-pointer">
          <img
            class="group-hover:scale-110 absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-cover"
            src={cover}
            alt={cover} />
        </a>
      </div>
      <div class="px-8 py-8 grow">
        <div class="">{published}</div>
        <h2 class="text-2xl font-bold">
          <a href="/" class="title-link-orange-500-orange-500">{title}</a>
        </h2>
        <p class="font-medium">{summary}</p>
      </div>
    </div>
  {:else}
    <div class="flex flex-col border-t-1 last:border-b-1 md:!border-none">
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
