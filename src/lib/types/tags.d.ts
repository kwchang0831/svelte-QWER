export namespace Tags {
  export interface AllTags {
    name: string;
    parent?: string;
    child?: Array<Tag>;
  }

  export type Tags = Array<string | number | object | Array>;
}
