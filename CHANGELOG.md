# @kwchang0831/svelte-qwer

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
