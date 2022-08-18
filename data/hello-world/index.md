---
title: Hello World 👋
description: Demonstrates basics of 🚀 QWER - an Awesome Blog Starter, Built using Svelte with ❤
summary: 🎉 Let's start a brand new awesome blog...
published: 2022-08-07
cover: ./cover.jpg
coverCaption: Photo by <a href="https://unsplash.com/@justinveenema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Justin Veenema</a> on <a href="https://unsplash.com/s/photos/motivation?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
tags:
  - Language: English
  - Tech Stack: [Svelte, SvelteKit]
  - [QWER]
---

## ✨ Intro

[QWER](https://www.github.com/kwchang0831/svelte-QWER) is simply an Awesoem blog starter / static site generator. Built using [Svelte](https://svelte.dev/) with ❤.

## 🎉 Try out QWER

Create a QWER blog named `my-blog`.

```sh
npx degit kwchang0831/svelte-QWER my-blog
```

## ⚡️ To Dev

1. Install all the dependencies.

   ```shell
   pnpm i
   ```

1. Start local dev server.

   ```shell
   pnpm dev
   ```

1. Sever is running. Open browser to see the result.

   ```shell
   VITE v3.0.8  ready in 1080 ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

## 🔧 To Build

1. Create production version of your blog.

   ```shell
   pnpm build
   ```

1. Preview the build.

   ```shell
   pnpm preview
   ```

1. Preview server is running. Open browser to see the result.

   ```shell
   ➜  Local:   http://localhost:4173/
   ➜  Network: use --host to expose
   ```

## 🚀 To Deploy

Create a [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) **free account** to deploy.

### Vercel

1. Get Vercel CLI.

   ```sh
   npm i -g vercel
   ```

1. Login your Vercel account.

   ```sh
   vercel login
   ```

1. Deploy

   It's best to clean and format codebase before deploy.

   ```sh
   pnpm clean && pnpm format
   ```

   Create Production Deployment.

   ```sh
   vercel --prod
   ```

### Netlify

🚧 WIP

## 👍 End
