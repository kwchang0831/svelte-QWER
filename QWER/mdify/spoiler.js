export const spoiler = (() => {
  const spoilerMatch = /\|\|(.{1,}?)\|\|/g;
  const spoilerClass = 'spoiler';

  const _spoilerTemplate = (ref) => {
    return `<span class="${spoilerClass}">${ref}</span>`;
  };

  return {
    parseSpoiler: (text) => {
      return text.replace(spoilerMatch, (_, ref) => {
        return _spoilerTemplate(ref);
      });
    },
  };
})();
