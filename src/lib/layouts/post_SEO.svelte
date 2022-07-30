<script lang="ts">
  import type { Post } from '$lib/types/post';
  import { siteConfig } from '$config/site';
  export let post: Post.Post;
</script>

<svelte:head>
  <title>{post.title} | {siteConfig.title}</title>
  <meta name="description" content={post.description} />
  <link rel="canonical" href={new URL(post.slug, siteConfig.url).href} />
</svelte:head>
