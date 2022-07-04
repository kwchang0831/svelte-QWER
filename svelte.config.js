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
  // css: css => {
  //   css.write('public/bundle.css')
  // },
  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        Unocss({
          extractors: [extractorSvelte],
          presets: [presetUno(), presetTypography(), presetIcons()],
          transformers: [transformerDirective(), transformerVariantGroup(), transformerCompileClass()],
          shortcuts: [
            {
              btn: 'cursor-pointer shrink-0 text-center px-2 py-2 rounded-lg',
              'btn-ghost':
                'border-transparent bg-transparent border-1 light:(hover:bg-gray/[0.5]) dark:(hover:bg-gray/[0.25])',
              'title-link':
                'bg-gradient-to-t from-orange-500 to-orange-500 bg-no-repeat [background-position:0_88%] [background-size:0%_0.1em] focus:![background-size:100%_100%] hover:![background-size:100%_100%] group-hover:[background-size:100%_0.1em] motion-safe:transition-all motion-safe:duration-200',
            },
            [
              /^title-link-(.*)-(.*)-(.*)-(.*)$/,
              ([, f, fc, t, tc]) =>
                `bg-gradient-to-t from-${f}-${fc} to-${t}-${tc} dark:(text-white hover:text-black) light:(text-black hover:text-white) bg-no-repeat [background-position:0_88%] [background-size:0%_0.15em] focus:![background-size:100%_100%] hover:![background-size:100%_100%] group-hover:[background-size:100%_0.15em] motion-safe:transition-all motion-safe:duration-300`,
            ],
          ],
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
