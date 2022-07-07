<script lang="ts">
  import Post from '$lib/post.svelte';
  import PostHeading from '$lib/post_heading.svelte';
  import PostToc from '$lib/toc.svelte';

  import Giscus from '@giscus/svelte';
  import { commentConfig } from '$config/site';

  import type { TOC } from '$types/toc';

  let tocData: TOC.Content[] = [
    {
      heading: '開頭',
      slug: '#kai1-tou2',
    },
    {
      heading: '環境配置',
      slug: '#huan2-jing4',
    },
    {
      heading: '開始操作',
      slug: '#que4-ren4-kong1-jian1',
      child: [
        {
          heading: '開始更新',
          slug: '#kai1-shi3-geng4-xin1',
        },
        {
          heading: '檢查升級',
          slug: '#jian3-cha2-sheng1-ji2',
        },
        {
          heading: '清除垃圾',
          slug: '#qing1-chu2-la1-ji1',
        },
      ],
    },
    {
      heading: '最後',
      slug: '#zui4-hou4',
    },
    {
      heading: '完結',
      slug: '#wan2-jie2',
    },
  ];
</script>

<Post>
  <PostHeading slot="post_heading" />
  <article slot="post_content">
    <h2 id="kai1-tou2"><a href="#kai1-tou2">開頭</a></h2>
    <p>這篇文章主要是紀錄一下從 Ubuntu 20.04 升級到 22.04 (Jammy Jellyfish) 的過程。</p>
    <p>家裡還有很多台需要升級一下。</p>
    <blockquote>
      <p>! 升級前記得要備份重要文件。</p>
    </blockquote>
    <div class="code-block titled showLineNumber">
      <h2 class="code-title">test.js</h2>
      <pre><code class="language-js"><div class="code-line"><div class="code-linenotation"><span
                class="line-number">1</span><span class="line-diff" /></div><div class="code-content"><span
                class="token keyword">function</span> <span class="token function">fancyAlert</span><span
                class="token punctuation">&lpar</span><span class="token parameter">arg</span><span
                class="token punctuation">&rpar</span> <span class="token punctuation">&lcub</span></div></div><div
            class="code-line line-highlight"><div class="code-linenotation"><span class="line-number">2</span><span
                class="line-diff" /></div><div class="code-content">  <span class="token keyword">if</span> <span
                class="token punctuation">&lpar</span>arg<span class="token punctuation">&rpar</span> <span
                class="token punctuation">&lcub</span></div></div><div class="code-line line-highlight"><div
              class="code-linenotation"><span class="line-number">3</span><span class="line-diff" /></div><div
              class="code-content">    $<span class="token punctuation">.</span><span
                class="token function">facebox</span><span class="token punctuation">&lpar</span><span
                class="token punctuation">&lcub</span> <span class="token literal-property property">div</span><span
                class="token operator">:</span> <span class="token string">'#foo'</span> <span
                class="token punctuation">&rcub</span><span class="token punctuation">&rpar</span></div></div><div
            class="code-line line-highlight"><div class="code-linenotation"><span class="line-number">4</span><span
                class="line-diff" /></div><div class="code-content">  <span
                class="token punctuation">&rcub</span></div></div><div class="code-line"><div
              class="code-linenotation"><span class="line-number">5</span><span class="line-diff" /></div><div
              class="code-content"><span class="token punctuation">&rcub</span></div></div><div class="code-line"><div
              class="code-linenotation"><span class="line-number">6</span><span class="line-diff" /></div><div
              class="code-content" /></div><div class="code-line line-addition"><div class="code-linenotation"><span
                class="line-number">7</span><span class="line-diff">+</span></div><div class="code-content">console<span
                class="token punctuation">.</span><span class="token function">log</span><span
                class="token punctuation">&lpar</span><span class="token string">'added'</span><span
                class="token punctuation">&rpar</span></div></div><div class="code-line line-subtraction"><div
              class="code-linenotation"><span class="line-number">8</span><span class="line-diff">-</span></div><div
              class="code-content">console<span class="token punctuation">.</span><span
                class="token function">log</span><span class="token punctuation">&lpar</span><span
                class="token string">'removed'</span><span
                class="token punctuation">&rpar</span></div></div></code></pre>
    </div>
    <h2 id="huan2-jing4"><a href="#huan2-jing4">環境</a></h2>
    <p>本文所使用的系統環境。</p>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token operator">></span> lsb_release -a</div></div><div class="code-line"><div
              class="code-linenotation"><span class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content" /></div><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content">No LSB modules are available.</div></div><div class="code-line"><div
              class="code-linenotation"><span class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content">Distributor ID: Ubuntu</div></div><div class="code-line line-highlight"><div
              class="code-linenotation"><span class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content">Description:    Ubuntu <span class="token number">20.04</span>.4 LTS</div></div><div
            class="code-line"><div class="code-linenotation"><span class="no-line-number" /><span
                class="no-line-diff" /></div><div class="code-content">Release:        <span
                class="token number">20.04</span></div></div><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content">Codename:       focal</div></div></code></pre>
    </div>
    <h2 id="que4-ren4-kong1-jian1"><a href="#que4-ren4-kong1-jian1">確認空間</a></h2>
    <p>最好確認一下有足夠空間可供升級使用，最好能有 25GB 以上。</p>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token function">df</span> -H</div></div></code></pre>
    </div>
    <h2 id="kai1-shi3-geng4-xin1"><a href="#kai1-shi3-geng4-xin1">開始更新</a></h2>
    <p>先把套件都更新與升級。</p>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token function">sudo</span> <span class="token function">apt</span> update -y <span
                class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span
                class="token function">apt</span> upgrade -y</div></div></code></pre>
    </div>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token function">sudo</span> <span
                class="token function">apt</span> dist-upgrade</div></div></code></pre>
    </div>
    <p>清除已經不需要的套件安裝檔案</p>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token function">sudo</span> <span
                class="token function">apt</span> autoremove</div></div></code></pre>
    </div>
    <p>
      確保有安裝 <code class="inline-code-block">updrate-manager-core</code>
      套件
    </p>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token function">sudo</span> <span class="token function">apt</span> <span
                class="token function">install</span> update-manager-core</div></div></code></pre>
    </div>
    <p>重開機</p>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token function">sudo</span> <span class="token function">reboot</span></div></div></code></pre>
    </div>
    <p>確認一下是否有升級。目前暫時還沒有 22.04 LTS。</p>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token operator">></span> <span
                class="token function">sudo</span> do-release-upgrade --check-dist-upgrade-only</div></div><div
            class="code-line"><div class="code-linenotation"><span class="no-line-number" /><span
                class="no-line-diff" /></div><div class="code-content" /></div><div class="code-line"><div
              class="code-linenotation"><span class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content">Checking <span class="token keyword">for</span> a new Ubuntu release</div></div><div
            class="code-line"><div class="code-linenotation"><span class="no-line-number" /><span
                class="no-line-diff" /></div><div
              class="code-content">There is no development version of an LTS available.</div></div><div
            class="code-line"><div class="code-linenotation"><span class="no-line-number" /><span
                class="no-line-diff" /></div><div
              class="code-content">To upgrade to the latest non-LTS development release</div></div><div
            class="code-line"><div class="code-linenotation"><span class="no-line-number" /><span
                class="no-line-diff" /></div><div class="code-content"><span
                class="token builtin class-name">set</span> <span class="token assign-left variable">Prompt</span><span
                class="token operator">=</span>normal <span
                class="token keyword">in</span> /etc/update-manager/release-upgrades.</div></div></code></pre>
    </div>
    <p>
      使用 <code class="inline-code-block">-d</code>
      參數，繼續升級至最新開發版，即使 LTS 版本還沒出來。
    </p>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token function">sudo</span> do-release-upgrade -d --allow-third-party</div></div></code></pre>
    </div>
    <p>若是有提示會為 SSH 新開一個 Port 於 &#39;1022&#39;， 以免升級中途出了甚麼意外比較難處理。</p>
    <p>輸入 y 繼續。然後按下 [Enter] 繼續。</p>
    <p>詢問是否開始升級，輸入 y 確認升級。</p>
    <p><img src="https://kwchang0831.dev/dev-env/ubuntu/upgrade-from-20.04-to-22.04/fig01.avif" alt="fig01.avif" /></p>
    <p>選擇 [Yes] 不用再先詢問，全部都可以直接重啟服務，繼續。</p>
    <p><img src="https://kwchang0831.dev/dev-env/ubuntu/upgrade-from-20.04-to-22.04/fig02.avif" alt="fig02.avif" /></p>
    <p>接下來，升級會需要一段時間...</p>
    <p>中間若有詢問其他問題，依個人需要決定 yes | no 。</p>
    <p>最後會詢問是否重開機，選擇 &#39;y&#39; 重開機。</p>
    <p><img src="https://kwchang0831.dev/dev-env/ubuntu/upgrade-from-20.04-to-22.04/fig03.avif" alt="fig03.avif" /></p>
    <h2 id="jian3-cha2-sheng1-ji2"><a href="#jian3-cha2-sheng1-ji2">檢查升級</a></h2>
    <p>
      確認一下版本已經是 <code class="inline-code-block">22.04</code>
      。
    </p>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token operator">></span> lsb_release -a</div></div><div class="code-line"><div
              class="code-linenotation"><span class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content" /></div><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content">No LSB modules are available.</div></div><div class="code-line"><div
              class="code-linenotation"><span class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content">Distributor ID: Ubuntu</div></div><div class="code-line"><div
              class="code-linenotation"><span class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content">Description:    Ubuntu <span class="token number">22.04</span> LTS</div></div><div
            class="code-line"><div class="code-linenotation"><span class="no-line-number" /><span
                class="no-line-diff" /></div><div class="code-content">Release:        <span
                class="token number">22.04</span></div></div><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div
              class="code-content">Codename:       jammy</div></div></code></pre>
    </div>
    <p>確認一下套件更新</p>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token function">sudo</span> <span class="token function">apt</span> update -y <span
                class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span
                class="token function">apt</span> upgrade -y</div></div></code></pre>
    </div>
    <h2 id="qing1-chu2-la1-ji1"><a href="#qing1-chu2-la1-ji1">清除垃圾</a></h2>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token function">sudo</span> <span
                class="token function">apt</span> --purge autoremove</div></div></code></pre>
    </div>
    <div class="code-block  ">
      <pre><code class="language-shell"><div class="code-line"><div class="code-linenotation"><span
                class="no-line-number" /><span class="no-line-diff" /></div><div class="code-content"><span
                class="token function">sudo</span> <span
                class="token function">apt</span> autoclean</div></div></code></pre>
    </div>
    <h2 id="zui4-hou4"><a href="#zui4-hou4">最後</a></h2>
    <p>這樣就完成升級了。</p>
    <h2 id="wan2-jie2"><a href="#wan2-jie2">完結</a></h2>
  </article>
  <PostToc slot="post_toc" toc={tocData} />
</Post>
