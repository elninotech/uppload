import { IHandlersParams } from "./helpers/interfaces";
import { Uppload } from "./uppload";

export class UpploadService {
  type = "service";
  name: string = "";
  invisible = false;
  noRecolor = false;
  icon: string = "";
  color = "#333";
  template: (upploadInstance: Uppload) => string = () => "";
  handlers: (params: IHandlersParams) => void = () => {};
  stop: () => void = () => {};
  supports: () => boolean = () => true;
}
