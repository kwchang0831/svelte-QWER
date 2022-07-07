<script lang="ts">
  import IndexProfile from '$lib/index_profile.svelte';
  import IndexPosts from '$lib/index_posts.svelte';
  import Footer from '$lib/footer.svelte';
  import Tags from '$lib/tags_root.svelte';
</script>

<div class="relative flex flex-col xl:(flex-row gap-8) justify-center">
  <div>
    <IndexProfile class="sticky top-20 flex flex-col items-center py-4 xl:(items-right text-right)" />
  </div>
  <IndexPosts />
  <Tags class="hidden xl:display-block w-72" />
</div>
