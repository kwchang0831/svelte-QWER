/* eslint-disable @typescript-eslint/no-var-requires */
const katex = require('katex');
require('katex/contrib/mhchem');

function renderToString(input) {
  return katex.renderToString(input, {
    throwOnError: false,
  });
}

module.exports = renderToString;
