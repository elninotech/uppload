import UpploadFilterBaseClass from "../../helpers/filter";

export default class Invert extends UpploadFilterBaseClass {
  name = "invert";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="nonzero"><path d="M214 145a100 100 0 010 10l-7 25 1-2c-3 7-8 15-13 21l2-2c-5 7-11 12-18 18l3-2c-7 5-14 9-22 12l3-1a98 98 0 01-22 7 101 101 0 01-23 0c-9-1-17-3-25-7l3 1c-8-3-15-7-22-12l3 2c-7-6-13-11-18-18l2 2c-5-6-10-14-13-21l1 2a98 98 0 01-6-21 102 102 0 010-24c1-8 3-17 6-25l-1 3c3-8 8-15 13-22l-2 3 15-17a657 657 0 0163-57h-17a1561 1561 0 0175 71c5 7 10 14 13 22l-1-3a100 100 0 017 35c0 7 6 13 12 12 6 0 12-5 12-12a112 112 0 00-38-83 676 676 0 00-50-48L137 3h-1c-2-2-5-3-8-3s-6 1-8 3a1704 1704 0 00-49 43c-9 9-19 18-27 29a118 118 0 00-19 30 109 109 0 005 90 111 111 0 0089 60 110 110 0 00119-110c0-6-6-12-12-12-7 1-12 6-12 12z"/><path d="M226 145c0 55-44 99-98 99V12s58 49 76 71c14 17 22 39 22 62z"/></g></svg>`;
  cssFilter = "invert";
  unit = "%";
  value = 0;
  max = 100;
}
