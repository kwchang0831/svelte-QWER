export namespace DD {
  export enum Orientation {
    TOP = 0,
    RIGHT,
    BOT,
    LEFT,
  }

  export interface Link {
    name?: string;
    url?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    rel?: string;
    prefetch?: true | null;
  }

  export interface Nav extends Link {
    links?: Array<Link | Nav>;
    orientation: Orientation;
  }
}
