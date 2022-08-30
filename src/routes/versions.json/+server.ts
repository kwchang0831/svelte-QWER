import type { RequestHandler } from '@sveltejs/kit';
import { Base64 } from 'js-base64';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mainPKG = __VERSION_MAIN__;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const qwerPKG = __VERSION_QWER__;

const render = async () => {
  return {
    ...JSON.parse(
      Base64.atob(
        'eyJDcmVpZHRzIjp7ImdlbmVyYXRvciI6eyJuYW1lIjoiUVdFUiIsImF1dGhvciI6Imt3Y2hhbmcwODMxIiwibGljZW5zZSI6Ik1JVCIsInJlcG9zaXRvcnkiOnsidHlwZSI6ImdpdCIsInVybCI6ImdpdCtodHRwczovL2dpdGh1Yi5jb20va3djaGFuZzA4MzEvc3ZlbHRlLXF3ZXIuZ2l0In19fX0=',
      ),
    ),
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
