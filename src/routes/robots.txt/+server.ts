import type { RequestHandler } from '@sveltejs/kit';
import { siteConfig } from '$config/site';

const render = async (): Promise<string> => `
User-agent: *
Allow: /

Sitemap: ${new URL('sitemap.xml', siteConfig.url).href}
`;

export const GET: RequestHandler = async () => {
  return new Response(await render(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
