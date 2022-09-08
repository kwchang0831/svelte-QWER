export const prerender = true;
import type { RequestHandler } from '@sveltejs/kit';
import { siteConfig } from '$config/site';
import type { Post } from '$lib/types/post';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import postsjson from '$generated/posts.json';

const _allposts = postsjson as [string, Post.Post][];

const render = async (): Promise<string> => `<?xml version='1.0' encoding='utf-8'?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${siteConfig.url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
    ${_allposts
      .map((e) => {
        return `
        <url>
        <loc>${new URL(e[1].slug, siteConfig.url).href}</loc>
        <lastmod>${new Date(e[1].updated).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
        </url>
      `;
      })
      .join('')}
</urlset>`;

export const GET: RequestHandler = async () => {
  return new Response(await render(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
