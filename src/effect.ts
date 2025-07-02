import { IHandlersParams, ITemplateParams } from "./helpers/interfaces";

export class UpploadEffect {
  type = "effect";
  name = "";
  invisible = false;
  noRecolor = false;
  color = "#000";
  icon = "";
  template: (props: ITemplateParams) => string = () => "";
  /** Base handler method - meant to be overridden by subclasses */
  handlers: (params: IHandlersParams) => void = () => {
    // Intentionally empty - base implementation
  };
  supports: () => boolean = () => true;
}
