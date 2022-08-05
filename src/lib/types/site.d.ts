export namespace Site {
  export interface Config {
    /** site url. for example: `https://example.com` */
    url: string;
    /** site title. */
    title: string;
    /** site description. `<meta name="description" content={site.description}>` */
    description: string;
    /** site subtitle. */
    subtitle?: string;
    /** site lang. `<html lang={site.lang}>` */
    lang: string;
    /** site published since year. */
    since?: number;

    author: Author;
  }

  export interface Head {
    custom?: (params: { dev: boolean }) => string[];
  }

  export interface Author {
    name: string;
    status?: string;
    avator?: string;
    avator_32: string[];
    avator_128: string[];
    avator_48_png: string;
    avator_96_png: string;
    avator_192_png: string;
    avator_512_png: string;
    github?: string;
    website?: string;
    email?: string;
    twitter?: string;
    bio?: string;
  }

  export type DateConfig = {
    toPublishedString: { locales: string; options: Intl.DateTimeFormatOptions };
    toUpdatedString: { locales: string; options: Intl.DateTimeFormatOptions };
  };
}
