import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class Fotki extends MicrolinkBaseClass {
  name = "fotki";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M188 105c-2-10-8-16-17-18l4-1c15-4 20-13 17-28l-7-38c-3-17-13-20-21-20l-19 4-77 22c-5 2-12 4-16 11-3 6-2 14-1 19l53 183c3 11 10 17 20 17h4l28-8c12-3 18-13 16-24l-3-11-13-67 3-1 13-3c13-3 19-12 17-25l-1-12zm-29 28l-22 5-5 2 13 64 5 25c1 5-2 9-7 11l-17 4c-5 1-9-2-11-8l-14-51L63 52c-3-9-1-12 8-14l77-22c9-3 13 0 15 9l8 39c1 8-1 11-9 14l-43 12 5 18 30-6c7-1 10 2 12 9l1 10c1 7-1 11-8 12z" fill="#000" fill-rule="nonzero"/></svg>`;
  color = "#5471B9";
  exampleURL =
    "https://public.fotki.com/EricAnke/holland/molens/20170928-162510.html";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?fotki\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/.test(
      input
    );
}
