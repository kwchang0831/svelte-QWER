import { renderBlock, renderInline } from '../lib/katex.cjs';

export const katexBlock = {
  name: 'katexBlock',
  level: 'block',

  tokenizer(src) {
    const rule = /^\${2}([^]*?[^\\])\${2}/;
    const match = rule.exec(src);
    if (match) {
      const token = {
        type: 'katexBlock',
        raw: match[0],
        content: renderBlock(match[1].trim()),
      };
      return token;
    }
  },
  renderer(token) {
    return `<p class="katex-block">{@html String.raw\`${token.content}\`}</p>`;
  },
};

export const katexInline = {
  name: 'katexInline',
  level: 'block',
  tokenizer(src) {
    const rule = /^[^$\n\r`]*\$`([^\n\r]*?[^\\])`\$[^$\n\r`]*[\n\r]/;
    const inlineRule = /\$`([^\n\r]*?[^\\])`\$/g;

    let match = rule.exec(src);

    if (!match || match[0].startsWith('<!--')) return;

    let inlineMatch = inlineRule.exec(match[0]);
    let content = match[0];

    while (inlineMatch) {
      content = content.replace(
        inlineMatch[0],
        `<span class="katex-inline">${renderInline(inlineMatch[1].trim())}</span>`,
      );
      inlineMatch = inlineRule.exec(match[0]);
    }

    const token = {
      type: 'katexInline',
      raw: match[0],
      content: content,
      tokens: [],
    };
    this.lexer.inlineTokens(token.content, token.tokens);
    return token;
  },
  renderer(token) {
    return `<p>{@html String.raw\`${this.parser.parseInline(token.tokens)}\`}</p>`;
  },
};
