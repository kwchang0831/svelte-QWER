import type { Tag } from '$lib/types/tag';
import type { TOC } from '$lib/types/toc';

export namespace Post {
  export interface Info {
    title?: string;
    slug?: string;
    cover?: string;
  }

  export interface CurrentPost extends Info {
    toc?: TOC.Content[];
    tocVisible?: Map<string, number>;
    prev?: Info;
    next?: Info;
  }


  export interface Detail extends Info {
    order: number;
    summary?: string;
    content?: string;
    published: string;
    updated?: string;
    cover?: string;
    coverStyle?: CoverStyle;
    toc?: TOC.Content[];
  }

  export type Post = {
    slug: string;
    title: stinrg;
    summary?: string;
    published: string;
    updated?: string;
    cover?: string;
    coverStyle?: CoverStyle;
    toc: TOC.Content[];
    tags: Tag[];
  }

  export enum CoverStyle {
    TOP = 'TOP',
    RIGHT = 'RIGHT',
    BOT = 'BOT',
    LEFT = 'LEFT',
    IN = 'IN',
  }
}
