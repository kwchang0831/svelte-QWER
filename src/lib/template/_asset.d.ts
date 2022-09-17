export namespace Asset {
  export interface Image {
    [index: string | number]: string | number;
    width: string | number;
    height: string | number;
    original: string;
    extraFormats: string;
    /*<!-- :QWER ImageResolutions: -->*/
  }
}
