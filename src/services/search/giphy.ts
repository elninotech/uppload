import { SearchBaseClass } from "../../helpers/search";

export interface GIPHYResult {
  id: string;
  title: string;
  url: string;
  images: {
    downsized_large: { url: string };
    preview_gif: { url: string };
  };
  user?: {
    avatar_url: string;
    display_name: string;
    profile_url: string;
  };
}

export default class GIPHY extends SearchBaseClass<GIPHYResult> {
  constructor(apiKey: string) {
    super({
      apiKey,
      name: "giphy",
      icon: `<svg aria-hidden="true" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path fill="#000" d="M54 29h149v198H54z"/><path fill="#04FF8E" d="M24 22h30v212H24z"/><path fill="#8E2EFF" d="M203 80h30v154h-30z"/><path fill="#00C5FF" d="M24 227h209v29H24z"/><path fill="#FFF152" d="M24 0h119v29H24z"/><path fill="#FF5B5B" d="M203 59V29h-30V0h-30v88h90V59"/><path fill="#551C99" d="M203 117V88h30"/><path fill="#999131" d="M143 0v29h-29"/></g></svg>`,
      color: "#a800ff",
      noRecolor: true,
      poweredByUrl: "https://giphy.com",
      popularEndpoint: (apiKey: string) =>
        `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=18&rating=G`,
      searchEndpoint: (apiKey: string, query: string) =>
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
          query
        )}&limit=18&offset=0&rating=G&lang=en`,
      getButton: (image: GIPHYResult) => `<div class="result">
        <button aria-label="${image.title}" data-full-url="${image.images.downsized_large.url}" style="background-image: url('${image.images.preview_gif.url}')"></button></div>`,
      getSearchResults: (response: { data: GIPHYResult[] }) => response.data,
      getPopularResults: (response: { data: GIPHYResult[] }) => response.data
    });
  }
}
