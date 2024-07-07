# @kwchang0831/svelte-qwer

## 1.1.0

### Minor Changes

- c53dbdc: fix: upgrade deps, fix mobile device btn not working, update husky related setup

### Patch Changes

- 4ab2304: fix: Fixed image scaling issues in Safari and mobile Chrome

## 1.0.0

### Major Changes

- dd13f4d: Fix post_SEO for remote image url

### Minor Changes

- 3083a37: deps: upgrade

## 0.12.0

### Minor Changes

- 59989c3: ✨ Feat: Cloudflare Pages support
- b47cc8e: deps: upgrade (svelte -> 4.0)

  run the following if needed:

  ```sh
  pnpm i && pnpm clean && pnpm format
  ```

- c91a291: ✨ feat: Added a script for streamlined creation of a blog folder and its corresponding index.md file.
- dfdc753: deps: upgrade
- d6814ba: deps: upgrade

### Patch Changes

- 9a74335: deps: upgrade; update: readme
- 4af1ef9: deps: upgrade
- f3631ce: refactor: Globalization of Transitions - @Nich87
- c743568: deps: upgrade
- 821245a: deps: upgrade
- 49aae38: cfg: remove plausible
- ec65ead: add: include og:imge:width/height
- 81c004a: 🛠️ chore: Format current date and timezone in shell script
- 946a38f: fix: pnpm-lock
- f083980: chore: organize \*.sh files to utils folder
- 1c98e89: deps: upgrade
- d1d40d8: fix: prettier svelte plugin

## 0.11.0

### Minor Changes

- c47759b: deps: upgrade (vite, svelte, kit, unocss, marked...)

### Patch Changes

- ff3f374: doc: update example post
- a8c72c9: deps: upgrade (katex)
- b1bab79: fix: sync url query parameter with search input
- bdf216d: fix: aria accessibility issue
- 51d4520: fix: dirty fix for partytown not copying lib

  - check out https://github.com/BuilderIO/partytown/issues/367

- 16d3580: deps: upgrade (kit)

## 0.10.0

### Minor Changes

- c862ea7: !deps: upgrade, remove partytown

  !upgrade: unocss
  https://github.com/unocss/unocss/pull/2368
  now in saperate package: @unocss/extractor-svelte

### Patch Changes

- 06f0f72: fix: local image path add leading slash & clean up
- d735aad: dpes: add peerDep sharp@0.31.3
- aa3e076: dpes: upgrade (vite related)
- ca34620: deps: upgrade (sveltejs, unocss...)
- bf88971: fix: url hash scroll after 1sec
- 4710532: feat: add languageConfig in UserConifg and dynamic import prismjs components

## 0.9.0

### Minor Changes

- 59878fb: deps: upgrade svelte related deps

### Patch Changes

- 63cbb54: deps: upgrade (non svelte related deps)
- 4607137: config: remove pnpm version restriction

## 0.8.0

### Minor Changes

- 202a6f4: deps: upgrade

## 0.7.2

### Patch Changes

- 4ff2b0a: fix: giscus iframe css

## 0.7.1

### Patch Changes

- 8cf97cd: fix: issue#50
- 7141051: fix: giscus width issue, take out data-theme

## 0.7.0

### Minor Changes

- dc4531d: deps upgrade

### Patch Changes

- 6ffe6ee: fix: check $page.route before accessing id

## 0.6.0

### Minor Changes

- e98c731: deps: migrate to sveltekit 1.0, fix all lint errors

### Patch Changes

- 2d5d207: deps: upgrade non svelte related
- fb8da06: dpes: upgrade svelte kit related to the latest before 1.0
- 9942af9: deps: upgrade svelte

## 0.5.2

### Patch Changes

- faec438: fix: vercel disable trailing slash

## 0.5.1

### Patch Changes

- fa98c71: del: clean and format

## 0.5.0

### Minor Changes

