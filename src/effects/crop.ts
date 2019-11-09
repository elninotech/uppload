import { UpploadEffect } from "../";
import { safeListen } from "../helpers/elements";
import { HandlersParams } from "../helpers/interfaces";

export default class Crop extends UpploadEffect {
  name = "crop";
  icon = "fas fa-crop";

  template = (file: Blob) => {
    return `
      <div>This is crop</div>
      <div class="settings">
        <input type="range">
        <span class="value"><span>0</span>%</span>
      </div>
    `;
  };

  handlers = () => {
    const range = document.querySelector(
      ".settings input[type='range']"
    ) as HTMLInputElement;
    if (range)
      safeListen(range, "change", () => {
        this.update();
      });
  };

  update() {
    console.log(new Date());
    let value = 0;
    const range = document.querySelector(
      ".settings input[type='range']"
    ) as HTMLInputElement;
    if (range) value = parseInt(range.value);
    const displayer = document.querySelector(".settings .value span");
    if (displayer) displayer.innerHTML = value.toString();
  }
}
