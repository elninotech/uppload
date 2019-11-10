import { UpploadService } from "../service";
import { translate } from "../helpers/i18n";
import { HandlersParams } from "./interfaces";
import { imageUrlToBlob } from "./http";

export class MicrolinkBaseClass extends UpploadService {
  loading = false;

  template = () => {
    return `
      <div class="microlink-container"><form class="${this.class("form")}">
        <input class="${this.class(
          "input"
        )}" type="url" placeholder="${translate(
      `services.${this.name}.placeholder`
    )}" required>
        <button type="submit" style="background: ${this.color}">${translate(
      `services.${this.name}.button`
    )}</button></form></div><div class="uppload-loader microlink-loader">
    <div></div>
    <p>${translate(`services.${this.name}.loading`) ||
      translate("fetching", translate(`services.${this.name}.title`))}</p>
  </div>`;
  };

  update() {
    const loader = document.querySelector(
      ".microlink-loader"
    ) as HTMLDivElement;
    const container = document.querySelector(
      ".microlink-container"
    ) as HTMLDivElement;
    if (container) container.style.display = this.loading ? "none" : "";
    if (loader) loader.style.display = this.loading ? "flex" : "none";
  }

  handlers = ({ next, handle }: HandlersParams) => {
    const form = document.querySelector(
      `.${this.class("form")}`
    ) as HTMLFormElement | null;
    if (form) {
      form.addEventListener("submit", event => {
        const input = document.querySelector(
          `.${this.class("input")}`
        ) as HTMLInputElement | null;
        if (input) {
          const url = input.value;
          this.loading = true;
          this.update();
          imageUrlToBlob(
            `https://api.microlink.io?url=${encodeURIComponent(
              url
            )}&screenshot=true&meta=false&embed=screenshot.url`
          )
            .then(blob => next(blob))
            .catch(error => handle(error))
            .finally(() => (this.loading = false));
        }
        event.preventDefault();
        return false;
      });
    }
  };
}
