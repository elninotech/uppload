import { HandlersParams } from "./helpers/interfaces";

export class UpploadEffect {
  type = "effect";
  name: string = "";
  invisible = false;
  icon: string = "";
  template: () => string = () => "";
  handlers: (params: HandlersParams) => void = () => {};
}
