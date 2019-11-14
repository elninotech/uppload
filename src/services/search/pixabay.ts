import { SearchBaseClass } from "../../helpers/search";

export interface PixabayResult {
  id: number;
  largeImageURL: string;
  previewURL: string;
  user: string;
  userImageURL: string;
  pageURL: string;
  tags: string;
}

export default class Pixabay extends SearchBaseClass<PixabayResult> {
  constructor(apiKey: string) {
    super({
      apiKey,
      name: "pixabay",
      icon: `<svg viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M137 91c5 30-13 60-40 72-16 8-35 6-52 6H27v56H0V96a69 69 0 0169-65c33-1 65 26 68 60zm13-55l33 48h1l33-48h33l-46 68 52 71h-34l-38-52h-1l-38 52h-34l52-71-46-68h33zM33 80c-7 12-5 26-5 39v23h41c19 0 38-15 41-35 4-19-9-40-28-46-18-7-40 2-49 19z" fill="#000" fill-rule="nonzero"/></svg>`,
      color: "#2ec66d",
      poweredByUrl: "https://pixabay.com",
      popularEndpoint: (apiKey: string) =>
        `https://pixabay.com/api/?key=${apiKey}&per_page=18&image_type=photo`,
      searchEndpoint: (apiKey: string, query: string) =>
        `https://pixabay.com/api/?key=${apiKey}&per_page=18&q=${encodeURIComponent(
          query
        )}&image_type=photo`,
      getButton: (image: PixabayResult) => `<div class="result">
        <button aria-label="${image.tags}" data-full-url="${image.largeImageURL}" style="background-image: url('${image.previewURL}')"></button><small class="author">
        <img alt="" src="${image.userImageURL}">
        <span>${image.user}</span>
      </small></div>`,
      getSearchResults: (response: { hits: PixabayResult[] }) => response.hits,
      getPopularResults: (response: { hits: PixabayResult[] }) => response.hits
    });
  }
}
