# @kwchang0831/qwer

## 0.3.1

### Patch Changes

- 2d5d207: deps: upgrade non svelte related

## 0.3.0

### Minor Changes

- 6d332b1: deps: upgrade (kit->581, vite->4.0)

  selected mention:

  - @sveltejs/kit 1.0.0-next.532 -> 1.0.0-next.581
  - svelte 3.52.0 -> 3.54.0
  - vite 3.2.2 -> 4.0.0

## 0.2.0

### Minor Changes

- 232d8c6: !changed: rename user/data folder -> user/blogs folder
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
  - katex inline : `$...# @kwchang0831/qwer

### Patch Changes

- 2046ee0: fix: now correctly detect width/height of public assets.
  fix: `BannerImage`, `ExtraResolutions`, `ExtraFormats` should be optional.
- 0562d7b: updated: mark <a> link with correct rels
- 6171e30: updated: katex block render as display mode instead

  - updated: adjust katex related style

- 7a96bf2: updated: add more languages support for highlighting
- b45afd7: fix: change katex inline syntax from $..$ -> # @kwchang0831/qwer..`$
- bb44ddb: !config: reorganize QWER.config.js

      + !config: required migration

- dc98d14: fix: append &imagetools after imagetools import resources
- 8e8fec0: fix: now correctly reference assets in public folder
- dc98d14: fix: assets path resolution on windows

## 0.1.2

### Patch Changes

- 405e267: fix: removed hardcoded path when generating assets meta
- e8e4c4c: updated: rename file name of components

## 0.1.1

### Patch Changes

- e98fc14: fix: always use ImgZoom component for image element

## 0.1.0

### Minor Changes

- 955b990: added: init changeset
