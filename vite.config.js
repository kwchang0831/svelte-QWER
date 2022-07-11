import { sveltekit } from '@sveltejs/kit/vite';
import Unocss from 'unocss/vite';
import { presetTypography, presetIcons, presetUno } from 'unocss';
import { extractorSvelte } from '@unocss/core';
import transformerDirective from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerCompileClass from '@unocss/transformer-compile-class';

/** @type {import('vite').UserConfig} */
const config = {
  mode: process.env.MODE || 'production',
  envPrefix: 'QWER_',
  plugins: [
    Unocss({
      extractors: [extractorSvelte],
      presets: [
        presetUno(),
        presetIcons(),
        presetTypography({
          cssExtend: {
            ':not(pre) > code::before,:not(pre) > code::after': {
              content: '',
            },
            pre: {
              'border-radius': 0,
              padding: 0,
              margin: 0,
            },
          },
        }),
      ],
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
    sveltekit(),
  ]
};

export default config;
