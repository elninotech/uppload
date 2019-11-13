import { SearchBaseClass } from "../../src/helpers/search";
import { GIPHY, Pexels, Pixabay, Unsplash } from "../../src";

const searchClasses = [
  new SearchBaseClass("example-api-key"),
  new GIPHY("example-api-key"),
  new Pexels("example-api-key"),
  new Pixabay("example-api-key"),
  new Unsplash("example-api-key")
];

for (const currentService of searchClasses) {
  describe(`${currentService.name} service`, () => {
    it("getButton is a function", () =>
      expect(typeof currentService.getButton).toBe("function"));
  });
}
