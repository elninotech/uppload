import { UpploadEffect } from "../../effect";
import Cropper from "cropperjs";
import {
  IHandlersParams,
  ITemplateParams,
  IUpploadFile,
} from "../../helpers/interfaces";
import {
  safeListen,
  fitImageToContainer,
  canvasToBlob,
} from "../../helpers/elements";

export default class Rotate extends UpploadEffect {
  name = "rotate";
  icon = `<svg aria-hidden="true" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M139 37a110 110 0 014 218v-37a73 73 0 00-4-144v36L66 55l73-55v37zM61 234c15 11 33 18 52 21v-37c-9-2-18-6-25-11l-27 27zm-20-21c-12-15-19-33-22-52h37c2 9 6 18 11 26l-26 26zM40 81c-11 14-19 32-21 51h37c2-11 7-21 13-29L40 81z" fill="#000" fill-rule="nonzero"/></svg>`;
  value = 0;
  max = 360;
  unit = "deg";
  originalFile: IUpploadFile = { blob: new Blob() };

  template = ({ file, translate }: ITemplateParams) => {
    const image = URL.createObjectURL(file.blob);
    this.originalFile = file;
    return `
      <div class="uppload-rotating-element">
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

  handlers = (params: IHandlersParams) => {
    const rotatorElement = params.uppload.container.querySelector(
      ".uppload-rotating-element img"
    ) as HTMLImageElement | null;
    const originalFile = this.originalFile;
    if (rotatorElement) {
      fitImageToContainer(params, rotatorElement).then(() => {
        const rotator = new Cropper(rotatorElement, {
          autoCropArea: 1,
          viewMode: 1,
          dragMode: "none",
          cropBoxMovable: false,
          cropBoxResizable: false,
          toggleDragModeOnDblclick: false,
          ready() {
            params.uppload.emitter.emit("processing");
            canvasToBlob(rotator.getCroppedCanvas()).then(blob => {
              originalFile.blob = blob;
              params.uppload.emitter.emit("process");
              params.next(originalFile);
            });
          },
        });
        const range = params.uppload.container.querySelector(
          ".settings input[type='range']"
        ) as HTMLInputElement;
        if (range)
          safeListen(range, "change", () => {
            let value = 0;
            const range = params.uppload.container.querySelector(
              ".settings input[type='range']"
            ) as HTMLInputElement;
            if (range) value = parseInt(range.value);
            const displayer = params.uppload.container.querySelector(
              ".settings .value span"
            );
            if (displayer) displayer.innerHTML = value.toString();
            rotator.rotate(value - this.value);
            this.value = value;
            params.uppload.emitter.emit("processing");
            canvasToBlob(rotator.getCroppedCanvas()).then(blob => {
              originalFile.blob = blob;
              params.uppload.emitter.emit("process");
              params.next(originalFile);
            });
          });
      });
    }
  };
}
