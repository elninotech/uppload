import { IHandlersParams, IServiceTemplateParams } from "./helpers/interfaces";

export class UpploadService {
  type = "service";
  name: string = "";
  invisible = false;
  noRecolor = false;
  icon: string = "";
  color = "#333";
  template: (params: IServiceTemplateParams) => string = () => "";
  handlers: (params: IHandlersParams) => void = () => {};
  stop: () => void = () => {};
  supports: () => boolean = () => true;
}
