import { UpploadEffect } from "..";
import { safeListen, fitImageToContainer } from "../helpers/elements";

export default class Hue extends UpploadEffect {
  name = "hue";
  icon = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M138 166v23h118v34H137l1 22h-34v-79h34zm-59 23v34H0v-34h79zm1-100v79H46l-1-23H0v-34h46V89h34zm176 22v34H103v-34h153zM210 11v22h46v34h-47l1 23h-34V11h34zm-57 22v34H0V33h153z" fill="#000" fill-rule="evenodd"/></svg>`;
  canvas: HTMLCanvasElement = document.createElement("canvas");
  originalfileURL = "";

  template = (file: Blob) => {
    const image = URL.createObjectURL(file);
    this.originalfileURL = image;
    return `
      <div class="uppload-hue-image">
        <img style="width: 20px" alt="" src="${image}">
      </div>
      <div class="settings">
        <input type="range" value="0" min="0" max="10">
        <span class="value"><span>0</span>%</span>
      </div>
    `;
  };

  imageToCanvasBlob(filters: string): Promise<Blob | null> {
    return new Promise(resolve => {
      this.canvas = document.createElement("canvas");
      const image = document.createElement("img");
      image.src = this.originalfileURL;
      this.canvas.width = image.width;
      this.canvas.height = image.height;
      const context = this.canvas.getContext("2d");
      if (!context) return;
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      context.filter = filters;
      context.drawImage(image, 0, 0);
      this.canvas.toBlob(blob => {
        if (blob) console.log(blob.size);
        resolve(blob);
      });
    });
  }

  handlers = () => {
    const hueElement = document.querySelector(
      ".uppload-hue-image img"
    ) as HTMLImageElement | null;
    if (hueElement) {
      fitImageToContainer(hueElement).then(() => {
        const range = document.querySelector(
          ".settings input[type='range']"
        ) as HTMLInputElement;
        if (range)
          safeListen(range, "change", () => {
            this.imageToCanvasBlob(`blur(${range.value}px)`).then(blob => {
              if (!blob) return;
              const image = URL.createObjectURL(blob);
              hueElement.setAttribute("src", image);
            });
          });
      });
    }
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
