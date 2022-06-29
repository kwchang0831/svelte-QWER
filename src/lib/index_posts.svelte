<script lang="ts">
  import IndexPost from '$lib/index_post.svelte';

  let className: any = undefined;
  export { className as class };
</script>

<div id="index-posts" class="flex flex-col items-center md:(gap-4) {className}">
  <IndexPost title="第6天寫部落格" published_date="05 / 24 / 2022" subtitle="今天想吃魚排" />
  <IndexPost title="第5天寫部落格" published_date="05 / 24 / 2022" subtitle="今天想吃豬排" />
  <IndexPost title="第4天寫部落格" published_date="05 / 23 / 2022" subtitle="今天想吃牛排" />
  <IndexPost title="第3天寫部落格" published_date="05 / 22 / 2022" subtitle="今天想吃雞排" />
  <IndexPost title="第2天寫部落格" published_date="05 / 21 / 2022" subtitle="今天的天氣不錯" />
  <IndexPost title="第1次嘗試寫部落格" published_date="05 / 20 / 2022" subtitle="該如何寫好呢?" />
</div>

<style>
</style>
