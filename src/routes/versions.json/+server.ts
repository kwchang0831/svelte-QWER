import type { RequestHandler } from '@sveltejs/kit';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mainPKG = __VERSION_MAIN__;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const qwerPKG = __VERSION_QWER__;

const render = async () => {
  return {
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
