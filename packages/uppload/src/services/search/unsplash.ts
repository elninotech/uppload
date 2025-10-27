import { SearchBaseClass } from "../../helpers/search";

export interface UnsplashResult {
  id: string;
  alt_description: string;
  description: string;
  // color: string;
  urls: {
    regular: string;
    thumb: string;
  };
  user: {
    name: string;
    profile_image: {
      small: string;
    };
  };
}

export default class Unsplash extends SearchBaseClass<UnsplashResult> {
  constructor(apiKey: string) {
    super({
      apiKey,
      name: "unsplash",
      icon: `<svg aria-hidden="true" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M81 113v72h94v-72h81v143H0V113h81zM175 0v71H81V0h94z" fill="#000" fill-rule="evenodd"/></svg>`,
      color: "#333",
      poweredByUrl: "https://unsplash.com",
      popularEndpoint: (apiKey: string) =>
        `https://api.unsplash.com/photos?client_id=${apiKey}`,
      searchEndpoint: (apiKey: string, query: string) =>
        `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=1&query=${encodeURIComponent(
          query
        )}`,
      getButton: (image: UnsplashResult) => `<div class="result">
        <button aria-label="${
          image.alt_description || image.description
        }" data-full-url="${
        image.urls.regular
      }" style="background-image: url('${image.urls.thumb}')"></button>
        <small class="author">
          <img alt="" src="${image.user.profile_image.small}">
          <span>${image.user.name}</span>
        </small>
      </div>`,
      getSearchResults: (response: { results: UnsplashResult[] }) =>
        response.results,
      getPopularResults: (response: UnsplashResult[]) => response,
    });
  }
}
