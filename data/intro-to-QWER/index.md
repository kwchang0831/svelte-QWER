---
title: Intro to QWER
description: Start using 🚀 QWER - Simply Awesome Blog Starter. Built using Svelte with ❤
summary: 🎉 Let's start a brand new awesome blog...
published: 2022-08-20
cover: ./cover.jpg
coverCaption: Photo by <a href="https://unsplash.com/@joannakosinska?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Joanna Kosinska</a> on <a href="https://unsplash.com/s/photos/study?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
tags:
  - Language: English
  - Year: 2022
  - [QWER]
---

<script lang="ts">
  import Folder from '$lib/custom/folder.svelte'
  let postFolder = [
    {
      name:'post',
      files: [
        {
          name: '1',
          files: [
            {name: 'index.md', icon: 'i-bxs-file-md'},
            {name: 'cover.jpg', icon: 'i-bxs-file-jpg'}
          ]
        }
      ]
    }
  ]

  let configFolder = [
    { name: 'QWER.confitg.js', icon: 'i-vscode-icons-file-type-typescript-official' },
    { name: 'site.ts', icon: 'i-bxs-file-js' }
  ]

  let assetsFolder = [
    { name: 'avatar.png', icon: 'i-bxs-file-png' },
    { name: 'default_og_card.jpg', icon: 'i-bxs-file-jpg' },
    { name: 'qwer.webp', icon: 'i-bxs-file-image' }
  ]
</script>

## ✨ Start

