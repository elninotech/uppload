export type Elements = string | string[] | Element | Element[];

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

export const fitImageToContainer = (image: HTMLImageElement) => {
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
      requestAnimationFrame(() => resolve());
    });
  });
};
