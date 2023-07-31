import PrismJS from 'prismjs';

import slug from 'limax';
import path from 'node:path';
import { toc } from '../parser/toc.js';
import { spoiler } from '../parser/spoiler.js';
import { highlight } from '../parser/highlight.js';

import probe from 'probe-image-size';
import { existsSync, readFileSync } from 'node:fs';
import { CoreConfig, ImageConfig, UserConfig } from '../../../user/config/QWER.config.js';
import { renderKatexBlock, renderKatexInline } from './mathRenderer.js';

export const default_renderer = (basePath) => {
  let _toc = [];
  let _imports = [];
  let _basePath = basePath;

  const scriptBlockTest = /^<script.*>[\n]*([\S\s]*)<\/script>/i;
  const escapeTest = /[&<>"']/;
  const escapeReplace = /[&<>"']/g;
  const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  const escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  const getEscapeReplacement = (ch) => escapeReplacements[ch];

  function escape(html, encode) {
    if (encode) {
      if (escapeTest.test(html)) {
        return html.replace(escapeReplace, getEscapeReplacement);
      }
    } else {
      if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
      }
    }

    return html;
  }
  return {
    toc: _toc,
    imports: _imports,
    renderer: {
      /**
       * Options:
       *  - title
       *  - diff
       *  - lineStart
       *  - hlLines: 1-3, 5
       *  - showLineNumber
       */
      code(code, infostring) {
        const language = (infostring || '').match(/\S*/)[0];

        if (language === 'math') return renderKatexBlock(code);

        const options = {};
        let output = code;

        output = output
          .replace(/\/\/\/ (.+?): (.+)\n/gm, (_match, key, value) => {
            options[key] = value;
            return '';
          })
          .replace(/\/\/\/ ((\S+?,?)+)\n/gm, (_match, key) => {
            key
              .split(',')
              .filter(Boolean)
              .map((op) => {
                options[op] = true;
              });
            return '';
          })
          .replace(/\/\/\/ (\S+?)\n/gm, (_match, key) => {
            options[key] = true;
            return '';
          });

        output = output.replace(/\n$/, '');

        let lines = output.split(/\r\n|\r|\n/);

        const lineStart = options['lineStart'] ? +options['lineStart'] : 1;
        const linesClass = new Array(lines.length);
        const lineStatus = new Array(lines.length);

        for (let i = 0; i < lines.length; i += 1) {
          linesClass[i] = new Set();

          lineStatus[i] = ' ';
          if (options['diff']) {
            lines[i] = lines[i].replace(/^[+|-] /, (match) => {
              if (match === '+ ') {
                linesClass[i].add('line-addition');
                lineStatus[i] = '+';
              } else if (match === '- ') {
                linesClass[i].add('line-subtraction');
                lineStatus[i] = '-';
              }
              return '';
            });
          }
        }

        const linesToHL = options['hlLines']?.match(/(\d+-?\d+)|(\d+)/g) || [];
        for (const lineHL of linesToHL) {
          const toHL = lineHL.split('-');
          if (toHL.length == 1) {
            linesClass[+toHL - lineStart].add('line-highlight');
          } else {
            const startLine = +toHL[0] - lineStart;
            const endLine = Math.min(+toHL[1] - lineStart, lines.length - 1);
            if (startLine < 0) throw 'Check hlines option. Out-of-index.';
            for (let i = startLine; i <= endLine; i += 1) {
              linesClass[i].add('line-highlight');
            }
          }
        }

        lines = lines.join('\n');

        const plang = UserConfig.languageConfig[language];
        lines = plang
          ? PrismJS.highlight(lines, PrismJS.languages[plang], language)
          : lines.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

        lines = lines.split(/\n/);

        // TODO: Could potentially break HTML tag open and close sequences, needs fix
        for (let i = 0; i < lines.length; i += 1) {
          const classes = [...linesClass[i]].join(' ');
          lines[i] =
            `<div class="code-line${classes ? ` ${classes}` : ''}">` +
            `<div class="code-linenotation">` +
            `${
              options['showLineNumber']
                ? `<span class="line-number">${i + lineStart}</span>`
                : `<span class="no-line-number"></span>`
            }` +
            `${
              options['diff'] ? `<span class="line-diff">${lineStatus[i]}</span>` : '<span class="no-line-diff"></span>'
            }` +
            `</div>` +
            `<div class="code-content">${lines[i]}</div>` +
            `</div>`;
        }

        lines = lines.join('');

        const escapeTest = /[`$]/g;
        const toEscape = {
          '`': '&#96;',
          $: '&#36;',
        };

        lines = lines.replace(escapeTest, (c) => toEscape[c]);

        return (
          `<div class="code-block ${options['title'] ? 'titled' : ''} ${
            options['showLineNumber'] ? 'showLineNumber' : ''
          }">` +
          `${options['title'] ? `<h2 class="code-title">${options['title']}</h2>` : ''}` +
          `<CodeCopy><pre><code${language ? ` class="language-${language}"` : ''}>` +
          `{@html String.raw\`${lines}\`}` +
          `</code></pre></CodeCopy>` +
          `</div>\n`
        );
      },

      blockquote(quote) {
        return '<blockquote>\n' + quote + '</blockquote>\n';
      },

      html(html) {
        const match = html.match(scriptBlockTest);
        if (match && match[1]) {
          _imports.push(match[1]);
          return '';
        }

        return html;
      },

      heading(text, level) {
        const slugurl = slug(text);
        toc.add(_toc, level, text, slugurl);
        return `<h${level} id="${slugurl}"><a href="#${slugurl}">${text}</a></h${level}>\n`;
      },

      hr() {
        return '<hr>\n';
      },

      list(body, ordered, start) {
        const type = ordered ? 'ol' : 'ul',
          startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
        return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
      },

      listitem(text) {
        return `<li>${text}</li>\n`;
      },

      checkbox(checked) {
        return `<input type="checkbox" ${checked ? 'checked' : ''}>`;
      },

      paragraph(text) {
        text = spoiler.parseSpoiler(text);
        text = highlight.parseHighlight(text);

        return `<p>${text}</p>\n`;
      },

      table(header, body) {
        if (body) body = '<tbody>' + body + '</tbody>';

        return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
      },

      tablerow(content) {
        return '<tr>\n' + content + '</tr>\n';
      },

      tablecell(content, flags) {
        const type = flags.header ? 'th' : 'td';
        return `<${type} ${flags.align ? `class="text-${flags.align}"` : ''}>${content}</${type}>\n`;
      },

      // span level renderer
      strong(text) {
        return '<strong>' + text + '</strong>';
      },

      em(text) {
        return '<em>' + text + '</em>';
      },

      codespan(text) {
        // Check for Inline Katex
        const inlineKatexRule = /^\$([^\n\r]*?[^\\])\$/;
        const katexMatch = inlineKatexRule.exec(text);
        if (katexMatch) return renderKatexInline(katexMatch[1]);

        // The Rest
        const escapeTest = /[{|}|(|)]/g;
        const toEscape = {
          '{': '&lcub;',
          '}': '&rcub;',
          '(': '&lpar;',
          ')': '&rpar;',
        };
        text = text.replace(escapeTest, (c) => toEscape[c]);

        return `<code class="inline-code-block">${text}</code>`;
      },

      br() {
        return '<br>';
      },

      del(text) {
        return '<del>' + text + '</del>';
      },

      link(href, title, text) {
        if (href === null) {
          return text;
        }
        // Does not detect if the link has the same domain as the host site
        // Treat all full URLs as external link
        const isLinkExternal = href.indexOf('://') > 0 || href.indexOf('//') === 0;
        return `<a href="${escape(href)}" ${isLinkExternal ? `rel="external"` : ''} ${
          title ? `title="${title}"` : ''
        }>${text}</a>`;
      },

      image(href, title, alt) {
        if (href === null) {
          return alt;
        }

        const ext = path.extname(href).substring(1);

        try {
          // Network File
          href = new URL(href).href;
          if (alt === '') alt = href;
          if (ImageConfig.SupportedImageFormat.includes(ext)) {
            return `<ImgZoom src="${href}" alt="${alt}">${title ? `${title}` : ''}</ImgZoom>`;
          }
          if (ImageConfig.SupportedVideoFormat.includes(ext)) {
            if (ext === 'mp4') return `<Video mp4="${href}" id="${alt}" ${title ? `title="${title}"` : ''}/>`;
            if (ext === 'webm') return `<Video webm="${href}" id="${alt}" ${title ? `title="${title}"` : ''}/>`;
          }
        } catch (_) {
          if (!path.isAbsolute(href)) {
            href = path.join('/', _basePath, href);
          }
          if (alt === '') alt = href;

          if (ImageConfig.SupportedImageFormat.includes(ext)) {
            // let imgPath = path.join(process.cwd(), path.join(CoreConfig.UserBlogsFolder, href));
            // if (existsSync(imgPath)) {
            //   let imgMeta = probe.sync(readFileSync(imgPath));
            //   return `<ImgZoom src="${imgPath}" alt="${alt}" width="${imgMeta?.width}" height="${imgMeta?.height}">${
            //     title ? `${title}` : ''
            //   }</ImgZoom>`;
            // }
            return `<ImgZoom src="${href}" alt="${alt}">${title ? `${title}` : ''}</ImgZoom>`;
          }
          if (ImageConfig.SupportedVideoFormat.includes(ext)) {
            if (ext === 'mp4') return `<Video mp4="${href}" id="${alt}" ${title ? `title="${title}"` : ''}/>`;
            if (ext === 'webm') return `<Video webm="${href}" id="${alt}" ${title ? `title="${title}"` : ''}/>`;
          }
        }
        return `<ImgZoom src="${href}" alt="${alt}">${title ? `${title}` : ''}</ImgZoom>`;
      },

      text(text) {
        return text;
      },
    },
  };
};
