/**
 * Minified a string of HTML
 * @param html - HTML string to minify
 * @returns Minified string
 */
export const minifyHTML = (html: string) =>
  html.replace(/\n/g, "").replace(/  /g, "");
