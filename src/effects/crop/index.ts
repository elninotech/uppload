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

type CropNum = 1 | 2 | 3 | undefined;

export default class Crop extends UpploadEffect {
  name = "crop";
  icon = `<svg aria-hidden="true" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M74 0v182h134v-25h-26V74H99V48h96c4 0 7 1 9 4 3 2 4 5 4 9v121h48v26h-48v48h-26v-48H61a13 13 0 01-13-13V74H0V48h48V0h26z" fill="#000" fill-rule="nonzero"/></svg>`;
  aspectRatio = NaN;
  hideAspectRatioSettings = false;
  aspectRatioOptions = {
    free: NaN,
    square: 1,
    "16:9": 16 / 9,
  } as { [index: string]: number };
  autoCropArea: CropNum = 1;
  viewMode: CropNum = 1;
  originalFile: IUpploadFile = { blob: new Blob() };

  constructor({
    aspectRatio,
    aspectRatioOptions,
    hideAspectRatioSettings,
    autoCropArea,
    viewMode,
  }: {
    aspectRatio?: number;
    aspectRatioOptions?: { [index: string]: number };
    hideAspectRatioSettings?: boolean;
    autoCropArea?: CropNum;
    viewMode?: CropNum;
  } = {}) {
    super();
    if (aspectRatio) this.aspectRatio = aspectRatio;
    if (aspectRatioOptions) this.aspectRatioOptions = aspectRatioOptions;
    if (autoCropArea) this.autoCropArea = autoCropArea;
    if (viewMode) this.viewMode = viewMode;
    if (hideAspectRatioSettings)
      this.hideAspectRatioSettings = hideAspectRatioSettings;
  }

  template = ({ file, translate }: ITemplateParams) => {
    const image = URL.createObjectURL(file.blob);
    this.originalFile = file;
    return `
      <div class="uppload-cropping-element">
        <img style="width: 20px" alt="" src="${image}">
      </div>
      ${
        !this.aspectRatio && !this.hideAspectRatioSettings
          ? `<div class="uppload-actions">
        ${Object.keys(this.aspectRatioOptions)
          .map(
            (aspectRatio, index) => `
          <input value="${
            this.aspectRatioOptions[aspectRatio]
          }" data-name="${aspectRatio}" name="crop-aspect-ratio" type="radio"${
              !index ? " checked" : ""
            } id="crop-aspect-ratio-${aspectRatio}">
          <label for="crop-aspect-ratio-${aspectRatio}">${
              translate(`effects.crop.aspectRatios.${aspectRatio}`) ||
              aspectRatio
            }</label>`
          )
          .join("")}
      </div>`
          : ""
      }
    `;
  };

  handlers = (params: IHandlersParams) => {
    const cropperElement = params.uppload.container.querySelector(
      ".uppload-cropping-element img"
    ) as HTMLImageElement | null;
    const originalFile = this.originalFile;
    const type =
      originalFile.type &&
      ["image/jpeg", "image/webp"].indexOf(originalFile.type) !== -1
        ? originalFile.type
        : "image/png";
    if (cropperElement) {
      fitImageToContainer(params, cropperElement).then(() => {
        const cropper = new Cropper(cropperElement, {
          aspectRatio: this.aspectRatio,
          autoCropArea: this.autoCropArea,
          viewMode: this.viewMode,
          ready() {
            canvasToBlob(cropper.getCroppedCanvas(), type).then(blob => {
              originalFile.blob = blob;
              params.next(originalFile);
            });
          },
          cropend() {
            canvasToBlob(cropper.getCroppedCanvas(), type).then(blob => {
              originalFile.blob = blob;
              params.next(originalFile);
            });
          },
        });
        const aspectRatios = params.uppload.container.querySelectorAll(
          "input[name='crop-aspect-ratio']"
        );
        aspectRatios.forEach(aspectRatio => {
          safeListen(aspectRatio, "change", () => {
            const selectedAspectRatio = params.uppload.container.querySelector(
              "input[name='crop-aspect-ratio']:checked"
            );
            if (selectedAspectRatio) {
              cropper.setAspectRatio(
                this.aspectRatioOptions[
                  selectedAspectRatio.getAttribute("data-name") || "free"
                ]
              );
              canvasToBlob(cropper.getCroppedCanvas(), type).then(blob => {
                originalFile.blob = blob;
                params.next(originalFile);
              });
            }
          });
        });
      });
    }
  };
}
