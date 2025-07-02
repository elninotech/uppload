import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class Pinterest extends MicrolinkBaseClass {
  name = "pinterest";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M128 0C81 0 44 37 44 89c0 30 11 49 28 49 7 0 11-19 11-19s-3-12-3-29c0-22 18-42 42-42 32 0 48 23 48 54 0 38-17 65-41 65-13 0-23-11-20-24 4-15 12-32 12-43 0-10-5-18-16-18-13 0-23 13-23 31 0 11 4 19 4 19s-13 55-15 65c-5 20-1 45-1 48 0 2 3 2 4 1 2-2 23-28 29-47 2-5 10-39 10-39 5 10 20 18 36 18 47 0 79-43 79-100C212 38 174 0 128 0z" fill="#000" fill-rule="nonzero"/></svg>`;
  color = "#e12828";
  exampleURL = "https://www.pinterest.com/pin/526147168097149894/";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?pinterest\.com(\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?)/.test(
      input
    );
}
