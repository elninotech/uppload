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
          window.fetch(`https://images.weserv.nl/?url=scontent-iad3-1.cdninstagram.com%2Fvp%2Ff101d8b39d8d146769f71381999e3468%2F5D6F7AB9%2Ft51.2885-15%2Ffr%2Fe15%2Fs1080x1080%2F26867070_171196260320789_7698587573655961600_n.jpg%3F_nc_ht%3Dscontent-iad3-1.cdninstagram.com`)
            .then(response => response.blob())
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
