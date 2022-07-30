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
    lang?: string;

    author: Author;
  }

  export interface Author {
    name: string;
    avator?: string;
    github?: string;
    website?: string;
    email?: string;
    bio?: string;
  }

  export type DateConfig = {
    toPublishedString: { locales: string; options: Intl.DateTimeFormatOptions };
    toUpdatedString: { locales: string; options: Intl.DateTimeFormatOptions };
  };
}
