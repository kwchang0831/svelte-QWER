<h1 align="center"> Svelte-QWER </h1>
<p align="center">
<a href="README-zh.md"><img src="https://img.shields.io/badge/README-%E4%B8%AD%E6%96%87-lightgreen" alt="Readme"></a>
<img src="https://img.shields.io/github/languages/top/kwchang0831/svelte-QWER?color=%23ff3e00" alt="Language" />
<a href="https://github.com/kwchang0831/svelte-QWER/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/kwchang0831/svelte-QWER" alt="License"></a>
<a href="https://svelte-qwer.vercel.app/"><img src="https://img.shields.io/badge/🚀 DEMO-Vercel-informational" alt="Readme"></a>
<a href="https://github.com/kwchang0831/svelte-QWER/discussions"><img src="https://img.shields.io/badge/💬 Discussions-F&Q-informational" alt="F&Q"></a>
</p>
</p>

## 🎉 Try it out

```bash
npx degit kwchang0831/svelte-QWER my-blog
```

## ⚡️ Usage

1. Install all the dependcies.

   ```bash
   pnpm i
   ```

1. Run local dev server

   ```bash
   pnpm dev
   ```

1. Clean and run auto-format before committing

   ```bash
   pnpm clean && pnpm format
   ```

## 🚀 Deploy on Vercel

1. Install vercle CLI

   ```bash
   pnpm i -g vercel
   ```

1. Login

   ```bash
   vercel login
   ```

### Remote build

```bash
vercel --prod
```

### Local build

```bash
vercel build --prod
vercel deploy --prebuilt --prod
```
