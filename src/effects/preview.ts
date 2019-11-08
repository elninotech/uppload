import { UpploadEffect } from "../effect";

export default class Preview extends UpploadEffect {
  name = "preview";
  invisible = true;

  template = (file: Blob) => `
    <div>ok bye</div>
  `;
}
