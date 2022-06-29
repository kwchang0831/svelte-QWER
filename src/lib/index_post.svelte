<script lang="ts">
  export let title: string;
  export let published_date: string;
  export let subtitle: string;
</script>

<article
  class="px-8 py-8 flex flex-col gap-2 group hover:shadow-2xl w-screen transform transition duration-250 border-t-1 last:border-b-1 border-black md:(w-3xl rounded-lg !border-none border-transparent hover:(scale-105)) bg-[#FAF9F6]/[0.75]  dark:(bg-[#212121]/[0.75] border-white)">
  <div class="">{published_date}</div>
  <h2 class="text-2xl font-bold">
    <a href="/" class="title-link-orange-500-orange-500">{title}</a>
  </h2>
  <p class="font-medium">{subtitle}</p>
</article>
