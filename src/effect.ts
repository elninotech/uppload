import { HandlersParams } from "./helpers/interfaces";

export class UpploadEffect {
  type = "effect";
  name: string = "";
  invisible = false;
  icon: string = "";
  template: (file: Blob) => string = () => "";
  handlers: (params: HandlersParams) => void = () => {};
}
