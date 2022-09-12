/* eslint-disable @typescript-eslint/no-var-requires */
const katex = require('katex');
require('katex/contrib/mhchem');

function _renderBlock(input) {
  return katex.renderToString(input, {
    displayMode: true,
    trust: true,
    throwOnError: false,
  });
}

function _renderInline(input) {
  return katex.renderToString(input, {
    trust: true,
    throwOnError: false,
  });
}

module.exports = {
  renderBlock: _renderBlock,
  renderInline: _renderInline,
};
