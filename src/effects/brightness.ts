import { UpploadEffect } from "../";
import { safeListen } from "../helpers/elements";

export default class Brightness extends UpploadEffect {
  name = "brightness";
  icon = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M128 0l37 37h54v54l37 37-37 37v54h-54l-37 37-37-37H37v-54L0 128l37-37V37h54l37-37zm0 53a75 75 0 100 150 75 75 0 000-150zm0 21a54 54 0 110 108 54 54 0 010-108z" fill="#000" fill-rule="nonzero"/></svg>`;

  template = (file: Blob) => {
    return `
      <div>This is brightness</div>
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
