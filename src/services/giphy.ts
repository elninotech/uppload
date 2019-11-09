import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";
import { translate } from "../helpers/i18n";

export default class GIPHY extends UpploadService {
  name = "giphy";
  icon = "https://cdn.worldvectorlogo.com/logos/giphy-logo-1.svg";
  color = "#a800ff";

  template = () => {
    return `
      <form class="${this.class("form")}">
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="Enter a URL">
        <button type="submit" style="background: ${
          this.color
        }"><i class="fas fa-search"></i>${translate(
      "services.giphy.button"
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
