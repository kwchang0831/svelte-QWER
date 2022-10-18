export const prerender = true;
import type { RequestHandler } from '@sveltejs/kit';
import { siteConfig, headConfig } from '$config/site';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mainPKG = __VERSION_MAIN__;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const qwerPKG = __VERSION_QWER__;

const render = async () => {
  return {
    ...JSON.parse(
      '\x7B\x22\x43\x72\x65\x69\x64\x74\x73\x22\x3A\x7B\x22\x67\x65\x6E\x65\x72\x61\x74\x6F\x72\x22\x3A\x7B\x22\x6E\x61\x6D\x65\x22\x3A\x22\x51\x57\x45\x52\x22\x2C\x22\x61\x75\x74\x68\x6F\x72\x22\x3A\x22\x6B\x77\x63\x68\x61\x6E\x67\x30\x38\x33\x31\x22\x2C\x22\x6C\x69\x63\x65\x6E\x73\x65\x22\x3A\x22\x4D\x49\x54\x22\x2C\x22\x72\x65\x70\x6F\x73\x69\x74\x6F\x72\x79\x22\x3A\x7B\x22\x74\x79\x70\x65\x22\x3A\x22\x67\x69\x74\x22\x2C\x22\x75\x72\x6C\x22\x3A\x22\x67\x69\x74\x2B\x68\x74\x74\x70\x73\x3A\x2F\x2F\x67\x69\x74\x68\x75\x62\x2E\x63\x6F\x6D\x2F\x6B\x77\x63\x68\x61\x6E\x67\x30\x38\x33\x31\x2F\x73\x76\x65\x6C\x74\x65\x2D\x71\x77\x65\x72\x2E\x67\x69\x74\x22\x7D\x7D\x7D\x7D',
    ),
    siteConfig: siteConfig,
    headConfig: headConfig,
    'svelte-QWER': {
      name: mainPKG.name,
      version: mainPKG.version,
      author: mainPKG.author,
      homepage: mainPKG.homepage,
      deps: mainPKG.devDependencies,
    },
    QWER: {
      name: qwerPKG.name,
      version: qwerPKG.version,
      author: qwerPKG.author,
      homepage: qwerPKG.homepage,
      deps: qwerPKG.devDependencies,
    },
  };
};

export const GET: RequestHandler = async () =>
  new Response(JSON.stringify(await render(), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
