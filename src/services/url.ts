import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";
import { translate } from "../helpers/i18n";

export default class URL extends UpploadService {
  name = "url";
  icon = "fas fa-link";
  color = "#8e44ad";

  template = () => {
    return `
      <form class="${this.class("form")}">
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="Enter a URL">
        <button type="submit" style="background: ${
          this.color
        }"><i class="fas fa-file-import"></i>${translate(
      "services.url.button"
    )}</button>
      </form>
    `;
  };

  handlers = ({ upload, handle }: HandlersParams) => {};

  fetch(url: string) {
    return new Promise((resolve, reject) => {
      window
        .fetch("")
        .then(response => response.blob())
        .then(blob => resolve(blob))
        .catch(error => reject(error));
    });
  }
}