This post will guide you through making your first [QWER](https://github.com/kwchang0831/svelte-QWER) blog site.

## Prepare

1. Create a QWER blog named `my-blog`

   ```sh
   npx degit kwchang0831/svelte-QWER my-blog
   ```

1. Install Dependencies

   ```sh
   pnpm i
   ```

1. Start development server

   ```sh
   pnpm dev
   ```

## List of commonly used commands

| Commands         | Purpose        |
| ---------------- | -------------- |
| `pnpm i`         | Install Dependencies. |
| `pnpm dev`       | Start dev sever. Be sure to `pnpm i` first. |
| `pnpm build`     | Build the site. |
| `pnpm preview`   | Preview the bult site with local server. Be sure to `pnpm build` first. |
| `pnpm clean`     | Clean auto-generated files. Please DONOT commit auto-generated files. |
| `pnpm cleandeep` | Deep clean.<br/>Remove auto-generated files as well as `node_modules`, `.svelte-kit`, and etc... |
| `pnpm format`   | Run prettier on the source code to maintian consistent format. |

## Important Folders

You only need to work with the following folders under `my-blog`, unless you are modify QWER itself.

| Folder Name | Purpose        |
| ----------- | -------------- |
| data        | Provide your markdown file to generate blog. |
| config      | Site setting and QWER config. |
| assets      | User-provided files that will be **pre-processed**. |
| public      | User-provided files that will NOT be pre-processed, and can be directly accessed. |

Always keep backup of the above folders. For future QWER updates, just copy paste these folders to restore your contents.

## `data` Folder

### Create a page

Say if you want to creat a new page at `https://example-qwer.com/post/1`, you will create a folder strucutre like the following example.

<div class="p4 border-1 shadow-xl rounded-xl border-black dark:border-white overflow-auto">
  <Folder name="data" files={postFolder} expanded/>
</div>

### Write page meta

Page meta data describes the page. All the available meta are listed below:

| Meta         | Purpose        |
| ------------ | -------------- |
| title        | Title for the post and SEO title meta. |
| description  | Used for SEO description meta. |
| summary      | Short description of the post that will display on the post listing. |
| published    | Post published datetime. If not provided, file `birthtime` will be used. |
| updated      | Post updated datetime. If not provided, file `mtime` will be used.  |
| cover        | Path to the cover image. Relative path or URL to the external image. |
| coverCaption | Caption Text for Cover image. Plain text or HTML are both accepted. |
| coverStyle   | Cover image position for post listing.<br/>Options are: `TOP`, `RIGHT`, `BOT`, `LEFT`, `IN`, `NONE`. Default: `IN`. |
| options      | Optional. Currently only have 1 option: `unlisted` which will hide from post listing.  |
| tags         | Tags are for post filtering. Details will be described below. |

#### Tags

QWER's tags work similar to simplifed version of **Taxonomies** where you can group tags into categories.

To create a category of tags:

```yaml
tags:
  - CategoryOne: Tag1
  - CategoryTwo: [Tag1, Tag2]
```

The above will create the following 3 tags:

- tags-CategoryOne-Tag1
- tags-CategoryTwo-Tag1
- tags-CategoryTwo-Tag2

If tags are not provided with category, like the following:

```yaml
tags:
  - [Tag1, Tag2]
  - Tag3
```

The above will create the following 3 tags:

- tags-Tag1
- tags-Tag2
- tags-Tag3

#### Example meta

```yaml
---
title: Intro to QWER
description: Start using 🚀 QWER - Simply Awesome Blog Starter. Built using Svelte with ❤
summary: 🎉 Let's start a brand new awesome blog...
published: 2022-08-19
cover: ./cover.jpg
coverCaption: Photo by <a href="https://unsplash.com/@joannakosinska?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Joanna Kosinska</a> on <a href="https://unsplash.com/s/photos/study?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
options:
  - unlisted
tags:
  - Language: English
  - TechStack: [Svelte, SvelteKit]
  - [Tag1, Tag2, Tag3]
  - JustAnotherTag
---
```

### Write post content

Post content can be writen using [Markdown Syntax](https://www.markdownguide.org/cheat-sheet/) and HTML. You can also import svelte component and use it.

Check out the <a href="/example" target="_blank">Example Post</a> and it's <a href="https://raw.githubusercontent.com/kwchang0831/svelte-QWER/main/data/example/index.md" target="_blank">source code</a>.

Please note that NOT all the [Extended Syntax](https://www.markdownguide.org/extended-syntax/) for markdown are implemented or implemented the same way.

I will list some of the notable syntax.

#### Codeblock

Codeblock are fenced by \`\`\`

<pre>{`\`\`\`code-language
code content
\`\`\``}</pre>

There are options to make codeblock more informational. Those options are all optional. If you don't need, you can omit it.

Here are the example:

<pre>{`\`\`\`js
\/\/\/ title: Title
\/\/\/ lineStart: 0
\/\/\/ hlLines: 0-1, 3
\/\/\/ showLineNumber
\/\/\/ diff
line1
line2
line3
line4
+ line5
- line6
\`\`\``}</pre>

It will generate the following output:

```js
/// title: Title
/// lineStart: 0
/// hlLines: 0-1, 3
/// showLineNumber
/// diff
line1
line2
line3
line4
+ line5
- line6
```

## `config` folder

<div class="p4 border-1 shadow-xl rounded-xl border-black dark:border-white overflow-auto">
  <Folder name="config" files={configFolder} expanded/>
</div>

### QWER.config.js

**Generally, you don't need to modify this file at all.**

QWER comes with image pre-process procedure. It will take your cover image or other image assets that are referenced in the post, and generate smaller resoultions and image formats that has better compression while maintaining similar visual quality.

If you need to tune it, the following is the part where you would adjust.

```js
BannerImage: {
  width: 900,
  height: 200,
  format: ['avif', 'webp'],
},
ExtraResolutions: {
  1280: {
    width: 1280,
    format: ['avif', 'webp'],
    minWidth: '1280px',
  },
  1024: {
    width: 1024,
    format: ['avif', 'webp'],
    minWidth: '1024px',
  },
  854: {
    width: 854,
    format: ['avif', 'webp'],
    minWidth: '768px',
  },
  640: {
    width: 640,
    format: ['avif', 'webp'],
    minWidth: '360px',
  },
},
```

### site.ts

**You are required to update this site config.**

Firstly, check the `siteConfig`. Modify it where you see appropriated.

```js
export const siteConfig: Site.Config = {
  url: 'https://svelte-qwer.vercel.app/',
  title: 'QWER',
  subtitle: '🚀 QWER - Built using Svelte with ❤',
  description: '🚀 QWER - Awesome Blog Starter, Built using Svelte with ❤',
  lang: 'en',
  since: 2022,
  author: {
    name: 'John Doe',
    status: '❤️',
    avatar: Avator,
    avatar_32: Avator_32,
    avatar_128: Avator_128,
    avatar_48_png: Avator_48_PNG,
    avatar_96_png: Avator_96_PNG,
    avatar_192_png: Avator_192_PNG,
    avatar_512_png: Avator_512_PNG,
    website: 'https://github.com/kwchang0831/svelte-QWER',
    github: 'https://github.com/kwchang0831',
    email: 'contact@kwchang0831.dev',
    bio: `lorem ipsum! <br/> dolor sit amet!`,
  },
};
```

Next, check the `headConfig`.

If you are using [Umami](https://github.com/umami-software/umami) - a simple, fast, privacy-focused alternative to Google Analytics, update it with your credential accordingly.

Finally, check the `giscusConfig`. [Giscus](https://github.com/giscus/giscus) is a comments system powerd by Github Discussions. Generate your own setting: [https://giscus.app/](https://giscus.app/). For more details, please consult their github repo.

If you do NOT wish to use giscus, turn it off by change `enable` to `false`.

```js
/// hlLines: 2
export const giscusConfig: Giscus.Config = {
  enable: false,
  ...
}
```

## `assets` folder

You are requried to update those files to your style.

<div class="p4 border-1 shadow-xl rounded-xl border-black dark:border-white overflow-auto">
  <Folder name="assets" files={assetsFolder} expanded/>
</div>

Overwrite the file with your images. If the name or extension of the image is differet, please update `site.ts` to reflect it.

## `public` folder

All the files inside this folder will be copied to static folder, which will be served directly to the public.

## 🚀 Deploy

We will be using either [Vercel](https://vercel.com/) or [Netlify](https://Netlify.com) for deployment. Get your own free account today.

### Vercel

1. Update `vercel.json` accordingly

1. Install Vercle CLI

   ```sh
   npm i -g vercel
   ```

1. Login

   ```sh
   vercel login
   ```

1. Build & Deploy

   ```sh
   vercel --prod
   ```

   Or you can use build locally and then deploy with your prebuilt

   ```sh
   vercel build --prod
   vercel deploy --prebuilt --prod
   ```

For detail information, please check [Get started with Vercel CLI](https://vercel.com/docs/cli).

### Netlify

1. Update `netlify.toml` accordingly

1. Install Netlify CLI

   ```sh
   npm i -g netlify-cli
   ```

1. Login

   ```sh
   netlify login
   ```

1. Build & Deploy

   ```sh
   netlify deploy
   ```

   Or you can use build locally and then deploy with your prebuilt

   ```sh
   netlify build && netlify deploy --prod
   ```

For detail information, please check [Get started with Netlify CLI](https://docs.netlify.com/cli/get-started/).

## ❓ Issues / Problems / Questions

Please take advantage of our [Github's Q&A Discussion board](https://github.com/kwchang0831/svelte-QWER/discussions/categories/q-a).

## 😊 Are you using QWER?

Please consider adding `svelte-qwer` topic to your repository.

To see whoelse are using QWER, please check [Github-Topics: svelte-qwer](https://github.com/topics/svelte-qwer).

## 👍 END
