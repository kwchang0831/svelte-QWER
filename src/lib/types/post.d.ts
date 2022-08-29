import type { TOC } from '$lib/types/toc';
export namespace Post {
  export type Post = {
    slug: string;
    title: stinrg;
    language: string;
    description: string;
    summary?: string;
    content?: string;
    html?: string;
    published: string;
    updated: string;
    created: string;
    cover?: string;
    coverCaption?: string;
    coverStyle: CoverStyle;
    options?: Array<string>;
    series_tag?: string;
    series_title?: string;
    prev?: string;
    next?: string;
    toc?: TOC.Heading[];
    tags?: Array<>;
  };

  export enum CoverStyle {
    TOP = 'TOP',
    RIGHT = 'RIGHT',
    BOT = 'BOT',
    LEFT = 'LEFT',
    IN = 'IN',
    NONE = 'NONE',
  }
}
