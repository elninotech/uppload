import { UpploadEffect } from "..";
import {
  safeListen,
  fitImageToContainer,
  canvasToBlob
} from "../helpers/elements";
import { HandlersParams } from "./interfaces";
import { translate } from "./i18n";

export default class UpploadFilterBaseClass extends UpploadEffect {
  canvas: HTMLCanvasElement = document.createElement("canvas");
  originalfileURL = "";
  cssFilter = "";
  max = 10;
  unit = "px";
  value = 0;

  template = (file: Blob) => {
    const image = URL.createObjectURL(file);
    this.originalfileURL = image;
    return `
      <div class="uppload-hue-image">
        <img style="width: 20px" alt="" src="${image}">
      </div>
      <div class="settings">
        <input type="range" value="${this.value}" min="0" max="${this.max}">
        <span class="value"><span>0</span>${translate(`units.${this.unit}`) ||
          this.unit}</span>
      </div>
    `;
  };

  imageToCanvasBlob(filters: string): Promise<Blob | null> {
    return new Promise(resolve => {
      this.canvas = document.createElement("canvas");
      const image = document.createElement("img");
      image.src = this.originalfileURL;
      image.onload = () => {
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        const context = this.canvas.getContext("2d");
        if (!context) return;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.filter = filters;
        context.drawImage(image, 0, 0);
        canvasToBlob(this.canvas).then(blob => resolve(blob));
      };
    });
  }

  handlers = (params: HandlersParams) => {
    const hueElement = params.uppload.container.querySelector(
      ".uppload-hue-image img"
    ) as HTMLImageElement | null;
    if (hueElement) {
      fitImageToContainer(params, hueElement).then(() => {
        const range = params.uppload.container.querySelector(
          ".settings input[type='range']"
        ) as HTMLInputElement;
        if (range) safeListen(range, "change", this.update.bind(this, params));
      });
    }
  };

  update(params: HandlersParams) {
    let value = 0;
    const range = params.uppload.container.querySelector(
      ".settings input[type='range']"
    ) as HTMLInputElement;
    if (range) value = parseInt(range.value);
    const displayer = params.uppload.container.querySelector(
      ".settings .value span"
    );
    if (displayer) displayer.innerHTML = value.toString();
    const hueElement = params.uppload.container.querySelector(
      ".uppload-hue-image img"
    ) as HTMLImageElement | null;
    if (!hueElement) return;
    this.imageToCanvasBlob(
      `${this.cssFilter}(${range.value}${this.unit})`
    ).then(blob => {
      if (!blob) return;
      params.next(blob);
      const image = URL.createObjectURL(blob);
      hueElement.setAttribute("src", image);
    });
  }
}
