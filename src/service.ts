import { IHandlersParams, IServiceTemplateParams } from "./helpers/interfaces";

export class UpploadService {
  type = "service";
  name = "";
  invisible = false;
  noRecolor = false;
  icon = "";
  color = "#333";
  template: (params: IServiceTemplateParams) => string = () => "";
  /** Base handler method - meant to be overridden by subclasses */
  handlers: (params: IHandlersParams) => void = () => {
    // Intentionally empty - base implementation
  };
  /** Base stop method - meant to be overridden by subclasses */
  stop: () => void = () => {
    // Intentionally empty - base implementation
  };
  supports: () => boolean = () => true;
}
