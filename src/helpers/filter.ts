import { UpploadEffect } from "../effect";
import {
  safeListen,
  fitImageToContainer,
  canvasToBlob,
} from "../helpers/elements";
import { IHandlersParams, ITemplateParams, IUpploadFile } from "./interfaces";

export default class UpploadFilterBaseClass extends UpploadEffect {
  canvas: HTMLCanvasElement = document.createElement("canvas");
  originalfileURL = "";
  originalFile: IUpploadFile = { blob: new Blob() };
  cssFilter = "";
  max = 10;
  unit = "px";
  value = 0;
  supports = () =>
    !!(
      this.canvas.getContext &&
      this.canvas.getContext("2d") &&
      typeof this.canvas.getContext("2d")?.filter === "string"
    );

  template = ({ file, translate }: ITemplateParams) => {
    const image = URL.createObjectURL(file.blob);
    this.originalfileURL = image;
    this.originalFile = file;
    return `
      <div class="uppload-hue-image">
        <img style="width: 20px" alt="" src="${image}">
      </div>
      <div class="settings">
        <input type="range" value="${this.value}" min="0" max="${this.max}">
        <span class="value"><span>0</span>${
          translate(`units.${this.unit}`) || this.unit
        }</span>
      </div>
    `;
  };

  imageToCanvasBlob(
    params: IHandlersParams,
    filters: string
  ): Promise<Blob | null> {
    params.uppload.emitter.emit("processing");
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
        canvasToBlob(this.canvas).then(blob => {
          params.uppload.emitter.emit("process");
          return resolve(blob);
        });
      };
    });
  }

  handlers = (params: IHandlersParams) => {
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

  update(params: IHandlersParams) {
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
      params,
      `${this.cssFilter}(${range.value}${this.unit})`
    ).then(blob => {
      if (!blob) return;
      this.originalFile.blob = blob;
      params.next(this.originalFile);
      const image = URL.createObjectURL(blob);
      hueElement.setAttribute("src", image);
    });
  }
}
