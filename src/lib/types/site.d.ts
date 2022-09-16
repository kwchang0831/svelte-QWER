import type { Locales } from '$i18n/i18n-types';

export namespace Site {
  export interface Config {
    /** site url  without tailing slash. for example: `https://example.com` */
    url: string;
    /** site title. */
    title: string;
    /** site description. `<meta name="description" content={site.description}>` */
    description: string;
    /** site subtitle. */
    subtitle?: string;
    /** site lang. `<html lang={site.lang}>` */
    lang: Locales;

    timeZone: string;

    /** site published since year. */
    since?: number;

    author: Author;

    cover: string;
  }

  export interface Head {
    me?: string[];
    custom?: (params: { dev: boolean }) => string[];
  }

  export interface Author {
    name: string;
    status?: string;
    statusTip?: string;
    avatar?: string;
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

  declare module '*&imagetools' {
    /**
     * Workaround found here
     * - issue https://github.com/JonasKruckenberg/imagetools/issues/160#issuecomment-1009292026
     * actual types
     * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
     * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
     */
    const out;
    export default out;
  }
}
