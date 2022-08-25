export const multiLineCurlyBracket = {
  name: 'multiLineCurlyBracket',
  level: 'block',
  tokenizer(src) {
    const rule = /^\{[\s\S]*(?<![\r\n{]{3,}[\s\S]*)}/;
    const match = rule.exec(src);

    if (match) {
      const token = {
        type: 'multiLineCurlyBracket',
        raw: match[0],
      };
      return token;
    }
  },
  renderer(token) {
    return `<p>{@html ${token.raw.slice(1, -1)}}</p>\n`;
  },
};
