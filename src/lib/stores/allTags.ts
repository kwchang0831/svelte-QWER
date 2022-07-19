import { readable } from 'svelte/store';
import type { Tag } from '$lib/types/tag';

// const mockup: Tag[] = [
//   {
//     name: 'year',
//     child: [
//       {
//         name: '2020',
//         parent: 'year',
//       },
//       {
//         name: '2021',
//         parent: 'year',
//       },
//       {
//         name: '2022',
//         parent: 'year',
//       },
//     ],
//   },
//   {
//     name: 'language',
//     child: [
//       {
//         name: 'elixir',
//         parent: 'language',
//       },
//       {
//         name: 'javascript',
//         parent: 'language',
//       },
//       {
//         name: 'svelte',
//         parent: 'language',
//       },
//       {
//         name: 'typescript',
//         parent: 'language',
//       },
//     ],
//   },
//   {
//     name: 'ubuntu',
//   },
//   {
//     name: 'windows',
//   },
//   {
//     name: 'macOS',
//   },
//   {
//     name: 'dev',
//   },
// ];

import tagsjson from '$generated/tags.json';
const tags = Object.entries(tagsjson).map((e) => {
  return {
    name: e[0],
    child: Object.entries(e[1]).map((c) => {
      return { name: c[0], parent: e[0] };
    }),
  };
});

export const AllTags = readable(tags);
