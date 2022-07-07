import type { TOC } from '$lib/types/toc';

export namespace Post {
  export interface Info {
    slug?: string;
    title?: string;
    cover?: string;
  }

  export interface Detail extends Info {
    toc?: TOC.Content[];
    tocVisible?: Map<string, number>;
    prev?: Info;
    next?: Info;
  }
}