- 6d332b1: deps: upgrade (kit->581, vite->4.0)

  selected mention:

  - @sveltejs/kit 1.0.0-next.532 -> 1.0.0-next.581
  - svelte 3.52.0 -> 3.54.0
  - vite 3.2.2 -> 4.0.0

### Patch Changes

- d4feeeb: deps: upgrade (@sveltejs/kit 1.0.0-next.516 -> 1.0.0-next.520)
- fcc798d: deps: upgrade (@sveltejs/kit 1.0.0-next.525 -> 1.0.0-next.532)
- dd37629: fix: kit breaking upgrade relates to routeId prefix `/`
- dd37629: deps: upgrade (@sveltejs/kit 1.0.0-next.520 -> 1.0.0-next.525)

## 0.4.1

### Patch Changes

- 2e0a045: fix: flexsearch module import causes TypeError in windows local dev env
- 566a350: fix: touch scrolling and go to the heading should be exclusive
- d2f521d: fix: tag filter error when there is a post has no tags
- 07b003e: dpes: upgrade (@sveltejs/kit 1.0.0-next.510 -> 1.0.0-next.511)
- d5b811b: deps: upgrade (@sveltejs/kit 1.0.0-next.502 -> 1.0.0-next.503)
- 0fb85fc: i18n: add ja; updated: post time format to include months, years ago;
- 5a77895: deps: upgrade (@sveltejs/kit 1.0.0-next.511 -> 1.0.0-next.513)
- 48477af: dpes: upgrade (@sveltejs/kit 1.0.0-next.503 -> 1.0.0-next.504)
- 74782fe: fix: vercel partytown dest
- 4970787: fix: A11y: visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.
- 4970787: fix: tag filter down button correctly shown
- 2da867a: fix: toc on mobile react to touch
- 4970787: deps: upgrade (@sveltejs/kit 1.0.0-next.511 -> 1.0.0-next.513;svelte 3.50.1 -> 3.51.0)
- 175b6af: added: ga4
- 1dfb41f: fix: add scrolling to tags filter
- 4f7be8f: revert: remove preload in img components since it doesn't make much differences
- ba85a7f: fix: partytown dist based on host platform
- 2b9cae9: fix: valid html attribute (toc-link -> data-toc-link)
- 2d5603c: deps: upgrade (svelte 3.51.0 -> 3.52.0)

## 0.4.0

### Minor Changes

- 15a9db0: feat: introduce css variable for customized theme
  feat: added `user/config/userTheme.scss` for customized theme
- 232d8c6: !changed: rename user/data folder -> user/blogs folder
- a84ff38: feat: add partytown for plausible script
- 63efeeb: !feat: add special routing rule PostsYearMonthDate

  migrate: `QWER.config.js`

  ```diff
  export const UserConfig = {
    ...

  +  RoutingRules: {
  +    PostsYearMonthDate: false,
  +  },
  };
  ```

- daf9a52: feat: add katex, mhchem support
- 57f67af: !updated: change katex syntax for block and inline

  - katex block : ```math block
  - katex inline : `$...# @kwchang0831/svelte-qwer

### Patch Changes

- 2046ee0: fix: now correctly detect width/height of public assets.
  fix: `BannerImage`, `ExtraResolutions`, `ExtraFormats` should be optional.
- 0562d7b: updated: mark <a> link with correct rels
- 809eb70: fix: image srcset href now will no longer appending after site.url
- 6ddd084: updated: css change some of the text color to inherit
- bb44ddb: feat: add show/hide tag in xl res
- 6171e30: updated: katex block render as display mode instead

  - updated: adjust katex related style

- 7a96bf2: updated: add more languages support for highlighting
- 57ca7a9: updated: add data-sveltekit-prefetch to body
- b45afd7: doc: update katex related example
- e97c39b: added: img preload in head
- 176af94: fix: tippy not show
- add65ee: fix: index style
  added: more theme variables
