export const highlight = (() => {
  const highlightMatch = /==(.{1,}?)==/g;

  const _highlightTemplate = (ref) => {
    return `<mark>${ref}</mark>`;
  };

  return {
    parseHighlight: (text) => {
      return text.replace(highlightMatch, (_, ref) => {
        return _highlightTemplate(ref);
      });
    },
  };
})();
