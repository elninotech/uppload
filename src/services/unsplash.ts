import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";
import { cachedFetch, imageUrlToBlob } from "../helpers/http";
import { safeListen } from "../helpers/elements";

let params: any | undefined = undefined;

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

export default class Unsplash extends UpploadService {
  name = "unsplash";
  icon =
    "https://user-images.githubusercontent.com/5659117/53183813-c7a2f900-35da-11e9-8c41-b1e399dc3a6c.png";
  color = "#333333";
  apiKey: string;
  results: UnsplashResult[] = [];

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
    cachedFetch<UnsplashResult[]>(
      `https://api.unsplash.com/photos?client_id=${this.apiKey}`
    )
      .then(photos => {
        this.results = photos;
        this.update();
      })
      .catch(() => {});
  }

  getButton(image: UnsplashResult) {
    return `<div class="result">
      <button aria-label="${image.alt_description}" data-full-url="${image.urls.regular}" style="background-image: url('${image.urls.thumb}')"></button>
      <small class="author">
        <img alt="" src="${image.user.profile_image.small}">
        <span>${image.user.name}</span>
      </small>
    </div>`;
  }

  updateImages() {
    const imagesContainer = document.querySelector(".unsplash-images");
    if (imagesContainer) {
      imagesContainer.innerHTML = `
        ${this.results.map(result => this.getButton(result)).join("\n")}
      `;
    }
  }

  update() {
    this.updateImages();
    if (params) this.handlers(params);
  }

  template = () => {
    return `
      <form class="${this.class("form")}">
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="Find an image..." required>
        <button type="submit" style="background: ${
          this.color
        }">Search on Unsplash</button>
      </form>
      <div class="unsplash-images"></div>
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
          cachedFetch<{ results: UnsplashResult[] }>(
            `https://api.unsplash.com/search/photos?client_id=${
              this.apiKey
            }&page=1&query=${encodeURIComponent(query)}`
          )
            .then(json => {
              this.results = json.results;
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
      ".uppload-service--unsplash .unsplash-images button"
    );
    imageButtons.forEach(image => {
      safeListen(image, "click", () => {
        const url = image.getAttribute("data-full-url");
        if (url)
          imageUrlToBlob(url)
            .then(blob => next(blob))
            .catch(error => handle(error));
      });
    });
  };
}
