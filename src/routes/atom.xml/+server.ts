export const prerender = true;
import type { RequestHandler } from '@sveltejs/kit';
import { siteConfig } from '$config/site';
import type { Post } from '$lib/types/post';
import LZString from 'lz-string';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import postsjson from '$generated/posts.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tagsjson from '$generated/tags.json';

const _allposts = postsjson as [string, Post.Post][];

const _alltags = Array.from(Object.entries(tagsjson as { [key: string]: { [key: string]: number } }));

const render = async (): Promise<string> => `<?xml version='1.0' encoding='utf-8'?>
<feed xmlns="http://www.w3.org/2005/Atom" ${siteConfig.lang ? `xml:lang="${siteConfig.lang}"` : ''}>
<id>${siteConfig.url}</id>
<title><![CDATA[${siteConfig.title}]]></title>
${
  siteConfig.subtitle
    ? `<subtitle>
<![CDATA[${siteConfig.subtitle}]]>
</subtitle>`
    : ''
}
<icon>${new URL(`favicon.png`, siteConfig.url).href}</icon>
<link href="${siteConfig.url}"/>
<link href="${new URL('atom.xml', siteConfig.url).href}" rel="self" type="application/atom+xml"/>
<updated>${new Date().toJSON()}</updated>
<author>
  <name><![CDATA[${siteConfig.author.name}]]></name>
</author>
${_alltags
  .map((t) => {
    const [key, value] = Object.entries(t);
    if (key[1] === 'tags') {
      return Array.from(Object.keys(value[1])).map((tag) => {
        return `<category term="${tag}" scheme="${new URL(`?tags=${encodeURI(tag)}`, siteConfig.url).href}" />`;
      });
    }
    return Array.from(Object.keys(value[1])).map((tag) => {
      const formattedTag = `tags-${key[1]}=${tag}`;
      return `<category term="${key[1]}-${tag}" scheme="${
        new URL(`?tags=${encodeURI(formattedTag)}`, siteConfig.url).href
      }" />`;
    });
  })
  .flat()
  .join('\n')}
${_allposts
  .map((p) => {
    return `<entry>
    <title type="html"><![CDATA[${p[1].title}]]></title>
    <author><name><![CDATA[${siteConfig.author.name}]]></name></author>
    <link href="${new URL(p[1].slug, siteConfig.url).href}" />
    <id>${new URL(p[1].slug, siteConfig.url).href}</id>
    <published>${new Date(p[1].published).toJSON()}</published>
    <updated>${new Date(p[1].updated).toJSON()}</updated>
    <summary type="html"><![CDATA[${p[1].summary}]]></summary>
    <content type="html"><![CDATA[${LZString.decompressFromBase64(p[1].html ?? '') ?? ''}]]></content>
    ${p[1].tags
      ?.map((t: string | string[] | { string: string } | { string: string[] }) => {
        if (typeof t === 'string')
          return `<category term="${t}" scheme="${new URL(`?tags=${encodeURI(t)}`, siteConfig.url).href}" />`;
        if (Array.isArray(t)) {
          return t.map((v) => {
            return `<category term="${v}" scheme="${new URL(`?tags=${encodeURI(v)}`, siteConfig.url).href}" />`;
          });
        }
        const [key, value] = Object.entries(t)[0];
        if (Array.isArray(value)) {
          return value.map((t) => {
            return `<category term="${key}-${t}" scheme="${
              new URL(`?${key}=${encodeURI(t)}`, siteConfig.url).href
            }" />`;
          });
        }
        return `<category term="${key}-${value}" scheme="${
          new URL(`?${key}=${encodeURI(value)}`, siteConfig.url).href
        }" />`;
      })
      .flat()
      .join('\n')}
    </entry>`;
  })
  .join('\n')}
</feed>
`;

export const GET: RequestHandler = async () => {
  return new Response(await render(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
};
