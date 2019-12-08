import { IHandlersParams, ITemplateParams } from "./helpers/interfaces";

export class UpploadEffect {
  type = "effect";
  name: string = "";
  invisible = false;
  noRecolor = false;
  color = "#000";
  icon: string = "";
  template: (props: ITemplateParams) => string = () => "";
  handlers: (params: IHandlersParams) => void = () => {};
  supports: () => boolean = () => true;
}
