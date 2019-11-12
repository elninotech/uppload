import UpploadFilterBaseClass from "../../helpers/filter";

export default class Saturate extends UpploadFilterBaseClass {
  name = "saturate";
  icon = `<svg viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M127 0a82 82 0 00-75 50l-1 2a81 81 0 00-3 10l-1 3-1 7v9a99 99 0 0181 4 99 99 0 0182-4v-8-1l-1-7-1-3a82 82 0 00-3-10l-1-2a82 82 0 00-76-50zM82 92c-12 0-23 3-33 7l-1 1c4 19 14 35 29 46 5-19 17-36 32-49-8-3-17-5-27-5zm91 0c-10 0-19 2-27 5 15 13 26 30 32 49 15-11 25-27 29-46l-1-1c-10-4-21-7-33-7zm-46 14a82 82 0 00-34 50 82 82 0 0069 0c-5-21-17-39-35-50zm-96 4a82 82 0 00-27 39l-1 2-2 9v5a83 83 0 00-1 17c4 39 35 70 74 74h8c9 0 18-2 26-5a100 100 0 01-35-85c-20-13-35-33-42-56zm192 0c-6 23-21 43-41 56v8c0 31-14 58-36 77a70 70 0 0035 5c39-4 69-35 73-74a82 82 0 000-17v-2-3l-2-9-1-2c-5-15-15-29-28-39zM91 175c0 28 14 52 35 66l1-1 2 1c21-14 34-38 35-66a99 99 0 01-73 0z" fill="#000" fill-rule="nonzero"/></svg>`;
  cssFilter = "saturate";
  unit = "%";
  value = 100;
  max = 200;
}
