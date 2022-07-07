import type { TOC } from '$lib/types/toc';

export namespace Post {
  export interface Info {
    slug?: string;
    title?: string;
    cover?: string;
  }

  export interface Detail extends Info {
    toc?: TOC.Content[];
    toc_visiable?: Set<string>;
    prev?: Info;
    next?: Info;
  }
}
