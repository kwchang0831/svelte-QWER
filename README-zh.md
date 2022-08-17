<h1 align="center"> Svelte-QWER </h1>
<p align="center">
<a href="README.md"><img src="https://img.shields.io/badge/README-ENGLISH-lightgreen" alt="Readme"></a>
<img src="https://img.shields.io/github/languages/top/kwchang0831/svelte-QWER?color=%23ff3e00" alt="Language" />
<a href="https://github.com/kwchang0831/svelte-QWER/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/kwchang0831/svelte-QWER" alt="License"></a>
<a href="https://svelte-qwer.vercel.app/"><img src="https://img.shields.io/badge/🚀 示範網站-Vercel-informational" alt="Readme"></a>
<a href="https://github.com/kwchang0831/svelte-QWER/discussions"><img src="https://img.shields.io/badge/💬 討論版-F&Q-informational" alt="F&Q"></a>
</p>
</p>

## 🎉 馬上嘗試看看

```bash
npx degit kwchang0831/svelte-QWER my-blog
```

## ⚡️ 用法

1. 安裝所有依賴套件

    ```bash
    pnpm i
    ```

1. 啟動本地端測試伺服器

    ```bash
    pnpm dev
    ```

1. 在上傳到Github前，記得先清理與自動校正格式

    ```bash
    pnpm clean && pnpm format
    ```

## 🚀 部署至 Vercel

1. 安裝 Vercel CLI

    ```bash
    pnpm i -g vercel
    ```

1. 登入 Vercel 帳號

    ```bash
    vercel login
    ```

### 遠端建置與部署

```bash
vercel --prod
```

### 本地端建置後部署

```bash
vercel build --prod
vercel deploy --prebuilt --prod
```
