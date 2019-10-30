import { UpploadService } from "../service";
import { HandlersParams } from "../core";

export default class Instagram extends UpploadService {
  name = "instagram";
  icon = "https://cdns.iconmonstr.com/wp-content/assets/preview/2016/240/iconmonstr-instagram-11.png";

  template = () => {
    return `
      <form class="${this.class("form")}">
        <input class="${this.class("input")}" type="search" placeholder="Enter a URL">
        <button type="submit">Get image</button>
      </form>
    `;
  }

  handlers = ({ upload, handle }: HandlersParams) => {
    const form = document.querySelector(`.${this.class("form")}`) as HTMLFormElement | null;
    if (form) {
      form.addEventListener("submit", event => {
        const input = document.querySelector(`.${this.class("input")}`) as HTMLInputElement | null;
        if (input) {
          const url = input.value;
          window.fetch(`https://images.weserv.nl/?url=${url}`)
            .then(response => {
              if (!response.ok) throw new Error("response_not_ok");
              return response.blob();
            })
            .then(blob => upload(blob))
            .catch(error => handle(error));
        }
        event.preventDefault();
        return false;
      });
    }
  }

  fetch(url: string) {
    return new Promise((resolve, reject) => {
      window.fetch("")
        .then(response => response.blob())
        .then(blob => resolve(blob))
        .catch(error => reject(error));
    })
  }
}
