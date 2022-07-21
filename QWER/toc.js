export const toc = (() => {
  const _push = (ar, toPush) => {
    if (ar === undefined) throw 'Undefined TOC';

    if (ar.length === 0) {
      ar.push(toPush);
      return;
    }

    const last = ar[ar.length - 1];
    if (toPush.level > last.level) {
      if (!last.child) last.child = [];
      _push(last.child, toPush);
      return;
    }

    ar.push(toPush);
  };

  // interface Heading {
  //   level: number;
  //   heading: string;
  //   slug: string;
  //   child?: Array<Heading>;
  // }
  return {
    add: (ar, level, heading, slug) => {
      _push(ar, {
        level: level,
        heading: heading,
        slug: `#${slug}`,
      });
    },
  };
})();
