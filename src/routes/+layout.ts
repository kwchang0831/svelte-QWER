export const prerender = true;
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
  return {
    props: {
      path: url.pathname,
    },
  };
};
