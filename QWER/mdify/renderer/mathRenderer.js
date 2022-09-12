import { renderBlock, renderInline } from '../lib/katex.cjs';

export const renderKatexBlock = (code) => {
  return `<p class="katex-block">{@html String.raw\`${renderBlock(code)}\`}</p>`;
};

export const renderKatexInline = (code) => {
  return `<span class="katex-inline">${renderInline(code)}</span>`;
};
