import { UpploadService } from "../service";
import { HandlersParams } from "../core";

export default class Instagram extends UpploadService {
  name = "instagram";

  template() {
    return `
      <form class="${this.class("form")}">
        <input class="${this.class("input")}" type="search" placeholder="Enter a URL">
        <button type="submit">Get image</button>
      </form>
    `;
  }

  handlers({ upload, handle }: HandlersParams) {
    const form = document.querySelector(`.${this.class("form")}`) as HTMLFormElement | null;
    if (form) {
      form.addEventListener("submit", event => {
        const input = document.querySelector(`.${this.class("input")}`) as HTMLInputElement | null;
        if (input) {
          const url = input.value;
          this.fetch(url)
            .then(blob => upload(blob))
            .catch(error => handle(error));
        }
        event.preventDefault();
        return false;
      });
    }
  }

  async fetch(url: string) {
    const image = await window.fetch("");
    const blob = await image.blob();
    return blob;
  }
}
