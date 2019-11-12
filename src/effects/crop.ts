import { UpploadEffect } from "../";
import Cropper from "cropperjs";

export default class Crop extends UpploadEffect {
  name = "crop";
  icon = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M74 0v182h134v-25h-26V74H99V48h96c4 0 7 1 9 4 3 2 4 5 4 9v121h48v26h-48v48h-26v-48H61a13 13 0 01-13-13V74H0V48h48V0h26z" fill="#000" fill-rule="nonzero"/></svg>`;

  template = (file: Blob) => {
    const image = URL.createObjectURL(file);
    return `
      <div class="uppload-cropping-element">
        <img style="width: 20px" alt="" src="${image}">
      </div>
    `;
  };

  handlers = () => {
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
            crop(event) {
              console.log("Got event", event);
            }
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
