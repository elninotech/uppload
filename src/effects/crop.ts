import { UpploadEffect } from "../";
import Cropper from "cropperjs";
import { HandlersParams } from "../helpers/interfaces";
import { safeListen } from "../helpers/elements";
import { translate } from "../helpers/i18n";

export default class Crop extends UpploadEffect {
  name = "crop";
  icon = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M74 0v182h134v-25h-26V74H99V48h96c4 0 7 1 9 4 3 2 4 5 4 9v121h48v26h-48v48h-26v-48H61a13 13 0 01-13-13V74H0V48h48V0h26z" fill="#000" fill-rule="nonzero"/></svg>`;
  aspectRatio = NaN;
  aspectRatioOptions = {
    free: NaN,
    square: 1,
    "16:9": 16 / 9
  } as { [index: string]: number };

  constructor({
    aspectRatio,
    aspectRatioOptions
  }: {
    aspectRatio?: number;
    aspectRatioOptions?: { [index: string]: number };
  }) {
    super();
    if (aspectRatio) this.aspectRatio = aspectRatio;
    if (aspectRatioOptions) this.aspectRatioOptions = aspectRatioOptions;
  }

  template = (file: Blob) => {
    const image = URL.createObjectURL(file);
    return `
      <div class="uppload-cropping-element">
        <img style="width: 20px" alt="" src="${image}">
      </div>
      <div class="actions">
        ${Object.keys(this.aspectRatioOptions)
          .map(
            (aspectRatio, index) => `
          <label>
            <input value="${
              this.aspectRatioOptions[aspectRatio]
            }" data-name="${aspectRatio}" name="crop-aspect-ratio" type="radio"${
              !index ? " checked" : ""
            }>
            <span>${translate(`effects.crop.aspectRatios.${aspectRatio}`) ||
              aspectRatio}</span>
          </label>
        `
          )
          .join("")}
        <button class="confirm-cropping">Done</button>
      </div>
    `;
  };

  handlers = ({ next }: HandlersParams) => {
    const cropperElement = document.querySelector(
      ".uppload-cropping-element img"
    ) as HTMLImageElement | null;
    if (cropperElement) {
      const parent = cropperElement.parentElement as HTMLElement;
      const currentDimensions = cropperElement.getBoundingClientRect();
      const dimensions = parent.getBoundingClientRect();
      if (currentDimensions.height < currentDimensions.width) {
        cropperElement.style.height = `${dimensions.height}px`;
        cropperElement.style.width = "auto";
      } else {
        cropperElement.style.width = `${dimensions.width}px`;
        cropperElement.style.height = "auto";
      }
      requestAnimationFrame(() => {
        const currentDimensions = cropperElement.getBoundingClientRect();
        if (currentDimensions.height > dimensions.height) {
          cropperElement.style.height = `${dimensions.height}px`;
          cropperElement.style.width = "auto";
        } else if (currentDimensions.width > dimensions.width) {
          cropperElement.style.width = `${dimensions.width}px`;
          cropperElement.style.height = "auto";
        }
        requestAnimationFrame(() => {
          const cropper = new Cropper(cropperElement, {
            aspectRatio: this.aspectRatio,
            autoCropArea: 1,
            viewMode: 1
          });
          const doneButton = document.querySelector(".confirm-cropping");
          if (doneButton)
            safeListen(doneButton, "click", () => {
              cropper.getCroppedCanvas().toBlob(
                result => {
                  if (!result) return;
                  next(result);
                  const image = URL.createObjectURL(result);
                  cropperElement.setAttribute("src", image);
                },
                "image/png",
                1
              );
            });
          const aspectRatios = document.querySelectorAll(
            "input[name='crop-aspect-ratio']"
          );
          aspectRatios.forEach(aspectRatio => {
            safeListen(aspectRatio, "change", () => {
              const selectedAspectRatio = document.querySelector(
                "input[name='crop-aspect-ratio']:checked"
              );
              if (selectedAspectRatio)
                cropper.setAspectRatio(
                  this.aspectRatioOptions[
                    selectedAspectRatio.getAttribute("data-name") || "free"
                  ]
                );
            });
          });
        });
      });
    }
  };
}
