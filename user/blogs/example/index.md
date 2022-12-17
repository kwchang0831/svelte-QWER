---
title: Example Post
description: Example post written using Markdown Syntax with QWER - Simply Awesome Blog Starter. Built using SvelteKit and Love.
summary: 📝 Showcase basic syntax of Markdown and HTML
published: '2022-08-09T00:00:00.000+08:00'
updated: '2022-12-18T21:00:00.000+08:00'
cover: ./cover.jpg
coverCaption: Photo by <a href="https://unsplash.com/@etiennegirardet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Etienne Girardet</a> on <a href="https://unsplash.com/s/photos/motivation?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
tags:
  - [Markdown]
---

<script lang="ts">
  import Youtube from '$lib/components/youtube.svelte'
  import Custom from '$custom/custom.svelte'
  const const_variable = 999;

  import Folder from '$lib/components/folder.svelte'

  let configFolder = [
    { name: 'QWER.config.js', icon: 'i-vscode-icons-file-type-typescript-official' },
    { name: 'site.ts', icon: 'i-bxs-file-js' }
  ]
</script>

## Paragraphs

**Lorem Ipsum** dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is the content: **_The_** _quick_ <u>brown</u> [fox](https://www.foxnews.com/) `jumps` ~~over~~ the lazy **dog**.

This is ||Spoiler Text||.

> Lorem ipsum began as scrambled, nonsensical Latin derived from Cicero's 1st-century BC text De Finibus Bonorum et Malorum.

<kbd>↑</kbd> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>B</kbd> <kbd>A</kbd> <kbd>Start</kbd>

<kbd>Ctl + C</kbd> <kbd>Ctl + V</kbd>

<sup>Lorem</sup> <sub>ipsum</sub> <cite>dolor sit amet</cite>, <acronym title="Consectetur Adipiscing Elit">consectetur adipiscing elit</acronym>, <abbr title="Aliqua">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</abbr>.

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- First item
- Second item
- Third item

### Checkbox List (ul)

- [ ] List Item 1 unchecked
- [x] List Item 2 checked
- [x] List Item 3 checked

## Katex

### Katex Block

Katex Block are facanced by

````text
```math
Tex Syntax
```
````

Example of Fractions and Binomials

```math
\frac{n!}{k!(n-k)!} = \binom{n}{k}
```

Also

```math
\frac{\frac{1}{x}+\frac{1}{y}}{y-z}
```

### Katex Inline

Katex inline are facanced by

````text
`$kaTex Inline Text$`
````

This `$n^{22}$` and that `$\cos (2\theta) = \cos^2 \theta - \sin^2 \theta$`

### Chemical Typesetting

```math
\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]  $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]  $\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$}
```

## Footnotes

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.  
    Indent paragraphs to include them in the footnote.  
    `{ my code }`  
    Add as many paragraphs as you like.

## Info Block

:::info This is the title

This is the content: **_The_** _quick_ <u>brown</u> [fox](https://www.foxnews.com/) `jumps` ~~over~~ the lazy **dog**.

:::

## Table

| Table Header 1 | Table Header 2 | Table Header 3 |
| -------------- | -------------- | -------------- |
| Division 1     | Division 2     | Division 3     |
| Division 1     | Division 2     | Division 3     |
| Division 1     | Division 2     | Division 3     |

| Align Left | Align Center | Align Right |
| :------------- | :------------: | -------------: |
| Division 1     |   Division 2   |     Division 3 |
| Division 1     |   Division 2   |     Division 3 |
| Division 1     |   Division 2   |     Division 3 |

## Code Block

```ts
/// title: examples/index.ts
for (let x in [0]) console.log(x);
```

```ts
/// showLineNumber
/// diff
/// title: typescript-helloworld.ts
/// hlLines: 2,3-5
class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
};

+ var greeter = new Greeter("Hello, Ministry of Programming!");
+ var str = greeter.greet();
- console.log("Test");
```

## Image

![Example1](/example/example1.jpg)

<ImgZoom src="/example/example1.jpg" alt="Example1" class="h-full object-cover">
Photo by <a href="https://unsplash.com/@willy24?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ioana Tabarcea</a> on <a href="https://unsplash.com/s/photos/morning?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</ImgZoom>

## Videos / GIF

![MP4 Example](/example/example2.mp4)

## Youtube

<Youtube id="ZXsQAXx_ao0"/>

## Custom Svelte Component

<div class="p4 border-1 shadow-xl rounded-xl border-black dark:border-white overflow-auto">
  <Folder name="config" files={configFolder} expanded/>
</div>

<div class="my4">
  <Custom name="custom object" />
</div>

```svelte
<script lang="ts">
  const const_variable = 999;
</script>

Variable is {const_variable}
```

Variable is {const_variable}

```svelte
{(function () {
const guess = Math.random()

if (guess > 0.66) {
return `<span style="color: tomato">Look at us.</span>`
}

if (guess > 0.33) {
return `<span style="color: violet">Who would have guessed?!</span>`
}

return `<span style="color: goldenrod">Not me.</span>`
})()}
```

{(function () {
const guess = Math.random()

if (guess > 0.66) {
return `<span style="color: tomato">Look at us.</span>`
}

if (guess > 0.33) {
return `<span style="color: violet">Who would have guessed?!</span>`
}

return `<span style="color: goldenrod">Not me.</span>`
})()}

## 👍 END
