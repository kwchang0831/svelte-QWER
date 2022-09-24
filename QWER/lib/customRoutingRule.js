import { statSync } from 'node:fs';
import matter from 'gray-matter';

/**
 * Input Path: /posts/{year}/{title}.{file-exntension}
 * Output: /posts/{year}/{month}/{day}/{title} instead of /post/{year}/{title}.
 */
export const rule_PostsYearMonthDate = (file, slug) => {
  const _rule = /^posts\/\d{4}\/(.*)/.exec(slug);

  if (_rule) {
    const _matter = matter.read(file);
    const _meta = _matter.data;
    const published = new Date(_meta['published'] ?? statSync(file).birthtime);
    slug = `posts/${published.getFullYear()}/${published.getMonth() + 1}/${published.getDate()}/${_rule[1]}`;
  }

  return slug;
};
