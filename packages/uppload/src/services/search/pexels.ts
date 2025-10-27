import { SearchBaseClass } from "../../helpers/search";

export interface PexelsResult {
  url: string;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    tiny: string;
  };
}

export default class Pexels extends SearchBaseClass<PexelsResult> {
  constructor(apiKey: string) {
    super({
      apiKey,
      name: "pexels",
      icon: `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M21 0h-4v255l72 1h71v-35l1-35 4-1a97 97 0 0053-33 81 81 0 0013-22l7-22v-3-23-2l-1-3v-2a95 95 0 00-42-60l-3-3-13-6a98 98 0 00-30-6H21zm130 37a85 85 0 008 1l11 5a57 57 0 0131 62c-5 23-23 41-45 45l-20 1h-12v68H53v-91l1-91h97z" fill="#000" fill-rule="nonzero"/></svg>`,
      color: "#05a081",
      poweredByUrl: "https://pexels.com",
      popularEndpoint: (_apiKey: string) =>
        `https://api.pexels.com/v1/curated?per_page=9&page=1`,
      searchEndpoint: (_apiKey: string, query: string) =>
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          query
        )}&per_page=12&page=1`,
      getButton: (image: PexelsResult) => `<div class="result">
        <button aria-label="${image.photographer || ""}" data-full-url="${
        image.src.large2x
      }" style="background-image: url('${
        image.src.tiny
      }')"></button><small class="author">
        <span>${image.photographer}</span>
      </small></div>`,
      getSearchResults: (response: { photos: PexelsResult[] }) =>
        response.photos,
      getPopularResults: (response: { photos: PexelsResult[] }) =>
        response.photos,
      fetchSettings: (apiKey: string) => ({
        headers: {
          Authorization: apiKey,
        },
      }),
    });
  }
}
