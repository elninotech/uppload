import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";
import { cachedFetch, imageUrlToBlob } from "../helpers/http";
import { safeListen } from "../helpers/elements";
import { translate } from "../helpers/i18n";

let params: any | undefined = undefined;

export interface PexelsResult {
  url: string;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    tiny: string;
  };
}

export default class Pexels extends UpploadService {
  name = "pexels";
  icon = `<svg viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M21 0h-4v255l72 1h71v-35l1-35 4-1a97 97 0 0053-33 81 81 0 0013-22l7-22v-3-23-2l-1-3v-2a95 95 0 00-42-60l-3-3-13-6a98 98 0 00-30-6H21zm130 37a85 85 0 008 1l11 5a57 57 0 0131 62c-5 23-23 41-45 45l-20 1h-12v68H53v-91l1-91h97z" fill="#000" fill-rule="nonzero"/></svg>`;
  apiKey: string;
  color = "#05a081";
  results: PexelsResult[] = [];
  loading = false;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
    cachedFetch<{ photos: PexelsResult[] }>(
      `https://api.pexels.com/v1/curated?per_page=9&page=1`,
      {
        headers: {
          Authorization: this.apiKey
        }
      }
    )
      .then(photos => {
        this.results = photos.photos;
        this.update();
      })
      .catch(() => {});
  }

  getButton(image: PexelsResult) {
    return `<div class="result">
      <button aria-label="" data-full-url="${image.src.large2x}" style="background-image: url('${image.src.tiny}')"></button><small class="author">
      <span>${image.photographer}</span>
    </small></div>`;
  }

  updateImages() {
    const imagesContainer = document.querySelector(".pexels-images");
    if (imagesContainer) {
      imagesContainer.innerHTML = `
        ${this.results.map(result => this.getButton(result)).join("\n")}
      `;
    }
  }

  update() {
    this.updateImages();
    if (params) this.handlers(params);
    const loader = document.querySelector(".pexels-loader") as HTMLDivElement;
    const container = document.querySelector(
      ".pexels-container"
    ) as HTMLDivElement;
    if (container) container.style.display = this.loading ? "none" : "";
    if (loader) loader.style.display = this.loading ? "flex" : "none";
  }

  template = () => {
    return `
      <div class="pexels-container"><form class="${this.class("form")}">
      <label><span>${translate("services.pexels.label")}</span>
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="${translate(
      "services.pexels.placeholder"
    )}" required></label>
        <button type="submit" style="background: ${this.color}">${translate(
      "services.pexels.button"
    )}</button>
      </form>
      <div class="pexels-images"></div>
      <p class="pexels-footer">${translate(
        "imagesPoweredBy",
        `<a href="https://pexels.com">${translate("services.pexels.title")}</a>`
      )}</p></div>
      <div class="uppload-loader pexels-loader">
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
          cachedFetch<{ photos: PexelsResult[] }>(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(
              query
            )}&per_page=12&page=1`,
            {
              headers: {
                Authorization: this.apiKey
              }
            }
          )
            .then(json => {
              this.results = json.photos;
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
      ".uppload-service--pexels .pexels-images button"
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
