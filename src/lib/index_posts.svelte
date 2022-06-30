<script lang="ts">
  import IndexPost from '$lib/index_post.svelte';

  let className: any = undefined;
  export { className as class };

  let data = [
    {
      title: '第6天寫部落格',
      summary: '今天想吃魚排',
      published: '05/25/2022',
      cover:
        'https://images.unsplash.com/photo-1624564335188-63be139989a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      cover_style: 't',
    },
    {
      title: '第5天寫部落格',
      summary: '今天想吃豬排',
      published: '05/24/2022',
      cover:
        'https://images.unsplash.com/photo-1624160719183-b3b9010a77c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      cover_style: 't',
    },
    {
      title: '第4天寫部落格',
      summary: '今天想吃牛排',
      published: '05/23/2022',
      cover:
        'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      cover_style: 't',
    },
    {
      title: '第3天寫部落格',
      summary: '今天想吃雞排',
      published: '05/22/2022',
      cover:
        'https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
      cover_style: 't',
    },
    {
      title: '第2天寫部落格',
      summary: '今天的天氣不錯',
      published: '05/21/2022',
      cover: null,
      cover_style: null,
    },
    {
      title: '第1天寫部落格',
      summary: '該如何寫好呢?',
      published: '05/20/2022',
      cover: null,
      cover_style: null,
    },
  ];
</script>

<div id="index-posts" class="flex flex-col items-center mt-4 gap-4 {className}">
  {#each data as d}
    <IndexPost {...d} />
  {/each}
</div>

<style>
</style>
