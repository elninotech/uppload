export type Elements = string | string[] | Element | Element[];

export const getElements = (query: Elements): Element[] => {
  const elements: Element[] = [];
  if (typeof query === "string") {
    elements.push(...Array.prototype.slice.call(document.querySelectorAll(query)));
  } else if (Array.isArray(query)) {
    query.forEach((item: string | Element) => {
      if (typeof item === "string") {
        elements.push(...Array.prototype.slice.call(document.querySelectorAll(item)));
      } else {
        elements.push(item);
      }
    });
  } else {
    elements.push(query);
  }
  return elements;
}
