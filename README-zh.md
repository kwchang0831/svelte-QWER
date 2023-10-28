<p align="right"><a href="https://github.com/kwchang0831/svelte-QWER/blob/main/README.md">English</a> | <strong>中文</strong></p>

<p align="center">
<a href="https://svelte-qwer.vercel.app/"><img src=https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/avatar.png width=96 hieght=96 style="border-radius: 9999px; object-fit: cover;" /></a>
</p>

<h1 align="center">QWER</h1>

<p align="center">
使用 <b>SvelteKit</b> 與 <b>愛 ❤</b> 精心打造的<b>部落格生成器</b>
</p>

<p align="center"><img src="https://img.shields.io/github/languages/top/kwchang0831/svelte-QWER?color=%23ff3e00&logo=Svelte" alt="Language" />
<a href="https://github.com/kwchang0831/svelte-QWER/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/kwchang0831/svelte-QWER" alt="License"></a><a href="https://github.com/kwchang0831/svelte-QWER/blob/main/CHANGELOG.md"><img src="https://img.shields.io/badge/更新日誌-svelte--QWER-lightgreen?logo=Keep a Changelog" alt="svelte-QWER"></a>
<a href="https://github.com/kwchang0831/svelte-QWER/blob/main/QWER/CHANGELOG.md"><img src="https://img.shields.io/badge/更新日誌-QWER-lightgreen?logo=Keep a Changelog" alt="QWER"></a></p>

<p align="center">
<a href="https://svelte-qwer.vercel.app"><img src="https://img.shields.io/badge/🚀 示範網站-Vercel-informational?style=for-the-badge" alt="QWER Vercel DEMO"></a>
<a href="https://svelte-qwer.netlify.app"><img src="https://img.shields.io/badge/🚀 示範網站-Netlify-informational?style=for-the-badge" alt="QWER Netlify DEMO"></a>
</p>

<p align="center">
<a href="https://github.com/kwchang0831/svelte-QWER/discussions/categories/q-a"><img src="https://img.shields.io/badge/💬 討論版-Q&A-informational?style=for-the-badge" alt="QWER Q&A"></a>
<a href="https://docs-svelte-qwer.vercel.app/"><img src="https://img.shields.io/badge/📝 使用教學-DOCS-informational?style=for-the-badge" alt="QWER DOCS"></a>
</p>

<p align="center"><a href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fsvelte-qwer.vercel.app%2F&form_factor=desktop"><img style="float:middle" width="auto" alt="PAGESPEED" src="https://raw.githubusercontent.com/gist/kwchang0831/acd18fa5e12de9be28a34617beffe5de/raw/metrics.pagespeed.svg"></a></p>

## 🎉 馬上嘗試看看 [QWER](https://github.com/kwchang0831/svelte-QWER/)

```bash
npx degit kwchang0831/svelte-QWER my-blog
```

<p align="center"><a href="https://svelte-qwer.vercel.app"><img src="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/preview.webp" alt="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/preview.webp" /></a></p>
<br/>
<p align="center"><a href="https://svelte-qwer.vercel.app"><img src="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/mobile-preview.webp" alt="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/mobile-preview.webp" /></a></p>

## ⚡️ 用法

