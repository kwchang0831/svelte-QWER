import type { TOC } from '$lib/types/toc';
export namespace Post {
  export type Post = {
    slug: string;
    title: stinrg;
    description: string;
    summary?: string;
    content?: string;
    html?: string;
    published: string;
    updated: string;
    created: string;
    cover?: string;
    coverCaption?: string;
    coverStyle?: CoverStyle | string;
    options?: Array<string>;
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
  }

  export interface Asset {
    320: string | [];
    400: string | [];
    640: string | [];
    960: string | [];
    1280: string | [];
    original: string | [];
    banner: string | [];
  }
}
