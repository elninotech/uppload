import UpploadFilterBaseClass from "../../helpers/filter";

export default class HueRotate extends UpploadFilterBaseClass {
  name = "hue-rotate";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M213 114c-30 0-69 0-76-87-2-17-13-27-30-27-22 0-48 14-68 36C13 65 2 102 6 141c6 62 66 115 129 115 64 0 116-52 116-115 0-26-18-27-38-27zM77 101a24 24 0 110-48 24 24 0 010 48zm-8 28a24 24 0 110 48 24 24 0 010-48zm83 74a24 24 0 11-48 0 24 24 0 0148 0zm68-40a24 24 0 11-47 0 24 24 0 0147 0z" fill="#000" fill-rule="nonzero"/></svg>`;
  cssFilter = "hue-rotate";
  unit = "deg";
  value = 0;
  max = 360;
}
