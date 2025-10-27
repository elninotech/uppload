import Pexels, { PexelsResult } from "../../../src/services/search/pexels";
import { minifyHTML } from "../../../src/helpers/utils";

const service = new Pexels("API_KEY");

const pexelsResult: PexelsResult = {
  url: "https://pexels.com/image",
  photographer: "Anand Chowdhary",
  src: {
    original: "https://pexels.com/original.jpg",
    large2x: "https://pexels.com/large.jpg",
    tiny: "https://pexels.com/tiny.jpg",
  },
};

test("popular endpoint", () =>
  expect(service.popularEndpoint).toBe(
    "https://api.pexels.com/v1/curated?per_page=9&page=1"
  ));

test("search endpoint", () =>
  expect(service.searchEndpoint("API_KEY", "QUERY")).toBe(
    "https://api.pexels.com/v1/search?query=QUERY&per_page=12&page=1"
  ));

test("gets search results", () =>
  expect(service.getSearchResults({ photos: [pexelsResult] })).toEqual([
    pexelsResult,
  ]));

test("gets popular items", () =>
  expect(service.getPopularResults({ photos: [pexelsResult] })).toEqual([
    pexelsResult,
  ]));

test("gets button HTML", () =>
  expect(minifyHTML(service.getButton(pexelsResult))).toBe(
    `<div class="result"><button aria-label="Anand Chowdhary" data-full-url="https://pexels.com/large.jpg" style="background-image: url('https://pexels.com/tiny.jpg')"></button><small class="author"><span>Anand Chowdhary</span></small></div>`
  ));
