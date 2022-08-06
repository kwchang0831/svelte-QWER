export const footnotes = (() => {
  const footnoteMatch = /^\[\^([^\]]+)\]:([\s\S]*)$/;
  const referenceMatch = /\[\^([^\]]+)\](?!\()/g;
  const referencePrefix = 'marked-fnref';
  const footnotePrefix = 'marked-fn';

  const _footnoteTemplate = (ref, text) => {
    return `<sup id="${footnotePrefix}:${ref}">${ref}</sup>${text}`;
  };
  const _referenceTemplate = (ref) => {
    return `<sup id="${referencePrefix}:${ref}"><a href="#${footnotePrefix}:${ref}">${ref}</a></sup>`;
  };

  return {
    parseReferences: (text) => {
      return text.replace(referenceMatch, (_, ref) => {
        return _referenceTemplate(ref);
      });
    },
    parseFootnotes: (text) => {
      return text.replace(footnoteMatch, (_, value, text) => {
        return _footnoteTemplate(value, text);
      });
    },
  };
})();
