import { marked } from 'marked';
import PrismJS from 'prismjs';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-shell-session.min.js';
import 'prismjs/components/prism-powershell.min.js';
import slug from 'limax';
import path from 'node:path';
import { toc } from './toc.js';

let _toc;

export const languages = {
  shell: 'bash',
  sh: 'shell-session',
  powershell: 'powershell',
  bash: 'bash',
  env: 'bash',
  html: 'markup',
  svelte: 'svelte',
  js: 'javascript',
  css: 'css',
  diff: 'diff',
  ts: 'typescript',
  '': '',
};

export const mdify = (data, basePath) => {
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

  const default_renderer = {
    code(code, infostring) {
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
          lines[i] = lines[i].replace(/^[+|-]/, (match) => {
            if (match === '+') {
              linesClass[i].add('line-addition');
              lineStatus[i] = '+';
            } else if (match === '-') {
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

      const language = (infostring || '').match(/\S*/)[0];
      const plang = languages[language];
      lines = plang
        ? PrismJS.highlight(lines, PrismJS.languages[plang], language)
        : lines.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

      lines = lines.split(/\n/);

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
      // ${options['showLineNumber'] ? `<span class="line-number">${i + lineStart}</span>`:'<span class="no-line-number"></span>'}${options['diff']? `<span class="line-diff">${lineStatus[i]}</span>` : '<span class="no-line-diff"></span>'}
      lines = lines.join('');

      const escapeTest = /[{|}|(|)]/g;
      const toEscape = {
        '{': '&lcub',
        '}': '&rcub',
        '(': '&lpar',
        ')': '&rpar',
      };
      lines = lines.replace(escapeTest, (c) => toEscape[c]);

      return (
        `<div class="code-block ${options['title'] ? 'titled' : ''} ${
          options['showLineNumber'] ? 'showLineNumber' : ''
        }">` +
        `${options['title'] ? `<h2 class="code-title">${options['title']}</h2>` : ''}` +
        `<pre><code${language ? ` class="language-${language}"` : ''}>` +
        `${lines}` +
        '</code></pre>' +
        '</div>\n'
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
      return '<li>' + text + '</li>\n';
    },

    checkbox(checked) {
      return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox"' + '' + '> ';
    },

    paragraph(text) {
      // let isTeXInline     = /\$(.*)\$/g.test(text)
      // let isTeXLine       = /^\$\$(\s*.*\s*)\$\$$/.test(text)

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
      const tag = flags.align ? '<' + type + ' align="' + flags.align + '">' : '<' + type + '>';
      return tag + content + '</' + type + '>\n';
    },

    // span level renderer
    strong(text) {
      return '<strong>' + text + '</strong>';
    },

    em(text) {
      return '<em>' + text + '</em>';
    },

    codespan(text) {
      const escapeTest = /[{|}|(|)]/g;
      const toEscape = {
        '{': '&lcub',
        '}': '&rcub',
        '(': '&lpar',
        ')': '&rpar',
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

      return `<a ${href.startsWith('/') ? 'sveltekit:prefetch' : ''} href="${escape(href)}" ${
        title ? `title="${title}"` : ''
      }>${text}</a>`;
    },

    image(href, title, text) {
      // console.log(process.cwd())
      if (href === null) {
        return text;
      }

      if (href.startsWith('./')) {
        href = path.join(_basePath, href);
      }

      let output = `<img src="${href}" alt="${text}"/>\n${title ? `<figcaption>${title}</figcaption>\n` : ''}`;
      return output;
    },

    text(text) {
      return text;
    },
  };

  _toc = [];
  marked.use({
    renderer: {
      ...default_renderer,
    },
  });

  return {
    content: marked(String(data)),
    imports: _imports,
    toc: _toc,
  };
};
