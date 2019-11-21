import UpploadFilterBaseClass from "../../helpers/filter";

export default class Blur extends UpploadFilterBaseClass {
  name = "blur";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M128 0l-7 7s-21 23-41 54c-21 31-42 70-42 105a90 90 0 00180 0c0-35-22-74-42-105-21-31-42-54-42-54l-6-7zm36 166h18c0 30-25 54-54 54v-18c20 0 36-16 36-36z" fill="#000" fill-rule="nonzero"/></svg>`;
  cssFilter = "blur";
  unit = "px";
}
