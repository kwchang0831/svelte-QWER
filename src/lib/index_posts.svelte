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
        'https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80',
      cover_style: 't',
    },
    {
      title: '第5天寫部落格',
      summary: '今天想吃豬排',
      published: '05/24/2022',
      cover:
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      cover_style: 't',
    },
    {
      title: '第4天寫部落格',
      summary: '今天想吃牛排',
      published: '05/23/2022',
      cover:
        'https://images.unsplash.com/photo-1503650923300-dd2f6a007eaf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1951&q=80',
      cover_style: 't',
    },
    {
      title: '第3天寫部落格',
      summary: '今天想吃雞排',
      published: '05/22/2022',
      cover:
        'https://images.unsplash.com/photo-1557358070-ef6ae6f84629?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1566&q=80',
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
