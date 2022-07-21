import type Tags from '$lib/tags.svelte';
import type { Tags } from '$lib/types/tags';
import type { TOC } from '$lib/types/toc';

export namespace Post {
  export interface Info {
    title?: string;
    slug?: string;
    cover?: string;
  }

  export interface CurrentPost {
    tocVisible: Map<string, number>;
  }

  export interface Detail extends Info {
    order: number;
    summary?: string;
    content?: string;
    published: string;
    updated?: string;
    cover?: string;
    coverStyle?: CoverStyle;
    toc?: TOC.Heading[];
  }

  export type Post = {
    slug: string;
    title: stinrg;
    summary?: string;
    content?: string;
    published: string;
    updated?: string;
    cover?: string;
    coverStyle?: CoverStyle | string;
    toc: TOC.Heading[];
    tags: Tags.Tags;
  };

  export enum CoverStyle {
    TOP = 'TOP',
    RIGHT = 'RIGHT',
    BOT = 'BOT',
    LEFT = 'LEFT',
    IN = 'IN',
  }

  export type IndexPost = {
    id: number;
    post: Post.Post;
    prev?: string;
    next?: string;
  };
}
