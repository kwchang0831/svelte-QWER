import path from 'path';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import Unocss from 'unocss/vite';
import { presetTypography, presetIcons, presetUno } from 'unocss';
import { extractorSvelte } from '@unocss/core';
import transformerDirective from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerCompileClass from '@unocss/transformer-compile-class';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        Unocss({
          extractors: [extractorSvelte],
          presets: [presetUno(), presetTypography(), presetIcons()],
          transformers: [transformerDirective(), transformerVariantGroup(), transformerCompileClass()],
        }),
      ],
      resolve: {
        alias: {
          $config: path.resolve('src/config'),
          $types: path.resolve('src/types'),
        },
      },
    },
  },
};

export default config;
