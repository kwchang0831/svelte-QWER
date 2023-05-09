import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import adapterVercel from '@sveltejs/adapter-vercel';
import adapterNetlify from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({ preserve: ['partytown'] }),
  kit: {
    adapter: Object.keys(process.env).some((key) => key.includes('VERCEL'))
      ? adapterVercel()
      : Object.keys(process.env).some((key) => key.includes('NETLIFY'))
      ? adapterNetlify()
      : process.env.ADAPTER === 'node'
      ? adapterNode({ out: 'build' })
      : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: null,
        }),
    csp: { mode: 'auto' },
  },
};

export default config;
