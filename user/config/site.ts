/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Site } from '$lib/types/site';
import type { Giscus } from '$lib/types/giscus';
import type { DD } from '$lib/types/dd';

import Avatar from '$assets/avatar.png';
import Avatar_128 from '$assets/avatar.png?w=128&h=128&format=avif;wepb';

import Avatar_48_PNG from '$assets/avatar.png?w=48&h=48';
import Avatar_96_PNG from '$assets/avatar.png?w=96&h=96';
import Avatar_192_PNG from '$assets/avatar.png?w=192&h=192';
import Avatar_512_PNG from '$assets/avatar.png?w=512&h=512';

import DefaultOGCard_512_512 from '$assets/default_og_card.jpg?w=512&h=512&format=webp';

export const siteConfig: Site.Config = {
  url: 'https://svelte-qwer.vercel.app',
  title: 'QWER',
  subtitle: '🚀 QWER - Built using Svelte with ❤',
  description: '🚀 QWER - Awesome Blog Starter, Built using Svelte with ❤',
  lang: 'en',
  since: 2022,
  author: {
    name: 'John Doe',
    status: '❤️',
    avatar: Avatar,
    avatar_128: Avatar_128,
    avatar_48_png: Avatar_48_PNG,
    avatar_96_png: Avatar_96_PNG,
    avatar_192_png: Avatar_192_PNG,
    avatar_512_png: Avatar_512_PNG,
    website: 'https://github.com/kwchang0831/svelte-QWER',
    github: 'https://github.com/kwchang0831',
    email: 'contact@kwchang0831.dev',
    bio: `lorem ipsum! <br/> dolor sit amet!`,
  },
  og_card: DefaultOGCard_512_512,
};

export const headConfig: Site.Head = {
  // Used for IndieWeb
  me: ['https://github.com/kwchang0831'],
  custom: ({ dev }) =>
    dev
      ? [
          // For Development Enviroment
        ]
      : [
          // For Production Enviroment
          // Umami Analytics
          // '<link rel="preconnect" href="https://umami.kwchang0831.dev" />',
          // '<script defer data-website-id="YOUR_ID" src="https://umami.kwchang0831.dev/umami.js" data-cache="true" data-domains="svelte-qwer.vercel.app"></script>',
        ],
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
  // src: 'https://giscus.kwchang0831.dev/client.js',
  enable: true,
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
    name: 'QWER',
    orientation: 2,
    links: [
      {
        name: 'Hello World',
        url: '/hello-world',
        prefetch: true,
      },
      {
        name: 'Example Post',
        url: '/example',
        prefetch: true,
      },
      {
        name: 'Intro to QWER',
        url: '/intro-to-QWER',
        prefetch: true,
      },
    ],
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Get QWER 🚀',
    url: 'https://github.com/kwchang0831/svelte-QWER',
    target: '_blank',
    rel: 'noreferrer noopener',
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
          name: 'Hello World',
          url: '/hello-world',
          prefetch: true,
        },
        {
          name: 'Example Post',
          url: '/example',
          prefetch: true,
        },
        {
          name: 'Intro to QWER',
          url: '/intro-to-QWER',
          prefetch: true,
        },
      ],
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Get QWER 🚀',
      url: 'https://github.com/kwchang0831/svelte-QWER',
      target: '_blank',
      rel: 'noreferrer noopener',
    },
  ],
};
