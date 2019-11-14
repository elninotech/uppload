import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";
import { cachedFetch, imageUrlToBlob } from "../helpers/http";
import { safeListen } from "../helpers/elements";
import { translate } from "../helpers/i18n";
import { colorSVG } from "./assets";

let params: any | undefined = undefined;

export class SearchBaseClass<ImageResult = any> extends UpploadService {
  apiKey: string;
  results: ImageResult[] = [];
  loading = false;
  poweredByUrl: string;
  popularEndpoint: string;
  searchEndpoint: (apiKey: string, query: string) => string;
  getButton: (image: ImageResult) => string;
  getPopularResults: (response: any) => ImageResult[];
  getSearchResults: (response: any) => ImageResult[];

  constructor({
    apiKey,
    name,
    icon,
    color,
    poweredByUrl,
    popularEndpoint,
    searchEndpoint,
    getButton,
    getPopularResults,
    getSearchResults
  }: {
    name: string;
    icon: string;
    color: string;
    apiKey: string;
    poweredByUrl: string;
    popularEndpoint: (apiKey: string) => string;
    searchEndpoint: (apiKey: string, query: string) => string;
    getButton: (image: ImageResult) => string;
    getPopularResults: (response: any) => ImageResult[];
    getSearchResults: (response: any) => ImageResult[];
  }) {
    super();
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.apiKey = apiKey;
    this.poweredByUrl = poweredByUrl;
    this.popularEndpoint = popularEndpoint(this.apiKey);
    this.searchEndpoint = searchEndpoint;
    this.getButton = getButton;
    this.getPopularResults = getPopularResults;
    this.getSearchResults = getSearchResults;
    if (this.popularEndpoint)
      cachedFetch<any>(this.popularEndpoint)
        .then(photos => {
          this.results = this.getPopularResults(photos);
          this.update();
        })
        .catch(() => {});
  }

  updateImages() {
    const imagesContainer = document.querySelector(".search-images");
    if (imagesContainer) {
      imagesContainer.innerHTML = `
        ${this.results.map(result => this.getButton(result)).join("\n")}
      `;
    }
  }

  update() {
    this.updateImages();
    if (params) this.handlers(params);
    const loader = document.querySelector(".search-loader") as HTMLDivElement;
    const container = document.querySelector(
      ".search-container"
    ) as HTMLDivElement;
    if (container) container.style.display = this.loading ? "none" : "";
    if (loader) loader.style.display = this.loading ? "flex" : "none";
  }

  template = (): string => {
    return `
      <div class="search-container"><form class="${this.class("form")}">
      <div class="service-icon">${colorSVG(this.icon, this)}</div>
      <label><span>${translate(`services.${this.name}.label`)}</span>
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="${translate(
      `services.${this.name}.placeholder`
    )}" required></label>
        <button type="submit" style="background: ${this.color}">${translate(
      `services.${this.name}.button`
    )}</button>
      </form>
      <div class="search-images"></div>
      <p class="search-footer">${translate(
        "imagesPoweredBy",
        `<a href="${this.poweredByUrl}" target="_blank">${translate(
          `services.${this.name}.title`
        )}</a>`
      )}</p></div>
      <div class="uppload-loader search-loader">
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
          cachedFetch<any>(this.searchEndpoint(this.apiKey, query))
            .then(json => {
              this.results = this.getSearchResults(json);
              this.update();
            })
            .catch(error => handle(error));
        }
        event.preventDefault();
        return false;
      });
    }
    this.updateImages();
    const imageButtons = document.querySelectorAll(".search-images button");
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
