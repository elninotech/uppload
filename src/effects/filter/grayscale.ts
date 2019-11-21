import UpploadFilterBaseClass from "../../helpers/filter";

export default class Grayscale extends UpploadFilterBaseClass {
  name = "grayscale";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M181 196l30 30c-20 17-44 27-71 30h-1v-43c15-2 30-8 42-17zm-105-1c11 9 25 16 40 18h1v43c-27-2-52-13-71-29l-1-1 31-31zm138-56h42c-2 27-13 52-29 71l-1 1-30-30c9-12 16-27 18-42zm-170 0c1 15 7 29 16 41h1l-31 31c-17-20-28-44-30-71v-1h44zM210 8a27 27 0 0138 38l-38 37 10 10c5 5 5 13 0 18l-1 1c-5 5-13 4-18-1l-10-9-47 47c-5 5-15 9-22 10h-6l-17-2-2-17v-6c0-7 5-17 10-23l47-47-10-9c-5-5-5-14 0-19h1c5-5 13-5 18 0l10 10zm-47 66l-47 47c-3 3-5 9-6 13v1l11 10c4 0 11-3 14-5l47-47-19-19zM30 45l31 31c-9 11-15 25-17 40v1H0c2-27 13-52 30-72zm87-45v43c-15 2-29 8-41 17v1L45 30C65 13 90 2 117 0z" fill="#000" fill-rule="nonzero"/></svg>`;
  cssFilter = "grayscale";
  unit = "%";
  value = 0;
  max = 100;
}
