<script lang="ts">
  import { page } from '$app/stores';
</script>

<main>
  <article
    itemscope
    itemtype="https://schema.org/BlogPosting"
    class="pt-[8rem] relative flex flex-col items-center gap-4 justify-center">
    <h1 class="text-4xl">{$page.status}</h1>
    <p>{$page.error.message}</p>
    <a href="/" class="btn btn-ghost underline" target="_self">Back Home</a>
  </article>
</main>
