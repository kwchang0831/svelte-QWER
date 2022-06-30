<script lang="ts">
  import IndexProfile from '$lib/index_profile.svelte';
  import IndexPosts from '$lib/index_posts.svelte';
  import Footer from '$lib/footer.svelte';
</script>

<div class="pt-[4rem] relative flex flex-col xl:(flex-row gap-8) justify-center">
  <div class="">
    <IndexProfile class="sticky top-20 flex flex-col items-center py-4 xl:(items-right text-right)" />
  </div>
  <IndexPosts class="" />
</div>

<Footer />
