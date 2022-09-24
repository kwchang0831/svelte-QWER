# @kwchang0831/svelte-qwer

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
- bb44ddb: !fixed: typo user/config/QWER.confitg.js -> user/config/QWER.config.js

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
