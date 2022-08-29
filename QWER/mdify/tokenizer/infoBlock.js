export const infoBlock = {
  name: 'infoBlock',
  level: 'block',

  tokenizer(src) {
    const rule = /^:{3}([\S]*)(?:[ ]*)([\S ]*)(?:[ \n\r]?)([\s\S]*?):{3}[\n\r]?/;
    const match = rule.exec(src);
    if (match) {
      const token = {
        type: 'infoBlock',
        raw: match[0],
        statusType: match[1].trim(),
        statusName: match[2] && match[2].trim(),
        content: match[3].trim(),
        tokens: [],
      };
      this.lexer.blockTokens(token.content, token.tokens);
      return token;
    }
  },
  renderer(token) {
    return `<InfoBox statusType="${token.statusType}" ${
      token.statusName ? `statusName="${token.statusName}"` : ''
    }>${this.parser.parse(token.tokens)}</InfoBox>\n`;
  },
};
