import type { Site } from '$lib/types/site';
import type { Giscus } from '$lib/types/giscus';

export const siteConfig: Site.Config = {
  url: 'http://localhost:3000',
  title: 'Svelte-QWER',
  subtitle: 'QWER QWER',
  description: 'Learning Svelte',
  lang: 'en',
};

export const commentConfig: Giscus.Config = {
  id: 'giscus-comment',
  repo: 'giscus/giscus-component',
  repoId: 'MDEwOlJlcG9zaXRvcnkzOTEzMTMwMjA=',
  category: 'Announcements',
  categoryId: 'DIC_kwDOF1L2fM4B-hVS',
  mapping: 'specific',
  term: 'Welcome to @giscus/react component!',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  lang: 'en',
};
