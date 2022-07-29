// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import Unocss from 'unocss/vite';
import { presetTypography, presetIcons, presetUno } from 'unocss';
import { extractorSvelte } from '@unocss/core';
import transformerDirective from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerCompileClass from '@unocss/transformer-compile-class';
import path from 'node:path';
var config = {
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
  ],
  resolve: {
    alias: {
      $QWER: path.resolve('.', 'QWER'),
      $generated: path.resolve('.', 'src/generated'),
      $config: path.resolve('.', 'src/config'),
      $stores: path.resolve('.', 'src/lib/stores'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
};
var vite_config_default = config;
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9qYWNrL0RvY3VtZW50cy9zdmVsdGUtUVdFUlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvamFjay9Eb2N1bWVudHMvc3ZlbHRlLVFXRVIvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvamFjay9Eb2N1bWVudHMvc3ZlbHRlLVFXRVIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSc7XG5pbXBvcnQgeyBwcmVzZXRUeXBvZ3JhcGh5LCBwcmVzZXRJY29ucywgcHJlc2V0VW5vIH0gZnJvbSAndW5vY3NzJztcbmltcG9ydCB7IGV4dHJhY3RvclN2ZWx0ZSB9IGZyb20gJ0B1bm9jc3MvY29yZSc7XG5pbXBvcnQgdHJhbnNmb3JtZXJEaXJlY3RpdmUgZnJvbSAnQHVub2Nzcy90cmFuc2Zvcm1lci1kaXJlY3RpdmVzJztcbmltcG9ydCB0cmFuc2Zvcm1lclZhcmlhbnRHcm91cCBmcm9tICdAdW5vY3NzL3RyYW5zZm9ybWVyLXZhcmlhbnQtZ3JvdXAnO1xuaW1wb3J0IHRyYW5zZm9ybWVyQ29tcGlsZUNsYXNzIGZyb20gJ0B1bm9jc3MvdHJhbnNmb3JtZXItY29tcGlsZS1jbGFzcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9ICovXG5jb25zdCBjb25maWcgPSB7XG4gIG1vZGU6IHByb2Nlc3MuZW52Lk1PREUgfHwgJ3Byb2R1Y3Rpb24nLFxuICBlbnZQcmVmaXg6ICdRV0VSXycsXG4gIHBsdWdpbnM6IFtcbiAgICBVbm9jc3Moe1xuICAgICAgZXh0cmFjdG9yczogW2V4dHJhY3RvclN2ZWx0ZV0sXG4gICAgICBwcmVzZXRzOiBbXG4gICAgICAgIHByZXNldFVubygpLFxuICAgICAgICBwcmVzZXRJY29ucygpLFxuICAgICAgICBwcmVzZXRUeXBvZ3JhcGh5KHtcbiAgICAgICAgICBjc3NFeHRlbmQ6IHtcbiAgICAgICAgICAgICc6bm90KHByZSkgPiBjb2RlOjpiZWZvcmUsOm5vdChwcmUpID4gY29kZTo6YWZ0ZXInOiB7XG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZToge1xuICAgICAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IDAsXG4gICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgICAgdHJhbnNmb3JtZXJzOiBbdHJhbnNmb3JtZXJEaXJlY3RpdmUoKSwgdHJhbnNmb3JtZXJWYXJpYW50R3JvdXAoKSwgdHJhbnNmb3JtZXJDb21waWxlQ2xhc3MoKV0sXG4gICAgICBzaG9ydGN1dHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGJ0bjogJ2N1cnNvci1wb2ludGVyIHNocmluay0wIHRleHQtY2VudGVyIHB4LTIgcHktMiByb3VuZGVkLWxnJyxcbiAgICAgICAgICAnYnRuLWdob3N0JzpcbiAgICAgICAgICAgICdib3JkZXItdHJhbnNwYXJlbnQgYmctdHJhbnNwYXJlbnQgYm9yZGVyLTEgbGlnaHQ6KGhvdmVyOmJnLWdyYXkvWzAuNV0pIGRhcms6KGhvdmVyOmJnLWdyYXkvWzAuMjVdKScsXG4gICAgICAgICAgJ3RpdGxlLWxpbmsnOlxuICAgICAgICAgICAgJ2JnLWdyYWRpZW50LXRvLXQgZnJvbS1vcmFuZ2UtNTAwIHRvLW9yYW5nZS01MDAgYmctbm8tcmVwZWF0IFtiYWNrZ3JvdW5kLXBvc2l0aW9uOjBfODglXSBbYmFja2dyb3VuZC1zaXplOjAlXzAuMWVtXSBmb2N1czohW2JhY2tncm91bmQtc2l6ZToxMDAlXzEwMCVdIGhvdmVyOiFbYmFja2dyb3VuZC1zaXplOjEwMCVfMTAwJV0gZ3JvdXAtaG92ZXI6W2JhY2tncm91bmQtc2l6ZToxMDAlXzAuMWVtXSBtb3Rpb24tc2FmZTp0cmFuc2l0aW9uLWFsbCBtb3Rpb24tc2FmZTpkdXJhdGlvbi0yMDAnLFxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgL150aXRsZS1saW5rLSguKiktKC4qKS0oLiopLSguKikkLyxcbiAgICAgICAgICAoWywgZiwgZmMsIHQsIHRjXSkgPT5cbiAgICAgICAgICAgIGBiZy1ncmFkaWVudC10by10IGZyb20tJHtmfS0ke2ZjfSB0by0ke3R9LSR7dGN9IGRhcms6KHRleHQtd2hpdGUgaG92ZXI6dGV4dC1ibGFjaykgbGlnaHQ6KHRleHQtYmxhY2sgaG92ZXI6dGV4dC13aGl0ZSkgYmctbm8tcmVwZWF0IFtiYWNrZ3JvdW5kLXBvc2l0aW9uOjBfODglXSBbYmFja2dyb3VuZC1zaXplOjAlXzAuMTVlbV0gZm9jdXM6IVtiYWNrZ3JvdW5kLXNpemU6MTAwJV8xMDAlXSBob3ZlcjohW2JhY2tncm91bmQtc2l6ZToxMDAlXzEwMCVdIGdyb3VwLWhvdmVyOltiYWNrZ3JvdW5kLXNpemU6MTAwJV8wLjE1ZW1dIG1vdGlvbi1zYWZlOnRyYW5zaXRpb24tYWxsIG1vdGlvbi1zYWZlOmR1cmF0aW9uLTMwMGAsXG4gICAgICAgIF0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIHN2ZWx0ZWtpdCgpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICRRV0VSOiBwYXRoLnJlc29sdmUoJy4nLCAnUVdFUicpLFxuICAgICAgJGdlbmVyYXRlZDogcGF0aC5yZXNvbHZlKCcuJywgJ3NyYy9nZW5lcmF0ZWQnKSxcbiAgICAgICRjb25maWc6IHBhdGgucmVzb2x2ZSgnLicsICdzcmMvY29uZmlnJyksXG4gICAgICAkc3RvcmVzOiBwYXRoLnJlc29sdmUoJy4nLCAnc3JjL2xpYi9zdG9yZXMnKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBmczoge1xuICAgICAgYWxsb3c6IFsnLi4nXSxcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUixTQUFTLGlCQUFpQjtBQUM1UyxPQUFPLFlBQVk7QUFDbkIsU0FBUyxrQkFBa0IsYUFBYSxpQkFBaUI7QUFDekQsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTywwQkFBMEI7QUFDakMsT0FBTyw2QkFBNkI7QUFDcEMsT0FBTyw2QkFBNkI7QUFDcEMsT0FBTyxVQUFVO0FBR2pCLElBQU0sU0FBUztBQUFBLEVBQ2IsTUFBTSxRQUFRLElBQUksUUFBUTtBQUFBLEVBQzFCLFdBQVc7QUFBQSxFQUNYLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFlBQVksQ0FBQyxlQUFlO0FBQUEsTUFDNUIsU0FBUztBQUFBLFFBQ1AsVUFBVTtBQUFBLFFBQ1YsWUFBWTtBQUFBLFFBQ1osaUJBQWlCO0FBQUEsVUFDZixXQUFXO0FBQUEsWUFDVCxvREFBb0Q7QUFBQSxjQUNsRCxTQUFTO0FBQUEsWUFDWDtBQUFBLFlBQ0EsS0FBSztBQUFBLGNBQ0gsaUJBQWlCO0FBQUEsY0FDakIsU0FBUztBQUFBLGNBQ1QsUUFBUTtBQUFBLFlBQ1Y7QUFBQSxVQUNGO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0EsY0FBYyxDQUFDLHFCQUFxQixHQUFHLHdCQUF3QixHQUFHLHdCQUF3QixDQUFDO0FBQUEsTUFDM0YsV0FBVztBQUFBLFFBQ1Q7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLGFBQ0U7QUFBQSxVQUNGLGNBQ0U7QUFBQSxRQUNKO0FBQUEsUUFDQTtBQUFBLFVBQ0U7QUFBQSxVQUNBLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxHQUFHLEVBQUUsTUFDZCx5QkFBeUIsS0FBSyxTQUFTLEtBQUs7QUFBQSxRQUNoRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxPQUFPLEtBQUssUUFBUSxLQUFLLE1BQU07QUFBQSxNQUMvQixZQUFZLEtBQUssUUFBUSxLQUFLLGVBQWU7QUFBQSxNQUM3QyxTQUFTLEtBQUssUUFBUSxLQUFLLFlBQVk7QUFBQSxNQUN2QyxTQUFTLEtBQUssUUFBUSxLQUFLLGdCQUFnQjtBQUFBLElBQzdDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0YsT0FBTyxDQUFDLElBQUk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
