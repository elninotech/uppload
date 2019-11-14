import Pixabay, { PixabayResult } from "../../../src/services/search/pixabay";
import { minifyHTML } from "../../../src/helpers/utils";

const service = new Pixabay("API_KEY");

const pixabayResult: PixabayResult = {
  id: 1,
  largeImageURL: "https://pixabay.com/large.jpg",
  previewURL: "https://pixabay.com/preview.jpg",
  user: "Anand Chowdhary",
  userImageURL: "https://pixabay.com/user.jpg",
  pageURL: "https://pixabay.com/file",
  tags: "photo, example"
};

test("popular endpoint", () =>
  expect(service.popularEndpoint).toBe(
    "https://pixabay.com/api/?key=API_KEY&per_page=18&image_type=photo"
  ));

test("search endpoint", () =>
  expect(service.searchEndpoint("API_KEY", "QUERY")).toBe(
    "https://pixabay.com/api/?key=API_KEY&per_page=18&q=QUERY&image_type=photo"
  ));

test("gets search results", () =>
  expect(service.getSearchResults({ hits: [pixabayResult] })).toEqual([
    pixabayResult
  ]));

test("gets popular items", () =>
  expect(service.getPopularResults({ hits: [pixabayResult] })).toEqual([
    pixabayResult
  ]));

test("gets button HTML", () =>
  expect(minifyHTML(service.getButton(pixabayResult))).toBe(
    `<div class="result"><button aria-label="photo, example" data-full-url="https://pixabay.com/large.jpg" style="background-image: url('https://pixabay.com/preview.jpg')"></button><small class="author"><img alt="" src="https://pixabay.com/user.jpg"><span>Anand Chowdhary</span></small></div>`
  ));
