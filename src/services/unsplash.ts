import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";
import { cachedFetch } from "../helpers/http";

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
};

export default class Unsplash extends UpploadService {
  name = "unsplash";
  icon =
    "https://user-images.githubusercontent.com/5659117/53183813-c7a2f900-35da-11e9-8c41-b1e399dc3a6c.png";
  color = "#e67e22";
  apiKey: string;
  results: UnsplashResult[] = [];

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
    cachedFetch<UnsplashResult[]>(`https://api.unsplash.com/photos?client_id=${this.apiKey}`)
      .then(photos => {
        this.results = photos;
      })
      .catch(() => {});
  }

  template = () => {
    return `
      <h1>Unsplash</h1>
      <form class="${this.class("form")}">
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="Enter a URL">
        <button type="submit">Get image</button>
      </form>
    `;
  };

  handlers = ({ upload, handle }: HandlersParams) => {
    const form = document.querySelector(
      `.${this.class("form")}`
    ) as HTMLFormElement | null;
    if (form) {
      form.addEventListener("submit", event => {
        const input = document.querySelector(
          `.${this.class("input")}`
        ) as HTMLInputElement | null;
        if (input) {
          const query = input.value;
          cachedFetch<{ results: UnsplashResult[] }>(`https://api.unsplash.com/search/photos?client_id=${this.apiKey}&page=1&query=${encodeURIComponent(query)}`)
            .then(json => {
              this.results = json.results;
            })
            .catch(error => handle(error));
        }
        event.preventDefault();
        return false;
      });
    }
  }
};