1. 安裝 [npm v18.x](https://nodejs.org/en/blog/release/v18.17.0)

1. 安裝 [pnpm](https://github.com/pnpm/pnpm)。

   ```bash
   npm i -g pnpm
   ```

1. 安裝所有依賴套件。

   ```bash
   pnpm i
   ```

1. 啟動本地端測試伺服器。

   ```bash
   pnpm dev
   ```

1. 創建文章資料夾（如果您是 Windows 用戶，請確保使用一個支援 Bash 腳本的終端機，例如 Git Bash）。

   ```bash
   pnpm run createblog YOURDIRNAME
   ```

## ✨ 功能

- ⚡ 超快的網站速度。接近完美的 [PageSpeed](https://pagespeed.web.dev/) 跑分。

- 🤗 SEO 友善，支援 meta, [Open Graph](https://ogp.me/), [Schema](https://schema.org/), [JSON-LD](https://json-ld.org/), [microformats2](https://indieweb.org/microformats2)。

- 🔎 站內搜尋功能。

- 📱 手機優先 / 響應式的設計。

- ✍️ 使用 [Markdwon 語法](https://www.markdownguide.org/basic-syntax/)撰寫文章。

- 🧮 🧪 使用 [TeX 語法](https://www.math.brown.edu/johsilve/ReferenceCards/TeXRefCard.v1.5.pdf) 撰寫 數學表達式 與 化學表達式 透過 [Katex](https://katex.org/) 與 [mhchem](https://mhchem.github.io/MathJax-mhchem/)。

- 📁 使用資料夾式的整理方式來新增部落格頁面。

- 🏷️ 多標籤過濾文章。

- 📄 自動生成文章目錄。

- 📦 開箱即用的 [Atom feed](https://validator.w3.org/feed/docs/atom.html), Sitemap, [PWA](https://web.dev/progressive-web-apps/), [JSON Feed](https://www.jsonfeed.org/)。

- 🖼️ 自動照片優化支援，透過 [vite-imagetools](https://github.com/JonasKruckenberg/imagetools)。

- ⚙️ 支援嵌入 Svelte 組件 與 使用 Javascript 搭配 [Markdwon 語法](https://www.markdownguide.org/basic-syntax/)。

- 💬 支援 [Giscus](https://github.com/giscus/giscus) - 免費留言系統架設於 Github 討論版上。

- 💄 使用 [UnoCSS](https://github.com/unocss/unocss) - 原子化的 CSS 引擎。

- 🌐 多國語系 i18n 透過 [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n)。

- 🚀 免費架設部落格於 [Vercel](https://vercel.com/), 或 [Netlify](https://Netlify.com/), 或 [Cloudflare Pages](https://pages.cloudflare.com/) 上。

## 📚 了解更多

請參考我們的 [教學文件](https://docs-svelte-qwer.vercel.app/)。

## 👷 目前狀態

[QWER](https://github.com/kwchang0831/svelte-QWER) 現在處於很早期的階段，所以經常會有破壞性的改動，請多包涵。

未來如果有更新，通常你只需要複製你的 `user` 資料夾覆蓋最新的 release。

請別忘了查看 CHANGELOG，看看你是否需要對 `user/config` 或其他地方進行更新與調整。

## ❓ 有任何使用上的問題

歡迎使用我們的 [Github's Q&A 討論版](https://github.com/kwchang0831/svelte-QWER/discussions/categories/q-a)。

## 😊 您正在使用 QWER ?

拜託您，請考慮添加 `svelte-qwer` 至您 Git Repo 的 Topics 底下。

想知道還有誰正在使用 QWER，請參考 [Github-Topics: svelte-qwer](https://github.com/topics/svelte-qwer)。

## 🎉 支持

<div class="flex" style="display:inline-block; font-size: 24px; --un-bg-opacity: 1; background-color: rgba(255, 221, 0); border-radius: 0.5rem; padding: 12px 18px; border: 2px solid;">
<a class="flex"  href="https://www.buymeacoffee.com/kwchang0831" style="color: black;" >
<span>🥓</span>
<span>請我吃香脆培根</span>
</a>
</div>

## 📝 授權條款

[MIT](https://github.com/kwchang0831/svelte-QWER/blob/main/LICENSE)

## 🙏 特別感謝

- 封面圖片來自 <a href="https://unsplash.com/@jessbaileydesigns?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jess Bailey</a> 從 <a href="https://unsplash.com/s/photos/note?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

- 使用者圖像來自 <a href="https://icons8.com/illustrations/author/GrbQqWBEhaDS">Liam Moore</a> 從 <a href="https://icons8.com/illustrations">Ouch!</a>
