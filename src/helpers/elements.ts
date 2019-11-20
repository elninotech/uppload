export type Elements = string | string[] | Element | Element[];

/**
 * Gets all the DOM elements matching a selector
 * @param query - CSS selector string, HTML element, or an array of them
 */
export const getElements = (query?: Elements): Element[] => {
  if (!query) return [];
  const elements: Element[] = [];
  if (typeof query === "string") {
    elements.push(
      ...Array.prototype.slice.call(document.querySelectorAll(query))
    );
  } else if (Array.isArray(query)) {
    query.forEach((item: string | Element) => {
      if (typeof item === "string") {
        elements.push(
          ...Array.prototype.slice.call(document.querySelectorAll(item))
        );
      } else {
        elements.push(item);
      }
    });
  } else {
    elements.push(query);
  }
  return elements;
};

const listening: { element: Element; type: string }[] = [];

/**
 * Safely adds an event listener, preventing duplicates
 * @param element - HTML element to add event listener to
 * @param type - Type of event listener to add
 * @param fn - Callback function to call on event
 */
export const safeListen = (
  element: Element,
  type: string,
  fn: EventListenerOrEventListenerObject
) => {
  const hasListener = !!listening.find(
    a => a.element === element && a.type === type
  );
  if (hasListener) return;
  element.addEventListener(type, fn);
  listening.push({ element, type });
};

/**
 *
 * @param image - An HTML <img> element in the DOM
 */
export const fitImageToContainer = (
  image: HTMLImageElement
): Promise<undefined> => {
  return new Promise(resolve => {
    const parent = image.parentElement as HTMLDivElement | null;
    const currentDimensions = image.getBoundingClientRect();
    if (!parent) return;
    const dimensions = parent.getBoundingClientRect();
    if (currentDimensions.height < currentDimensions.width) {
      image.style.height = `${dimensions.height}px`;
      image.style.width = "auto";
    } else {
      image.style.width = `${dimensions.width}px`;
      image.style.height = "auto";
    }
    requestAnimationFrame(() => {
      const currentDimensions = image.getBoundingClientRect();
      if (currentDimensions.height > dimensions.height) {
        image.style.height = `${dimensions.height}px`;
        image.style.width = "auto";
      } else if (currentDimensions.width > dimensions.width) {
        image.style.width = `${dimensions.width}px`;
        image.style.height = "auto";
      }
      requestAnimationFrame(() => {
        const effect = document.querySelector(
          ".uppload-effect"
        ) as HTMLDivElement | null;
        if (effect) effect.style.opacity = "1";
        resolve();
      });
    });
  });
};
