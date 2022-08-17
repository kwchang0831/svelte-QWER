export namespace Tags {
  export interface Tag {
    name: string;
    category: string;
  }

  export interface Category {
    name: string;
    tags?: Array<Tag>;
  }
}
