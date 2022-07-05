<div class="sticky top-[5rem] hidden xl:block toc pb8 max-h-[calc(100vh-9rem-113px)] max-w-[20rem] overflow-auto">
  <h2 class="text-2xl font-bold py2">Table of Content</h2>
  <ul class="toc-level-1">
    <li>開頭</li>
    <li>環境配置</li>
    <li>開始操作</li>
    <ul class="toc-level-2">
      <li class="before:(content-[--] pr2)">開始更新</li>
      <li>檢查升級</li>
      <li>清除垃圾</li>
    </ul>
    <li>最後</li>
    <li>完結</li>
  </ul>
</div>

<style lang="scss">
  .toc {
    --at-apply: 'px6';
  }
  .toc h2 {
    --at-apply: 'pb4';
  }

  .toc-level-1 > li::before {
    --at-apply: 'content-[-] pr2';
  }

  .toc-level-2 > li::before {
    --at-apply: 'content-[--] pr2';
  }

  .toc ul li {
    --at-apply: 'font-semibold text-black/[0.5] hover:text-black dark:(text-white/[0.5] hover:text-white)';
  }

  .toc ul {
    --at-apply: 'flex flex-col gap-2';
  }

  .toc > ul > ul {
    --at-apply: 'ml2';
  }
</style>