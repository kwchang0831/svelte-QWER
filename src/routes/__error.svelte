<script lang="ts" context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export function load({ error, status }) {
    return {
      props: {
        status: `${status}`,
        error: `${error?.message}`,
      },
    };
  }
</script>

<script lang="ts">
  export let status: string;
  export let error: string;
</script>

<main>
  <article
    itemscope
    itemtype="https://schema.org/BlogPosting"
    class="pt-[8rem] relative flex flex-col items-center gap-4 justify-center">
    <h1 class="text-4xl">{status}</h1>
    <p>{error}</p>
    <a href="/" class="btn btn-ghost underline" target="_self">Back Home</a>
  </article>
</main>
