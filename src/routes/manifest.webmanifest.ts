/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { RequestHandler } from '@sveltejs/kit';
import { siteConfig } from '$config/site';
import { theme } from '$stores/themes';

import Avator_48 from '$assets/avator.png?w=48&h=48&format=png';
import Avator_96 from '$assets/avator.png?w=96&h=96&format=png';
import Avator_192 from '$assets/avator.png?w=192&h=192&format=png';
import Avator_512 from '$assets/avator.png?w=512&h=512&format=png';

export const GET: RequestHandler = () => ({
  headers: {
    'Content-Type': 'application/manifest+json; charset=utf-8',
  },
  body: JSON.stringify(
    {
      name: siteConfig.title,
      short_name: siteConfig.title,
      lang: siteConfig.lang,
      description: siteConfig.description,
      id: siteConfig.url,
      start_url: '/',
      scope: '/',
      display: 'standalone',
      orientation: 'portrait',
      categories: ['education', 'blog'],
      background_color: theme.get(),
      theme_color: theme.get(),
      icons: [
        {
          src: Avator_48,
          size: '48x48',
          type: 'image/png',
        },
        {
          src: Avator_96,
          size: '96x96',
          type: 'image/png',
        },
        {
          src: Avator_192,
          size: '192x192',
          type: 'image/png',
        },
        {
          src: Avator_512,
          size: '512x512',
          type: 'image/png',
        },
      ],
    },
    null,
    2,
  ),
});
