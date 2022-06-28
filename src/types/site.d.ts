export interface SiteConfig {
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
}
