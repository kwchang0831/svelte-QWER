/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Site } from '$lib/types/site';
import type { Giscus } from '$lib/types/giscus';
import type { DD } from '$lib/types/dd';

import Avator from '$assets/avator.png';
import Avator_32 from '$assets/avator.png?w=32&h=32&format=wepb;avif';
import Avator_128 from '$assets/avator.png?w=128&h=128&format=wepb;avif';

export const siteConfig: Site.Config = {
  url: 'https://svelte-qwer.vercel.app/',
  title: 'QWER',
  subtitle: 'Simple Blog Starter',
  description: 'Full-Featured Blog Starter Built with Svelte & SvelteKit',
  lang: 'en',
  since: 2022,
  author: {
    name: 'John Doe',
    status: '❤️',
    avator: Avator,
    avator_32: Avator_32,
    avator_128: Avator_128,
    website: 'https://kwchang0831.dev',
    github: 'https://github.com/kwchang0831',
    email: 'contact@kwchang0831.dev',
    bio: `lorem ipsum! <br/> dolor sit amet!`,
  },
};

export const headConfig: Site.Head = {
  custom: ({ dev }) => (dev ? [] : []),
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

export const giscusConfig: Giscus.Config = {
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

export const videoplayerConfig = {
  seekTime: 2,
  controls: ['play', 'restart', 'progress', 'current-time', 'duration', 'fullscreen'],
};
