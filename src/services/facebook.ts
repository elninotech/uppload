import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";
import { translate } from "../helpers/i18n";

export default class Facebook extends UpploadService {
  name = "facebook";
  icon = "fab fa-facebook";
  color = "#1b69f6";

  template = () => {
    return `
      <form class="${this.class("form")}">
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="Enter a URL">
        <button type="submit" style="background: ${
          this.color
        }"><i class="fas fa-file-import"></i>${translate(
      "services.facebook.button"
    )}</button>
      </form>
    `;
  };

  handlers = ({ next }: HandlersParams) => {};

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
