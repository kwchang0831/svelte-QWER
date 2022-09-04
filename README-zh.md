<br/>
<div align="center">
<a href="https://svelte-qwer.vercel.app/"><img src="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/qwer.webp" alt="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/qwer.webp" /></a>
</div>
<br/>
<h1 align="center">QWER</h1>
<p align="center">
✒︎ 使用 SvelteKit 與 ❤ 打造的部落格生成器，簡單好用。
</p>
<p align="center">
<a href="README.md"><img src="https://img.shields.io/badge/README-%E4%B8%AD%E6%96%87-lightgreen?style=for-the-badge&logo=Read the Docs" alt="Readme"></a>
<img src="https://img.shields.io/github/languages/top/kwchang0831/svelte-QWER?color=%23ff3e00&style=for-the-badge&logo=Svelte" alt="Language" />
<a href="https://github.com/kwchang0831/svelte-QWER/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/kwchang0831/svelte-QWER?style=for-the-badge" alt="License"></a>
<a href="https://svelte-qwer.vercel.app/"><img src="https://img.shields.io/badge/🚀 示範網站-Vercel-informational?style=for-the-badge" alt="Readme"></a>
<a href="https://github.com/kwchang0831/svelte-QWER/discussions/categories/q-a"><img src="https://img.shields.io/badge/❓ 問題討論-Q&A-informational?style=for-the-badge" alt="Q&A"></a>
</p>

<p align="center">
<a href="https://github.com/kwchang0831/svelte-QWER/blob/main/CHANGELOG.md"><img src="https://img.shields.io/badge/更新日誌-Svelt--QWER-lightgreen?style=for-the-badge&logo=Keep a Changelog" alt="svelte-QWER"></a>
<a href="https://github.com/kwchang0831/svelte-QWER/blob/main/QWER/CHANGELOG.md"><img src="https://img.shields.io/badge/更新日誌-QWER-lightgreen?style=for-the-badge&logo=Keep a Changelog" alt="QWER"></a>
</p>

<br/>

<p align="center">
<a href="https://raw.githubusercontent.com/gist/kwchang0831/acd18fa5e12de9be28a34617beffe5de/raw/metrics.pagespeed.svg"><img style="float:middle" width="auto" alt="PAGESPEED" src="https://raw.githubusercontent.com/gist/kwchang0831/acd18fa5e12de9be28a34617beffe5de/raw/metrics.pagespeed.svg"></a>
</p>

## 🎉 馬上嘗試看看 QWER

```bash
npx degit kwchang0831/svelte-QWER my-blog
```

<p align="center"><a href="https://svelte-qwer.vercel.app/"><img src="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/preview.png" alt="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/preview.png" /></a></p>
<br/>
<p align="center"><a href="https://svelte-qwer.vercel.app/"><img src="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/mobile-preview.png" alt="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/user/assets/mobile-preview.png" /></a></p>

## ⚡️ 用法

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

1. 清除自動生成的檔案。 (記得不要提交這些檔案至 Git Repo 上)

   ```bash
   pnpm clean
   ```

## 🚀 部署至 Vercel

1. 安裝 Vercel CLI。

   ```bash
   npm i -g vercel
   ```

1. 登入 Vercel 帳號。

   ```bash
   vercel login
   ```

1. 部署。

   ```bash
   vercel --prod
   ```

## ✨ Features

- 使用 [Markdwon 語法](https://www.markdownguide.org/basic-syntax/)撰寫文章。

- 超快的網站速度。接近完美的 [PageSpeed](https://pagespeed.web.dev/) 跑分。

- 手機優先 / 響應式的設計。

- SEO 友善，支援 meta, [Open Graph](https://ogp.me/), [Schema](https://schema.org/), [JSON-LD](https://json-ld.org/), [microformats2](https://indieweb.org/microformats2)。

- 使用資料夾式的整理方式來新增部落格頁面。

- 網誌可設定標籤，還有標籤過濾功能。

- 網誌會自動生成文章目錄。

- 開箱即用的 [Atom feed](https://validator.w3.org/feed/docs/atom.html), Sitemap, [PWA](https://web.dev/progressive-web-apps/)。

- 支援嵌入 Svelte 組件 與 使用 Javascript 搭配 [Markdwon 語法](https://www.markdownguide.org/basic-syntax/)。

- 自動照片優化支援，透過 [vite-imagetools](https://github.com/JonasKruckenberg/imagetools)。

- 支援 [Giscus](https://github.com/giscus/giscus) - a comments system powerd by Github Discussions。

- 使用 [UnoCSS](https://github.com/unocss/unocss) - the instant on-demand atomic CSS engine。

- 多國語系 i18n 透過 [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n)。

## 📚 了解更多

請參考教學 [Intro to QWER](https://svelte-qwer.vercel.app/intro) 和 [About QWER](https://svelte-qwer.vercel.app/about)。

## 👷 目前狀態

[QWER](https://github.com/kwchang0831/svelte-QWER) 現在處於很早期的階段，所以會有經常可能會有破壞性的改動，請多包涵。

未來如果有更新，而且您也想應用更新，通常你只需要複製你的 `user` 資料夾覆蓋最新的 release。

請別忘了查看 CHANGELOG，看看你是否需要對 `user/config` 進行更新與調整。

## ❓ 有任何使用上的問題

歡迎使用我們的 [Github's Q&A 討論版](https://github.com/kwchang0831/svelte-QWER/discussions/categories/q-a)。

## 😊 您正在使用 QWER ?

拜託您，請考慮添加 `svelte-qwer` 至您 Git Repo 的 Topics 底下。

想知道還有誰正在使用 QWER，請參考 [Github-Topics: svelte-qwer](https://github.com/topics/svelte-qwer)。

## 🎉 支持

<a href="https://www.producthunt.com/posts/qwer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-qwer" target="_blank" rel="noreferrer noopener"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=356641&theme=light" alt="QWER - ✒︎&#0032;Simply&#0032;Awesome&#0032;Blog&#0032;Starter&#0032;built&#0032;with&#0032;Svelte&#0032;and&#0032;❤ | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

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
