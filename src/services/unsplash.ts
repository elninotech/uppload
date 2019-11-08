import { UpploadService } from "../service";
import { HandlersParams } from "../helpers/interfaces";

export default class Unsplash extends UpploadService {
  name = "unsplash";
  icon =
    "https://user-images.githubusercontent.com/5659117/53183813-c7a2f900-35da-11e9-8c41-b1e399dc3a6c.png";
  color = "#e67e22";

  template = () => {
    return `
      <form class="${this.class("form")}">
        <input class="${this.class(
          "input"
        )}" type="search" placeholder="Enter a URL">
        <button type="submit">Get image</button>
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
