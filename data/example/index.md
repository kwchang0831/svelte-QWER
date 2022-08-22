---
title: Example Post
description: Example post writen using Markdown Syntax with 🚀 QWER - Simply Awesome Blog Starter. Built using Svelte with ❤
summary: 📝 Showcase basic syntax of Markdown and HTML
published: 2022-08-09
cover: ./cover.jpg
coverCaption: Photo by <a href="https://unsplash.com/@etiennegirardet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Etienne Girardet</a> on <a href="https://unsplash.com/s/photos/motivation?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
tags:
  - Language: English
  - Year: 2022
  - [Markdown]
---

<script lang="ts">
  import Youtube from '$lib/custom/youtube.svelte'
  const const_variable = 999;
</script>

## Headings

## H2

### H3

#### H4

##### H5

###### H6

## Bold

This is **bold text**.

## Italic

This is _italicized text_.

## Spoiler

This is ||Spoiler Text||.

## Blockquote

> Lorem ipsum began as scrambled, nonsensical Latin derived from Cicero's 1st-century BC text De Finibus Bonorum et Malorum.

## Ordered List

1. First item
2. Second item
3. Third item

## Unordered List

- First item
- Second item
- Third item

### Checkbox List (ul)

- [ ] List Item 1 unchecked
- [x] List Item 2 checked
- [x] List Item 3 checked

## Inline Code

`console.log("Hello World");`

## Horizontal Rule

---

## Link

[Back to Homepage](/)

## Footnotes

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.  
   Indent paragraphs to include them in the footnote.  
   `{ my code }`  
   Add as many paragraphs as you like.  

## Paragraphs

**Lorem Ipsum** dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

**_The_** _quick_ <u>brown</u> [fox](https://www.foxnews.com/) `jumps` ~~over~~ the lazy **dog**.

## Table

| Table Header 1 | Table Header 2 | Table Header 3 |
| -------------- | -------------- | -------------- |
| Division 1     | Division 2     | Division 3     |
| Division 1     | Division 2     | Division 3     |
| Division 1     | Division 2     | Division 3     |

| Table Header 1 | Table Header 2 | Table Header 3 |
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

![Example1](./example1.jpg)

<ImgZ src="example/example1.jpg" alt="Example1" class="h-full object-cover">
Photo by <a href="https://unsplash.com/@willy24?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ioana Tabarcea</a> on <a href="https://unsplash.com/s/photos/morning?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</ImgZ>

## GIF & Videos

![MP4 Example](./example2.mp4)

![GIF/WEBP Example](./example3.webp)

## Youtube / Custom Svelte Component

```svelte
<script lang="ts">
  import Youtube from '$lib/custom/youtube.svelte'
  const const_variable = 999;
</script>

Variable is {const_variable}

<Youtube id="ZXsQAXx_ao0"/>
```

Variable is {const_variable}.

<Youtube id="ZXsQAXx_ao0"/>

## Keyboard

<kbd>↑</kbd> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>B</kbd> <kbd>A</kbd> <kbd>Start</kbd>

<kbd>Ctl + C</kbd> <kbd>Ctl + V</kbd>

## Misc

<sup>Lorem</sup> <sub>ipsum</sub> <cite>dolor sit amet</cite>, <acronym title="Consectetur Adipiscing Elit">consectetur adipiscing elit</acronym>, <abbr title="Aliqua">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</abbr>. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
