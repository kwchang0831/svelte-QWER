import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import adapterVercel from '@sveltejs/adapter-vercel';
import adapterNetlify from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: Object.keys(process.env).some((key) => key.includes('VERCEL'))
      ? adapterVercel({ edge: true })
      : Object.keys(process.env).some((key) => key.includes('NETLIFY'))
      ? adapterNetlify({ edge: true })
      : process.env.ADAPTER === 'node'
      ? adapterNode({ out: 'build' })
      : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: null,
        }),
    csp: { mode: 'auto' },
    prerender: { default: true },
  },
};

export default config;
