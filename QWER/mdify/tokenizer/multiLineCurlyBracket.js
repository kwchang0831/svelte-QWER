export const multiLineCurlyBracket = {
  name: 'multiLineCurlyBracket',
  level: 'block',
  tokenizer(src) {
    const rule = /^\{([\s\S]*(?<![\r\n{]{3,}[\s\S]*))\}/;
    const match = rule.exec(src);

    if (match) {
      const token = {
        type: 'multiLineCurlyBracket',
        raw: match[0],
        content: match[1].trim(),
      };
      return token;
    }
  },
  renderer(token) {
    return `<p>{@html ${token.content}}</p>\n`;
  },
};
