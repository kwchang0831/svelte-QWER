export const prerender = true;
import type { RequestHandler } from '@sveltejs/kit';
import { siteConfig } from '$config/site';
import { theme } from '$stores/themes';

export const GET: RequestHandler = () =>
  new Response(
    JSON.stringify(
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
        background_color: theme.get_color(),
        theme_color: theme.get_color(),
        icons: [
          {
            src: import.meta.env.DEV
              ? siteConfig.author.avatar_48_png
              : new URL(siteConfig.author.avatar_48_png, siteConfig.url).href,
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: import.meta.env.DEV
              ? siteConfig.author.avatar_48_png
              : new URL(siteConfig.author.avatar_48_png, siteConfig.url).href,
            sizes: '48x48',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: import.meta.env.DEV
              ? siteConfig.author.avatar_96_png
              : new URL(siteConfig.author.avatar_96_png, siteConfig.url).href,
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: import.meta.env.DEV
              ? siteConfig.author.avatar_96_png
              : new URL(siteConfig.author.avatar_96_png, siteConfig.url).href,
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: import.meta.env.DEV
              ? siteConfig.author.avatar_192_png
              : new URL(siteConfig.author.avatar_192_png, siteConfig.url).href,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: import.meta.env.DEV
              ? siteConfig.author.avatar_192_png
              : new URL(siteConfig.author.avatar_192_png, siteConfig.url).href,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: import.meta.env.DEV
              ? siteConfig.author.avatar_512_png
              : new URL(siteConfig.author.avatar_512_png, siteConfig.url).href,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: import.meta.env.DEV
              ? siteConfig.author.avatar_512_png
              : new URL(siteConfig.author.avatar_512_png, siteConfig.url).href,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      null,
      2,
    ),
    {
      headers: {
        'Content-Type': 'application/manifest+json; charset=utf-8',
      },
    },
  );
