import { Uppload } from "./";

export interface UpploadWindow extends Window {
  Uppload: typeof Uppload;
}
declare let window: UpploadWindow;

window.Uppload = Uppload;
