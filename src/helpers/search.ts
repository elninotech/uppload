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
  poweredByUrl = "";
  popularEndpoint = "";
  searchEndpoint: (query: string) => string = () => "";
  getButton: (image: ImageResult) => string = () => "";
  getResults: (response: any) => ImageResult[] = () => [];

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
    console.log(this.getButton);
    cachedFetch<any>(this.popularEndpoint)
      .then(photos => {
        this.results = this.getResults(photos);
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
        "services.${this.name}.poweredBy",
        `<a href="https://search.com">${translate(
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
          cachedFetch<any>(this.searchEndpoint(query))
            .then(json => {
              this.results = this.getResults(json);
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
      ".uppload-service--search .search-images button"
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
