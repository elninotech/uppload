import Unsplash, {
  UnsplashResult
} from "../../../src/services/search/unsplash";
import { minifyHTML } from "../../../src/helpers/utils";

const service = new Unsplash("API_KEY");

const unsplashResult: UnsplashResult = {
  id: "1",
  description: "Tree",
  alt_description: "An image of a tree",
  urls: {
    regular: "https://unsplash.com/regular.jpg",
    thumb: "https://unsplash.com/thumb.jpg"
  },
  user: {
    name: "Anand Chowdhary",
    profile_image: {
      small: "https://unsplash.com/user.jpg"
    }
  }
};

test("popular endpoint", () =>
  expect(service.popularEndpoint).toBe(
    "https://api.unsplash.com/photos?client_id=API_KEY"
  ));

test("search endpoint", () =>
  expect(service.searchEndpoint("API_KEY", "QUERY")).toBe(
    "https://api.unsplash.com/search/photos?client_id=API_KEY&page=1&query=QUERY"
  ));

test("gets search results", () =>
  expect(service.getSearchResults({ results: [unsplashResult] })).toEqual([
    unsplashResult
  ]));

test("gets popular items", () =>
  expect(service.getPopularResults([unsplashResult])).toEqual([
    unsplashResult
  ]));

test("gets button HTML", () =>
  expect(minifyHTML(service.getButton(unsplashResult))).toBe(
    `<div class="result"><button aria-label="An image of a tree" data-full-url="https://unsplash.com/regular.jpg" style="background-image: url('https://unsplash.com/thumb.jpg')"></button><small class="author"><img alt="" src="https://unsplash.com/user.jpg"><span>Anand Chowdhary</span></small></div>`
  ));
