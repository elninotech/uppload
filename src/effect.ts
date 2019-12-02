import { HandlersParams, TemplateParams } from "./helpers/interfaces";

export class UpploadEffect {
  type = "effect";
  name: string = "";
  invisible = false;
  noRecolor = false;
  color = "#000";
  icon: string = "";
  template: (props: TemplateParams) => string = () => "";
  handlers: (params: HandlersParams) => void = () => {};
  supports: () => boolean = () => true;
}
