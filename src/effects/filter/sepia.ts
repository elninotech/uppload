import UpploadFilterBaseClass from "../../helpers/filter";

export default class Sepia extends UpploadFilterBaseClass {
  name = "sepia";
  icon = `<svg viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M13 0h230c6 0 11 5 12 11v233c0 7-5 12-11 12H13c-7 0-12-5-12-11V12C1 5 6 0 12 0h231zm219 23H24v160h208V23zM110 72l31 42c2 2 5 2 7 1v-1l13-12c2-2 5-2 7 0v1l35 50c3 3 1 7-3 7H55c-4 0-6-4-4-7l51-81c2-2 6-3 8 0zm65-26a18 18 0 110 36 18 18 0 010-36z" fill="#000" fill-rule="nonzero"/></svg>`;
  cssFilter = "sepia";
  unit = "%";
  value = 0;
  max = 100;
}
