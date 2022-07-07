export namespace DD {
  export enum Orientation {
    Top = 0,
    Left,
    Bot,
    Right,
  }

  export interface Link {
    name?: string;
    url?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    prefetch?: true | null;
  }

  export interface Nav extends Link {
    links?: Array<Link | Nav>;
    orientation: Orientation;
  }
}
