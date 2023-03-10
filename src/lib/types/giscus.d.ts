export namespace Giscus {
  export type Config = {
    /** Enable Giscus commenting or not */
    enable: boolean;
    src?: string;
    id?: string;
    /** a public GitHub repository. this repo is where the discussions will be linked to. */
    repo: `${string}/${string}`;
    repoId: string;
    /** choose the discussion category where new discussions will be created. */
    category?: string;
    categoryId?: string;
    /** choose the mapping between the embedding page and the embedded discussion. */
    mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific';
    /** the reactions for the discussion's main post will be shown before the comments. */
    reactionsEnabled?: '1' | '0';
    /** discussion metadata will be sent periodically to the parent window (the embedding page). */
    emitMetadata?: '1' | '0';
    /** choose a theme that matches your website. */
    theme?: string;
    /** choose the language giscus will be displayed in. */
    lang?: string;
    loading?: 'lazy';
    inputPosition?: 'top' | 'bottom';
    term?: string;
    'data-strict'?: string;
  };
}
