import { UpploadEffect } from "../../effect";
import {
  IHandlersParams,
  ITemplateParams,
  IUpploadFile,
} from "../../helpers/interfaces";
import {
  fitImageToContainer,
  safeListen,
  canvasToBlob,
} from "../../helpers/elements";

export default class Flip extends UpploadEffect {
  name = "flip";
  originalfileURL = "";
  originalFile: IUpploadFile = { blob: new Blob() };
  icon = `<svg aria-hidden="true" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M153 0v256h103L153 0zM0 256h103V0L0 256z" fill="#000" fill-rule="nonzero"/></svg>`;
  canvas: HTMLCanvasElement = document.createElement("canvas");

  template = ({ file, translate }: ITemplateParams) => {
    const image = URL.createObjectURL(file.blob);
    this.originalfileURL = image;
    this.originalFile = file;
    return `
      <div class="uppload-flip">
        <img style="width: 20px" alt="" src="${image}">
      </div>
      <div class="settings">
        <button class="flip-btn-horizontal">${translate(
          "effects.flip.buttons.horizontal"
        )}</button>
        <button class="flip-btn-vertical">${translate(
          "effects.flip.buttons.vertical"
        )}</button>
      </div>
    `;
  };

  imageToCanvasBlob(
    params: IHandlersParams,
    flipH = false,
    flipV = false
  ): Promise<Blob | null> {
    return new Promise(resolve => {
      params.uppload.emitter.emit("processing");
      const scaleH = flipH ? -1 : 1;
      const scaleV = flipV ? -1 : 1;
      this.canvas = document.createElement("canvas");
      const image = document.createElement("img");
      image.src = this.originalfileURL;
      image.onload = () => {
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        const posX = flipH ? image.width * -1 : 0;
        const posY = flipV ? image.height * -1 : 0;
        const context = this.canvas.getContext("2d");
        if (!context) return;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.scale(scaleH, scaleV);
        context.drawImage(image, posX, posY);
        canvasToBlob(this.canvas).then(blob => {
          const image = URL.createObjectURL(blob);
          this.originalfileURL = image;
          params.uppload.emitter.emit("process");
          return resolve(blob);
        });
      };
    });
  }

  update(params: IHandlersParams, x: boolean, y: boolean) {
    const img = params.uppload.container.querySelector(
      ".uppload-flip img"
    ) as HTMLImageElement | null;
    if (!img) return;
    this.imageToCanvasBlob(params, x, y).then(blob => {
      if (!blob) return;
      let file = this.originalFile;
      file.blob = blob;
      params.next(file);
      const image = URL.createObjectURL(blob);
      img.setAttribute("src", image);
    });
  }

  handlers = (params: IHandlersParams) => {
    const img = params.uppload.container.querySelector(
      ".uppload-flip img"
    ) as HTMLImageElement | null;
    if (img) {
      fitImageToContainer(params, img).then(() => {
        const horizontal = params.uppload.container.querySelector(
          ".settings button.flip-btn-horizontal"
        ) as HTMLButtonElement | null;
        if (horizontal)
          safeListen(
            horizontal,
            "click",
            this.update.bind(this, params, true, false)
          );
        const vertical = params.uppload.container.querySelector(
          ".settings button.flip-btn-vertical"
        ) as HTMLButtonElement | null;
        if (vertical)
          safeListen(
            vertical,
            "click",
            this.update.bind(this, params, false, true)
          );
      });
    }
  };
}
