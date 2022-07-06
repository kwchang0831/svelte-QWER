import type { Site } from '$types/site';
import type { Giscus } from '$types/giscus';

export const siteConfig: Site.Config = {
  url: 'http://localhost:3000',
  title: 'Svelte-QWER',
  subtitle: 'QWER QWER',
  description: 'Learning Svelte',
  lang: 'en',
};

export const commentConfig: Giscus.Config = {
  repo: 'kwchang0831/kwchang0831.dev',
  repoId: 'R_kgDOHPrjlQ',
  category: 'Comments',
  categoryId: 'DIC_kwDOHPrjlc4CO0AG',
  mapping: 'title',
  inputPosition: 'top',
  reactionsEnabled: '1',
  emitMetadata: '0',
  loading: 'lazy',
  lang: 'en-US',
  theme: 'dark',
};
