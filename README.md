<h1 align="center"> Svelte-QWER </h1>

## 🎉 Try it out

[![Deploy with Vercel](https://img.shields.io/badge/-Deploy%20with%20Vercel-1374ef?style=for-the-badge&logo=Vercel)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkwchang0831%2Fsvelte-QWER&project-name=qwer-blog&repo-name=qwer-blog)

### Local

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

1. Get vercle cli

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
