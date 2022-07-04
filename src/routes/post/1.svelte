<!-- <div class="container m-auto bg-yellow">
  <section class="grid grid-cols-[1fr_18rem] bg-green">

    123
  </section>
</div> -->
<div class="flex flex-col justify-center items-center">
  <div class="max-w-screen-xl w-full md:px8">
    <section class="flex flex-col gap-4 rounded-xl px4 py2 md:(mb2 rounded-none bg-transparent dark:bg-transparent)">
      <div class="my2 flex-none">
        <img
          class="w-full max-h-[24rem] xl:rounded-lg object-cover"
          src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="" />
      </div>
      <h1 class="text-4xl font-bold">升級 Ubuntu 從 20.04 至 22.04 (Jammy Jellyfish)</h1>
      <p class="text-sm">📆 07/01/2022 🖊️ kwchang0831</p>
      <hr class="border-black dark:border-white" />
    </section>
  </div>
</div>

<div class="relative flex flex-nowrap justify-center">
  <div class="max-w-screen-md flex-1 " />

  <div class="flex-none max-w-[50rem] w-full article">


    <h2 id="kai1-tou2"><a href="#kai1-tou2">開頭</a></h2>
    <p>這篇文章主要是紀錄一下從 Ubuntu 20.04 升級到 22.04 (Jammy Jellyfish) 的過程。</p>
    <p>家裡還有很多台需要升級一下。</p>
    <blockquote>
    <p>! 升級前記得要備份重要文件。</p>
    </blockquote>
    <div class="code-block"><h6 class="code-title">test.js</h6><pre><code class="language-js"><div class="code-line"><span class="line-number">1</span><span class="line-diff"> </span><span class="token keyword">function</span> <span class="token function">fancyAlert</span><span class="token punctuation">&lpar</span><span class="token parameter">arg</span><span class="token punctuation">&rpar</span> <span class="token punctuation">&lcub</span></div><div class="code-line code-highlight"><span class="line-number">2</span><span class="line-diff"> </span>  <span class="token keyword">if</span> <span class="token punctuation">&lpar</span>arg<span class="token punctuation">&rpar</span> <span class="token punctuation">&lcub</span></div><div class="code-line code-highlight"><span class="line-number">3</span><span class="line-diff"> </span>    $<span class="token punctuation">.</span><span class="token function">facebox</span><span class="token punctuation">&lpar</span><span class="token punctuation">&lcub</span> <span class="token literal-property property">div</span><span class="token operator">:</span> <span class="token string">'#foo'</span> <span class="token punctuation">&rcub</span><span class="token punctuation">&rpar</span></div><div class="code-line code-highlight"><span class="line-number">4</span><span class="line-diff"> </span>  <span class="token punctuation">&rcub</span></div><div class="code-line"><span class="line-number">5</span><span class="line-diff"> </span><span class="token punctuation">&rcub</span></div><div class="code-line"><span class="line-number">6</span><span class="line-diff"> </span></div><div class="code-line code-addition"><span class="line-number">7</span><span class="line-diff">+</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">&lpar</span><span class="token string">'added'</span><span class="token punctuation">&rpar</span></div><div class="code-line code-subtraction"><span class="line-number">8</span><span class="line-diff">-</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">&lpar</span><span class="token string">'removed'</span><span class="token punctuation">&rpar</span></div></code></pre></div>
    <h2 id="huan2-jing4"><a href="#huan2-jing4">環境</a></h2>
    <p>本文所使用的系統環境。</p>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token operator">></span> lsb_release -a</div><div class="code-line"><span class="no-line-number"></span>  </div><div class="code-line"><span class="no-line-number"></span>No LSB modules are available.</div><div class="code-line"><span class="no-line-number"></span>Distributor ID: Ubuntu</div><div class="code-line"><span class="no-line-number"></span>Description:    Ubuntu <span class="token number">20.04</span>.4 LTS</div><div class="code-line"><span class="no-line-number"></span>Release:        <span class="token number">20.04</span></div><div class="code-line"><span class="no-line-number"></span>Codename:       focal</div></code></pre></div>
    <h2 id="que4-ren4-kong1-jian1"><a href="#que4-ren4-kong1-jian1">確認空間</a></h2>
    <p>最好確認一下有足夠空間可供升級使用，最好能有 25GB 以上。</p>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token function">df</span> -H</div></code></pre></div>
    <h2 id="kai1-shi3-geng4-xin1"><a href="#kai1-shi3-geng4-xin1">開始更新</a></h2>
    <p>先把套件都更新與升級。</p>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token function">sudo</span> <span class="token function">apt</span> update -y <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">apt</span> upgrade -y</div></code></pre></div>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token function">sudo</span> <span class="token function">apt</span> dist-upgrade</div></code></pre></div>
    <p>清除已經不需要的套件安裝檔案</p>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token function">sudo</span> <span class="token function">apt</span> autoremove</div></code></pre></div>
    <p>確保有安裝 <code class="inline-code-block">updrate-manager-core</code> 套件</p>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> update-manager-core</div></code></pre></div>
    <p>重開機</p>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token function">sudo</span> <span class="token function">reboot</span></div></code></pre></div>
    <p>確認一下是否有升級。目前暫時還沒有 22.04 LTS。</p>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token operator">></span> <span class="token function">sudo</span> do-release-upgrade --check-dist-upgrade-only</div><div class="code-line"><span class="no-line-number"></span>  </div><div class="code-line"><span class="no-line-number"></span>Checking <span class="token keyword">for</span> a new Ubuntu release</div><div class="code-line"><span class="no-line-number"></span>There is no development version of an LTS available.</div><div class="code-line"><span class="no-line-number"></span>To upgrade to the latest non-LTS development release</div><div class="code-line"><span class="no-line-number"></span><span class="token builtin class-name">set</span> <span class="token assign-left variable">Prompt</span><span class="token operator">=</span>normal <span class="token keyword">in</span> /etc/update-manager/release-upgrades.</div></code></pre></div>
    <p>使用 <code class="inline-code-block">-d</code> 參數，繼續升級至最新開發版，即使 LTS 版本還沒出來。</p>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token function">sudo</span> do-release-upgrade -d --allow-third-party</div></code></pre></div>
    <p>若是有提示會為 SSH 新開一個 Port 於 &#39;1022&#39;， 以免升級中途出了甚麼意外比較難處理。</p>
    <p>輸入 y 繼續。然後按下 [Enter] 繼續。</p>
    <p>詢問是否開始升級，輸入 y 確認升級。</p>
    <p><figure>
    <img src="upgrade-from-20.04-to-22.04/fig01.avif" alt="fig01.avif"/>
    </figure>
    </p>
    <p>選擇 [Yes] 不用再先詢問，全部都可以直接重啟服務，繼續。</p>
    <p><figure>
    <img src="upgrade-from-20.04-to-22.04/fig02.avif" alt="fig02.avif"/>
    </figure>
    </p>
    <p>接下來，升級會需要一段時間...</p>
    <p>中間若有詢問其他問題，依個人需要決定 yes | no 。</p>
    <p>最後會詢問是否重開機，選擇 &#39;y&#39; 重開機。</p>
    <p><figure>
    <img src="upgrade-from-20.04-to-22.04/fig03.avif" alt="fig03.avif"/>
    </figure>
    </p>
    <h2 id="jian3-cha2-sheng1-ji2"><a href="#jian3-cha2-sheng1-ji2">檢查升級</a></h2>
    <p>確認一下版本已經是 <code class="inline-code-block">22.04</code>。</p>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token operator">></span> lsb_release -a</div><div class="code-line"><span class="no-line-number"></span>  </div><div class="code-line"><span class="no-line-number"></span>No LSB modules are available.</div><div class="code-line"><span class="no-line-number"></span>Distributor ID: Ubuntu</div><div class="code-line"><span class="no-line-number"></span>Description:    Ubuntu <span class="token number">22.04</span> LTS</div><div class="code-line"><span class="no-line-number"></span>Release:        <span class="token number">22.04</span></div><div class="code-line"><span class="no-line-number"></span>Codename:       jammy</div></code></pre></div>
    <p>確認一下套件更新</p>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token function">sudo</span> <span class="token function">apt</span> update -y <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">apt</span> upgrade -y</div></code></pre></div>
    <h2 id="qing1-chu2-la1-ji1"><a href="#qing1-chu2-la1-ji1">清除垃圾</a></h2>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token function">sudo</span> <span class="token function">apt</span> --purge autoremove</div></code></pre></div>
    <div class="code-block"><pre><code class="language-shell"><div class="code-line"><span class="no-line-number"></span><span class="token function">sudo</span> <span class="token function">apt</span> autoclean</div></code></pre></div>
    <h2 id="zui4-hou4"><a href="#zui4-hou4">最後</a></h2>
    <p>這樣就完成升級了。</p>
    <h2 id="wan2-jie2"><a href="#wan2-jie2">完結</a></h2>
    
  </div>

  <div class="max-w-screen-md flex-1 relative">
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
  </div>
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

  .article {
    --at-apply: 'p6';
  }

  .article h2 {
    --at-apply: 'text-2xl font-bold py2';
  }

  .article p {
    --at-apply: 'py3';
  }

  .code-block {
    --at-apply: 'md:rounded-lg border-y-1 md:border-1 border-white/[0.5] shadow-2xl mx-[-1.5rem] md:mx0';
  }

  .code-line {
    --at-apply: 'hover:!bg-white border-l-black md:(last:rounded-b-lg) leading-6';
  }

  .code-block {
    --at-apply: 'relative bg-black flex flex-col';

    .code-title {
      --at-apply: 'text-md font-semibold pl4 py2 border-b-2 border-white/[0.5]';
    }

    .no-line-number {
      --at-apply: 'ml4';
    }
  }

  // .code-block .code-title {
  //   --at-apply: 'text-md font-semibold pl4 py2 border-b-2 border-white/[0.5]';
  // }

  .code-block .line-number {
    @apply px-2 display-inline-block;
    border-left-width: 4px;
    border-left-color: transparent;
    border-right-width: 1px;
    border-right-color: white;
  }


  .code-line.code-highlight {
    background-color: rgba(55, 65, 81, 0.5);
  }

  .code-line.code-highlight .line-number {
    border-left-color: rgb(59, 130, 246);
    border-left-width: 4px;
  }

  .code-line .line-diff {
    --at-apply: 'mx2 display-inline-block';
  }

  .code-line.code-addition {
    background-color: rgba(16, 185, 129, 0.2); /* Set inserted line (+) color */
  }

  .code-line.code-subtraction {
    background-color: rgba(239, 68, 68, 0.2); /* Set deleted line (-) color */
  }

  .inline-code-block {
    --at-apply: 'rounded-lg bg-gray/[0.5] mx-1 px3 py1 hover:bg-black/[0.5]';
  }
</style>
