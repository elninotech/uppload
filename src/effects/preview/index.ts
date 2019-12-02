import { UpploadEffect } from "../..";
import { fitImageToContainer } from "../../helpers/elements";
import { HandlersParams } from "../../helpers/interfaces";

export default class Preview extends UpploadEffect {
  name = "preview";
  icon = `<svg aria-hidden="true" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 18)" fill="#000" fill-rule="nonzero"><path d="M244 40h-29V10c0-6-5-10-10-10H10C4 0 0 4 0 10v160c0 5 4 10 10 10h29v30c0 6 4 10 9 10h195c6 0 10-4 10-10V50c0-5-4-10-9-10zm-10 136l-40-45c-4-5-11-5-15 0l-17 19-38-45c-4-5-13-5-17 0l-49 58V60h176v116zM19 160V20h176v20H49c-6 0-10 5-10 10v110H19z"/><ellipse cx="202.5" cy="94" rx="15.5" ry="16"/></g></svg>`;

  template = (file: Blob) => {
    const image = URL.createObjectURL(file);
    return `
      <div class="uppload-preview-element">
        <img style="width: 20px" alt="" src="${image}">
      </div>
    `;
  };

  handlers = (params: HandlersParams) => {
    const image = params.uppload.container.querySelector(
      ".uppload-preview-element img"
    ) as HTMLImageElement | null;
    if (image) fitImageToContainer(params, image);
  };
}
