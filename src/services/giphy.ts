import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";
import { cachedFetch, imageUrlToBlob } from "../helpers/http";
import { safeListen } from "../helpers/elements";
import { translate } from "../helpers/i18n";

let params: any | undefined = undefined;

export interface GiphyResult {
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

export default class Giphy extends UpploadService {
  name = "giphy";
  icon = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path fill="#000" d="M54 29h149v198H54z"/><path fill="#04FF8E" d="M24 22h30v212H24z"/><path fill="#8E2EFF" d="M203 80h30v154h-30z"/><path fill="#00C5FF" d="M24 227h209v29H24z"/><path fill="#FFF152" d="M24 0h119v29H24z"/><path fill="#FF5B5B" d="M203 59V29h-30V0h-30v88h90V59"/><path fill="#551C99" d="M203 117V88h30"/><path fill="#999131" d="M143 0v29h-29"/></g></svg>`;
  noRecolor = true;
  apiKey: string;
  color = "#a800ff";
  results: GiphyResult[] = [];
  loading = false;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
    cachedFetch<{ data: GiphyResult[] }>(
      `https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}&limit=18&rating=G`
    )
      .then(photos => {
        this.results = photos.data;
        this.update();
      })
      .catch(() => {});
  }

  getButton(image: GiphyResult) {
    return `<div class="result">
      <button aria-label="${image.title}" data-full-url="${image.images.downsized_large.url}" style="background-image: url('${image.images.preview_gif.url}')"></button></div>`;
  }

  updateImages() {
    const imagesContainer = document.querySelector(".giphy-images");
    if (imagesContainer) {
      imagesContainer.innerHTML = `
        ${this.results.map(result => this.getButton(result)).join("\n")}
      `;
    }
  }

  update() {
    this.updateImages();
    if (params) this.handlers(params);
    const loader = document.querySelector(".giphy-loader") as HTMLDivElement;
    const container = document.querySelector(
      ".giphy-container"
    ) as HTMLDivElement;
    if (container) container.style.display = this.loading ? "none" : "";
    if (loader) loader.style.display = this.loading ? "flex" : "none";
  }

  template = () => {
    return `
      <div class="giphy-container"><form class="${this.class("form")}">
      <label><span>${translate("services.giphy.label")}</span>
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="${translate(
      "services.giphy.placeholder"
    )}" required></label>
        <button type="submit" style="background: ${this.color}">${translate(
      "services.giphy.button"
    )}</button>
      </form>
      <div class="giphy-images"></div>
      <p class="giphy-footer">${translate(
        "imagesPoweredBy",
        `<a href="https://giphy.com">${translate("services.giphy.title")}</a>`
      )}</p></div>
      <div class="uppload-loader giphy-loader">
        <div></div>
        <p>${translate(
          "fetching",
          translate(`services.${this.name}.title`)
        )}</p>
      </div>
    `;
  };

  handlers = ({ next, handle }: HandlersParams) => {
    params = { next, handle };
    const form = document.querySelector(
      `.${this.class("form")}`
    ) as HTMLFormElement | null;
    if (form) {
      safeListen(form, "submit", event => {
        const input = document.querySelector(
          `.${this.class("input")}`
        ) as HTMLInputElement | null;
        if (input) {
          const query = input.value;
          cachedFetch<{ data: GiphyResult[] }>(
            `https://api.giphy.com/v1/gifs/search?api_key=${
              this.apiKey
            }&q=${encodeURIComponent(query)}&limit=18&offset=0&rating=G&lang=en`
          )
            .then(json => {
              this.results = json.data;
              this.update();
            })
            .catch(error => handle(error));
        }
        event.preventDefault();
        return false;
      });
    }
    this.updateImages();
    const imageButtons = document.querySelectorAll(
      ".uppload-service--giphy .giphy-images button"
    );
    imageButtons.forEach(image => {
      safeListen(image, "click", () => {
        const url = image.getAttribute("data-full-url");
        this.loading = true;
        this.update();
        if (url)
          imageUrlToBlob(url)
            .then(blob => next(blob))
            .catch(error => handle(error))
            .then(() => (this.loading = false));
      });
    });
  };
}
