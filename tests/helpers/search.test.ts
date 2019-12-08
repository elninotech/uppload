import { SearchBaseClass } from "../../src/helpers/search";
import { GIPHY, Pexels, Pixabay, Unsplash } from "../../src";

interface IExampleImage {
  name: string;
  image: string;
}
const exampleImage: IExampleImage = {
  name: "user-name",
  image: "image-url"
};

const exampleClass = new SearchBaseClass<IExampleImage>({
  apiKey: "API_KEY",
  name: "example",
  color: "#000",
  icon: "",
  poweredByUrl: "https://example.com",
  popularEndpoint: (apiKey: string) => `https://example.com?key=${apiKey}`,
  searchEndpoint: (apiKey: string, q: string) =>
    `https://example.com/search?key=${apiKey}&q=${q}`,
  getButton: (button: IExampleImage) => `<button>${button.name}</button>`,
  getPopularResults: (response: IExampleImage[]) => response,
  getSearchResults: (response: IExampleImage[]) => response
});

const searchClasses = [
  exampleClass,
  new GIPHY("API_KEY"),
  new Pexels("API_KEY"),
  new Pixabay("API_KEY"),
  new Unsplash("API_KEY")
];

describe("example search service", () => {
  describe("popularEndpoint", () => {
    it("is a string", () =>
      expect(typeof exampleClass.popularEndpoint).toBe("string"));
    it("is a button", () =>
      expect(exampleClass.popularEndpoint).toBe(
        "https://example.com?key=API_KEY"
      ));
  });
  describe("searchEndpoint", () => {
    it("is a function", () =>
      expect(typeof exampleClass.searchEndpoint).toBe("function"));
    it("is a button", () =>
      expect(exampleClass.searchEndpoint("API_KEY", "QUERY")).toBe(
        "https://example.com/search?key=API_KEY&q=QUERY"
      ));
  });
  describe("getButton", () => {
    it("returns a string", () =>
      expect(typeof exampleClass.getButton(exampleImage)).toBe("string"));
    it("returns a button", () =>
      expect(exampleClass.getButton(exampleImage)).toContain("<button"));
  });
  describe("getPopularResults", () => {
    it("returns an object array", () =>
      expect(typeof exampleClass.getPopularResults([exampleImage])).toBe(
        "object"
      ));
    it("is an array", () =>
      expect(
        Array.isArray(exampleClass.getPopularResults([exampleImage]))
      ).toBeTruthy());
    it("returns the same", () =>
      expect(exampleClass.getPopularResults([exampleImage])).toEqual([
        exampleImage
      ]));
  });
  describe("getSearchResults", () => {
    it("returns an object array", () =>
      expect(typeof exampleClass.getSearchResults([exampleImage])).toBe(
        "object"
      ));
    it("is an array", () =>
      expect(
        Array.isArray(exampleClass.getSearchResults([exampleImage]))
      ).toBeTruthy());
    it("returns the same", () =>
      expect(exampleClass.getSearchResults([exampleImage])).toEqual([
        exampleImage
      ]));
  });
});

for (const currentService of searchClasses) {
  describe(`${currentService.name} service`, () => {
    it("getButton is a function", () =>
      expect(typeof currentService.getButton).toBe("function"));
    it("getPopularResults is a function", () =>
      expect(typeof currentService.getPopularResults).toBe("function"));
    it("getSearchResults is a function", () =>
      expect(typeof currentService.getSearchResults).toBe("function"));
  });
}