- bb44ddb: !config: reorganize QWER.config.js

      + !config: required migration

- d110a37: dpes: upgrade (\* @sveltejs/kit 1.0.0-next.481 ❯ 1.0.0-next.483)
- 46556c9: fix: remove image url leading dot due to url transformed to ./\_app/immutable
- bb44ddb: !fix: typo user/config/QWER.confitg.js -> user/config/QWER.config.js

      + !config: required migration

- 0a7296b: fix: hide tag button in header when not in index page (mobile)
- 42f50ac: fix: prevent scrollbar reposition page
- 4ec3730: !updated: removed ts-nocheck from site.ts
- 036869a: deps: upgrade (\*kit 1.0.0-next.480 -> 1.0.0-next.481)
- dc98d14: fix: fix \_asset.d.ts type
- 39e1ac4: fix: footer link data-sveltekit-prefetch error
- 8474c86: fix: assets' url in dev mode
- 6d3f27d: !updated: add origins and other settings to giscus

      + !breaking: Required to migrate `/usr/config/site.ts`
      + !breaking: Local dev will no longer loads giscus. Giscus will only load if the window.origin === site.url

- 6f973f2: deps: upgrade (@sveltjs/kit 1.0.0-next.499 -> 1.0.0-next.502)

## 0.3.3

### Patch Changes

- ac9ea7f: fix: error page only shows 404 img if status is actually 404

## 0.3.2

### Patch Changes

- 08e04ae: fix: index CLS

## 0.3.1

### Patch Changes

- ce52339: fix: index page UI unexpected shift

## 0.3.0

### Minor Changes

- 771a3cd: feat: add tags filter button for mobile user
- 0bfdfab: feat: add on-site search

### Patch Changes

- 2853a77: UI: update index search box
- 416177d: fix: shows NaN year divider with invalid date in post
- 82c8454: fix: hover effect stays after touch on mobile
  fix: index profile avatar unexpected transition on mobile
- 9261f08: updated: meta, seo

  - !updated: `user/config/site.ts`
    - added `cover`
    - removed `og_card`

- 5163f57: fix: incorrectly setting URL search params when mixing tags and query
- 8c5b897: updated: sveltekit-prefetch -> data-sveltekit-prefetch
- 0f74c3b: updated: tweak posts stores related
- 7db9721: deps: upgrade
- 79e7dd8: updated: 404 error page

  - !added: `user/assets/404.webp`

- aff9466: deps: upgrade (svelte 3.49.0 -> 3.50.1)

## 0.2.0

### Minor Changes

- b56128c: feat: add i18n for UI

  !updated: `user/config/site.ts` config required mirgration

### Patch Changes

- c363a84: deps: upgrade
- 6dec248: fix: revert deps upgrade (svelte 3.50.0 -> 3.49.0) due to transition broken
- bfcecdd: dpes: upgrade. \*(@sveltjs/kit -> 1.0.0-next.463)
- e8e4c4c: updated: rename file name of components
- 4c33b24: fix: tippy action default options always overwritten user options.
  !added: status tip. `user/config/site.ts` might need migration.

## 0.1.2

### Patch Changes

- ba977d0: removed: dead code: image_responsive component
- c9c66dd: !removed: plyr 3rd party lib since we might not really need it, and we need to reduce page weight
- fc6b573: fix: zooming, make all img not selectable, not draggable
- 9651cb0: added: post loading animation before mount, post transition animation
- ded80ea: feat: add nprogress
- 1e51271: fix: tweak post UI style
- ee49440: fix: table of content not working correctly
- d6f0c7e: fix: pre/next post nav height is not enough when viewing on mobile

## 0.1.1

### Patch Changes

- b16149c: fix:(sitemap, atom feed) wrong URL concatenation

## 0.1.0

### Minor Changes

- 955b990: added: init changeset

### Patch Changes

- 955b990: added: worflow
- 955b990: changed: README, post/about, project configs
