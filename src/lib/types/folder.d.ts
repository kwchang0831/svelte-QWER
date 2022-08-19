export namespace Folder {
  export interface Item {
    name: string;
    icon?: string;
    files?: Array<Item>;
  }
}
