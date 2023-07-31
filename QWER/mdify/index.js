import { marked } from 'marked';
import { mangle } from 'marked-mangle';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { default_renderer } from './renderer/default.js';
import { multiLineCurlyBracket } from './tokenizer/multiLineCurlyBracket.js';
import { infoBlock } from './tokenizer/infoBlock.js';

export const mdify = (data, basePath) => {
  let defaultRenderer = default_renderer(basePath);

  marked.use({
    mangle: false,
    headerIds: false,
    extensions: [mangle, gfmHeadingId, multiLineCurlyBracket, infoBlock],
    renderer: {
      ...defaultRenderer.renderer,
    },
  });

  const footnotes = [];
  const footnoteTest = /^\[\^[^\]]+\]: /;
  const footnoteMatch = /^\[\^([^\]]+)\]: ([\s\S]*)$/;
  const referenceTest = /\[\^([^\]]+)\](?!\()/g;

  const tokens = marked.lexer(data);

  function checkFootnote(token) {
    if (token.type !== 'paragraph' || !footnoteTest.test(token.text)) {
      return;
    }

    const match = token.text.match(footnoteMatch);
    const name = match[1].replace(/\W/g, '-');
    let note = match[2];

    footnotes.push({
      name,
      note: `${marked(note)}<a href="#fnref:${name}">↩</a>`,
    });

    token.toDelete = true;
  }

  function checkReference(token) {
    if (token.type === 'paragraph' || token.type === 'text') {
      token.text = token.text.replace(referenceTest, (ref, value) => {
        const name = value.replace(/\W/g, '-');
        let code = ref;

        for (let j = 0; j < footnotes.length; j++) {
          if (footnotes[j].name === name) {
            code = `<sup id="fnref:${name}"><a href="#fn:${name}">${j + 1}</a></sup>`;
            break;
          }
        }
        return code;
      });

      if (token.type === 'paragraph') {
        token.tokens = marked.lexer(token.text)[0].tokens;
      }
    }
  }

  function visit(tokens, fn) {
    for (var token of tokens) {
      fn(token);

      if (token.tokens) {
        visit(token.tokens, fn);
      }
    }
  }

  visit(tokens, (token) => {
    checkFootnote(token);
  });

  // Remove tokens from AST, starting with top-level
  let workList = [tokens];
  do {
    let tokenList = workList.pop();

    for (var i = tokenList.length - 1; i >= 0; i--) {
      if (tokenList[i].toDelete) {
        tokenList.splice(i, 1);
      } else if (tokenList[i].tokens) {
        workList.push(tokenList[i].tokens);
      }
    }
  } while (workList.length != 0);

  visit(tokens, (token) => {
    checkReference(token);
  });

  let html = marked.parser(tokens);

  if (footnotes.length > 0) {
    html += `
  <hr />
  <ol>
    ${footnotes
      .map((f) => {
        return `<li id="fn:${f.name}" class="footnote">${f.note}</li>`;
      })
      .join('\n')}
  </ol>
  `;
  }

  return {
    content: html,
    imports: defaultRenderer.imports,
    toc: defaultRenderer.toc,
  };
};
