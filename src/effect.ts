import { HandlersParams } from "./helpers/interfaces";

export class UpploadEffect {
  type = "effect";
  name: string = "";
  invisible = false;
  noRecolor = false;
  color = "#000";
  icon: string = "";
  template: (file: Blob) => string = () => "";
  handlers: (params: HandlersParams) => void = () => {};
  supports: () => boolean = () => true;
}
