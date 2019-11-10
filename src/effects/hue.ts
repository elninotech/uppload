import { UpploadEffect } from "..";
import { safeListen } from "../helpers/elements";

export default class Hue extends UpploadEffect {
  name = "hue";
  icon = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M138 166v23h118v34H137l1 22h-34v-79h34zm-59 23v34H0v-34h79zm1-100v79H46l-1-23H0v-34h46V89h34zm176 22v34H103v-34h153zM210 11v22h46v34h-47l1 23h-34V11h34zm-57 22v34H0V33h153z" fill="#000" fill-rule="evenodd"/></svg>`;

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
