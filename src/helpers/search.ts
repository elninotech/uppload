import { UpploadService } from "../service";
import {
  IHandlersParams,
  IServiceTemplateParams,
  IUpploadFile,
} from "./interfaces";
import { cachedFetch, imageUrlToBlob } from "./http";
import { safeListen } from "./elements";
import { colorSVG } from "./assets";
import { blobToUpploadFile } from "./files";

const generateFileName = (
  file: IUpploadFile,
  service: string,
  query?: string | null
) => {
  file.name = `${query || `${service}-import`}-${Math.random()
    .toString(36)
    .slice(2)}.jpg`;
  file.type = "image/jpeg";
  return file;
};

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
  noRecolor = false;
  fetchSettings?: RequestInit;

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
    getSearchResults,
    noRecolor,
    fetchSettings,
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
    noRecolor?: boolean;
    fetchSettings?: (apiKey: string) => RequestInit;
  }) {
    super();
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.apiKey = apiKey;
    this.noRecolor = !!noRecolor;
    this.poweredByUrl = poweredByUrl;
    this.popularEndpoint = popularEndpoint(this.apiKey);
    this.searchEndpoint = searchEndpoint;
    this.getButton = getButton;
    this.getPopularResults = getPopularResults;
    this.getSearchResults = getSearchResults;
    if (fetchSettings) this.fetchSettings = fetchSettings(this.apiKey);
    if (this.popularEndpoint)
      cachedFetch<any>(this.popularEndpoint, this.fetchSettings)
        .then(photos => {
          this.results = this.getPopularResults(photos);
        })
        .catch(() => {});
  }

  updateImages(params: IHandlersParams) {
    const imagesContainer =
      params.uppload.container.querySelector(".search-images");
    if (imagesContainer) {
      imagesContainer.innerHTML = `
        ${this.results.map(result => this.getButton(result)).join("\n")}
      `;
    }
  }

  update(params: IHandlersParams) {
    this.updateImages(params);
    if (params) this.handlers(params);
    const loader = params.uppload.container.querySelector(
      ".search-loader"
    ) as HTMLDivElement;
    const container = params.uppload.container.querySelector(
      ".search-container"
    ) as HTMLDivElement;
    if (container) container.style.display = this.loading ? "none" : "";
    if (loader) loader.style.display = this.loading ? "flex" : "none";
  }

  template = ({ translate }: IServiceTemplateParams): string => {
    return `
      <div class="search-container"><form class="search-search-form">
      <div class="service-icon">${colorSVG(this.icon, this)}</div>
      <label><span>${
        translate(`services.${this.name}.label`) ||
        translate("services.search.label")
      }</span>
        <input class="search-search-input" type="search" placeholder="${translate(
          `services.search.placeholder`
        )}" required></label>
        <button type="submit" style="background: ${this.color}">${translate(
      `services.search.button`,
      translate(`services.${this.name}.title`)
    )}</button>
      </form>
      <div class="search-images"></div>
      <p class="search-footer">${translate(
        "services.search.imagesPoweredBy",
        `<a href="${this.poweredByUrl}" target="_blank">${translate(
          `services.${this.name}.title`
        )}</a>`
      )}</p></div>
      <button class="need-help-link"><span>${translate(
        "needHelp"
      )}</span aria-hidden="true"><span>?</span></button>
      <div class="uppload-loader search-loader">
        <div></div>
        <p>${translate(
          "fetching",
          translate(`services.${this.name}.title`)
        )}</p>
      </div>
    `;
  };

  handlers = (params: IHandlersParams) => {
    const form = params.uppload.container.querySelector(
      `.search-search-form`
    ) as HTMLFormElement | null;
    if (form) {
      safeListen(form, "submit", event => {
        const input = params.uppload.container.querySelector(
          `.search-search-input`
        ) as HTMLInputElement | null;
        if (input) {
          const query = input.value;
          cachedFetch<any>(
            this.searchEndpoint(this.apiKey, query),
            this.fetchSettings
          )
            .then(json => {
              this.results = this.getSearchResults(json);
              this.update(params);
            })
            .catch(() => params.handle(new Error("errors.unable_to_search")));
        }
        event.preventDefault();
        return false;
      });
    }
    this.updateImages(params);
    const imageButtons = params.uppload.container.querySelectorAll(
      ".search-images button"
    );
    imageButtons.forEach(image => {
      safeListen(image, "click", () => {
        const url = image.getAttribute("data-full-url");
        this.loading = true;
        this.update(params);
        if (url)
          imageUrlToBlob(url)
            .then(blob =>
              params.next(
                generateFileName(
                  blobToUpploadFile(blob),
                  this.name,
                  image.getAttribute("aria-label")
                )
              )
            )
            .catch(() => params.handle("errors.response_not_ok"))
            .then(() => (this.loading = false));
      });
    });
    const helpButton =
      params.uppload.container.querySelector(".need-help-link");
    if (helpButton)
      safeListen(helpButton, "click", () =>
        params.showHelp(`/services/search/${this.name}`)
      );
  };
}
