import { Uppload } from "./index";

export interface UpploadWindow extends Window {
  Uppload: typeof Uppload;
}
declare let window: UpploadWindow;

window.Uppload = Uppload;
