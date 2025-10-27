import UpploadFilterBaseClass from "../../helpers/filter";

export default class Contrast extends UpploadFilterBaseClass {
  name = "contrast";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M128 0c35 0 66 13 90 38 25 25 38 55 38 90s-13 66-38 90c-24 25-55 38-90 38s-65-13-90-38c-25-24-38-55-38-90s13-65 38-90S93 0 128 0zm67 62a91 91 0 00-67-28v188c26 0 48-9 67-28 18-18 27-40 27-66s-9-48-27-66z" fill="#000" fill-rule="nonzero"/></svg>`;
  cssFilter = "contrast";
  unit = "%";
  value = 100;
  max = 200;
}
