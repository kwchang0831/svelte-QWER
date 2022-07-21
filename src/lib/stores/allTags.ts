import { readable } from 'svelte/store';
import tagsjson from '$generated/tags.json';
const tags = Object.entries(tagsjson).map((e: [string, object]) => {
  return {
    name: e[0],
    child: Object.entries(e[1]).map((c) => {
      return { name: c[0], parent: e[0] };
    }),
  };
});

export const AllTags = readable(tags);
