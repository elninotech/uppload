import { SearchBaseClass } from "../../helpers/search";

export interface UnsplashResult {
  id: string;
  alt_description: string;
  color: string;
  created_at: string;
  description: string;
  height: number;
  width: number;
  likes: number;
  links: {
    download: string;
    download_location: string;
    html: string;
    self: string;
  };
  tags: {
    type: string;
    title: string;
  }[];
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    location: string;
    profile_image: {
      large: string;
      medium: string;
      small: string;
    };
    links: {
      followers: string;
      following: string;
      html: string;
      likes: string;
      photos: string;
      portfolio: string;
      self: string;
    };
  };
}

export default class Unsplash extends SearchBaseClass<UnsplashResult> {
  name = "unsplash";
  icon = `<svg viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="#000" fill-rule="nonzero" d="M208 44V0h-49l-2 5-22 35-7 9H49v66h44l5 5-49 89v47h49l2-5 24-42 4-6h80v-62h-44l-5-4z"/></svg>`;
  color = "#000000";
  poweredByUrl = "https://unsplash.com";
  popularEndpoint = `https://api.unsplash.com/photos?client_id=${this.apiKey}`;
  searchEndpoint = (query: string) =>
    `https://api.unsplash.com/search/photos?client_id=${
      this.apiKey
    }&page=1&query=${encodeURIComponent(query)}`;
  getButton = (image: UnsplashResult) => `<div class="result">
  <button aria-label="${image.alt_description}" data-full-url="${image.urls.regular}" style="background-image: url('${image.urls.thumb}')"></button>
  <small class="author">
    <img alt="" src="${image.user.profile_image.small}">
    <span>${image.user.name}</span>
  </small>
</div>`;
  getResults = (response: { results: UnsplashResult[] }) => response.results;
}
