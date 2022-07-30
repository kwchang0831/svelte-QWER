import type { Site } from '$lib/types/site';
import type { Giscus } from '$lib/types/giscus';
import type { DD } from '$lib/types/dd';

export const siteConfig: Site.Config = {
  url: 'https://svelte-qwer.vercel.app/',
  title: 'QWER',
  subtitle: 'Simple Blog Starter',
  description: 'Full-Featured Blog Starter Built with Svelte & SvelteKit',
  lang: 'en',
  since: 2022,
  author: {
    name: 'kwchang0831',
    avator: 'https://www.kwchang0831.dev/assets/maskable@192.webp',
    website: 'https://kwchang0831.dev',
    github: 'https://github.com/kwchang0831',
    email: 'contact@kwchang0831.dev',
    bio: `
    Do it. Just do it!
    <br />
    Don't let your dreams be dreams!
    `,
  },
};

export const headConfig: Site.Head = {
  custom: ({ dev }) =>
    dev
      ? []
      : [],
};

export const dateConfig: Site.DateConfig = {
  toPublishedString: {
    locales: 'en-US',
    options: {
      year: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Taipei',
    },
  },
  toUpdatedString: {
    locales: 'en-US',
    options: {
      year: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Taipei',
    },
  },
};

export const commentConfig: Giscus.Config = {
  id: 'giscus-comment',
  repo: 'kwchang0831/svelte-QWER',
  repoId: 'R_kgDOHiLP-g',
  category: 'Comments',
  categoryId: 'DIC_kwDOHiLP-s4CQgDm',
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  loading: 'lazy',
  lang: 'en',
};

export const navConfig: (DD.Nav | DD.Link)[] = [
  {
    name: 'About',
    orientation: 2,
    links: [
      {
        name: 'QWER',
        orientation: 1,
        links: [
          {
            name: 'Introduction',
          },
          {
            name: 'Post Example',
          },
        ],
      },
      {
        name: 'Me',
        orientation: 3,
        links: [
          {
            name: 'Author',
          },
        ],
      },
    ],
  },
  {
    name: 'Github',
    url: 'https://github.com/kwchang0831/svelte-QWER',
    target: '_blank',
  },
];

export const mobilenavConfig: DD.Nav = {
  orientation: 2,
  links: [
    {
      name: 'QWER',
      orientation: 1,
      links: [
        {
          name: 'Introduction',
        },
        {
          name: 'Post Example',
        },
      ],
    },
    {
      name: 'Me',
      orientation: 1,
      links: [
        {
          name: 'Author',
        },
      ],
    },
    {
      name: 'Github',
      url: 'https://github.com/kwchang0831/svelte-QWER',
      target: '_blank',
    },
  ],
};
