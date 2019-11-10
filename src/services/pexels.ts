import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";
import { cachedFetch, imageUrlToBlob } from "../helpers/http";
import { safeListen } from "../helpers/elements";
import { translate } from "../helpers/i18n";

let params: any | undefined = undefined;

export interface PixabayResult {
  id: number;
  largeImageURL: string;
  previewURL: string;
  user: string;
  userImageURL: string;
  pageURL: string;
  tags: string;
}

export default class Pexels extends UpploadService {
  name = "pexels";
  icon = `<svg viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M137 91c5 30-13 60-40 72-16 8-35 6-52 6H27v56H0V96a69 69 0 0169-65c33-1 65 26 68 60zm13-55l33 48h1l33-48h33l-46 68 52 71h-34l-38-52h-1l-38 52h-34l52-71-46-68h33zM33 80c-7 12-5 26-5 39v23h41c19 0 38-15 41-35 4-19-9-40-28-46-18-7-40 2-49 19z" fill="#000" fill-rule="nonzero"/></svg>`;
  apiKey: string;
  color = "#2ec66d";
  results: PixabayResult[] = [];
  loading = false;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
    cachedFetch<{ hits: PixabayResult[] }>(
      `https://pixabay.com/api/?key=${this.apiKey}&per_page=18&image_type=photo`
    )
      .then(photos => {
        this.results = photos.hits;
        this.update();
      })
      .catch(() => {});
  }

  getButton(image: PixabayResult) {
    return `<div class="result">
      <button aria-label="${image.tags}" data-full-url="${image.largeImageURL}" style="background-image: url('${image.previewURL}')"></button><small class="author">
      <img alt="" src="${image.userImageURL}">
      <span>${image.user}</span>
    </small></div>`;
  }

  updateImages() {
    const imagesContainer = document.querySelector(".pixabay-images");
    if (imagesContainer) {
      imagesContainer.innerHTML = `
        ${this.results.map(result => this.getButton(result)).join("\n")}
      `;
    }
  }

  update() {
    this.updateImages();
    if (params) this.handlers(params);
    const loader = document.querySelector(".pixabay-loader") as HTMLDivElement;
    const container = document.querySelector(
      ".pixabay-container"
    ) as HTMLDivElement;
    if (container) container.style.display = this.loading ? "none" : "";
    if (loader) loader.style.display = this.loading ? "flex" : "none";
  }

  template = () => {
    return `
      <div class="pixabay-container"><form class="${this.class("form")}">
      <label><span>${translate("services.pixabay.label")}</span>
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="${translate(
      "services.pixabay.placeholder"
    )}" required></label>
        <button type="submit" style="background: ${this.color}">${translate(
      "services.pixabay.button"
    )}</button>
      </form>
      <div class="pixabay-images"></div>
      <p class="pixabay-footer">${translate(
        "services.pixabay.poweredBy",
        `<a href="https://pixabay.com">${translate(
          "services.pixabay.title"
        )}</a>`
      )}</p></div>
      <div class="uppload-loader pixabay-loader">
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
          cachedFetch<{ hits: PixabayResult[] }>(
            `https://pixabay.com/api/?key=${
              this.apiKey
            }&per_page=18&q=${encodeURIComponent(query)}&image_type=photo`
          )
            .then(json => {
              this.results = json.hits;
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
      ".uppload-service--pixabay .pixabay-images button"
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
