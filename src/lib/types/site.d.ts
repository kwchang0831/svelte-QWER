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

    og_card: string;
  }

  export interface Head {
    custom?: (params: { dev: boolean }) => string[];
  }

  export interface Author {
    name: string;
    status?: string;
    avatar?: string;
    avatar_32: string[];
    avatar_128: string[];
    avatar_48_png: string;
    avatar_96_png: string;
    avatar_192_png: string;
    avatar_512_png: string;
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
