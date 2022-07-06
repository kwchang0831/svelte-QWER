/**
 * TOC : [
 * {
 *  heading: 'First Chapeter',
 *  slug: '#first-chap'
 *  child: [
 *    {
 *      heading: 'first section'
 *      slug: '#first-chap_first-section'
 *    },
 *    {
 *      heading: 'second section'
 *      slug: '#first-chap_second-section'
 *    }
 *  ]
 * }
 * ]
 */
export namespace TOC {
  export interface Content {
    heading: string;
    slug: string;
    child?: Array<Content>;
  }
}
