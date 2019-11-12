import { UpploadEffect } from "..";
import { safeListen, fitImageToContainer } from "../helpers/elements";

export default class Hue extends UpploadEffect {
  name = "hue";
  icon = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M138 166v23h118v34H137l1 22h-34v-79h34zm-59 23v34H0v-34h79zm1-100v79H46l-1-23H0v-34h46V89h34zm176 22v34H103v-34h153zM210 11v22h46v34h-47l1 23h-34V11h34zm-57 22v34H0V33h153z" fill="#000" fill-rule="evenodd"/></svg>`;

  template = (file: Blob) => {
    const image = URL.createObjectURL(file);
    return `
      <div class="uppload-hue-image">
        <img style="width: 20px" alt="" src="${image}">
      </div>
      <div class="settings">
        <input type="range">
        <span class="value"><span>0</span>%</span>
      </div>
    `;
  };

  imageToCanvasBlob(): Promise<Blob | null> {
    return new Promise(resolve => {
      const hueElement = document.querySelector(
        ".uppload-hue-image img"
      ) as HTMLImageElement | null;
      if (!hueElement) return;
      const size = hueElement.getBoundingClientRect();
      const canvas = document.createElement("canvas");
      canvas.setAttribute("height", size.height.toString());
      canvas.setAttribute("width", size.width.toString());
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(hueElement, 0, 0);
      // context.filter = "blur(20px)";
      canvas.toBlob(blob => resolve(blob));
    });
  }

  handlers = () => {
    const hueElement = document.querySelector(
      ".uppload-hue-image img"
    ) as HTMLImageElement | null;
    if (hueElement) {
      fitImageToContainer(hueElement).then(() => {
        setTimeout(() => {
          this.imageToCanvasBlob().then(blob => {
            if (!blob) return;
            const image = URL.createObjectURL(blob);
            hueElement.setAttribute("src", image);
          });
        }, 1000);
      });
    }
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
