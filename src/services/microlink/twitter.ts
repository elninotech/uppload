import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class Twitter extends MicrolinkBaseClass {
  name = "twitter";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M256 50c-9 4-20 7-30 8 11-7 19-17 23-30-10 6-21 10-33 13C206 30 193 24 178 24c-30 0-54 24-54 54 0 4 0 8 1 12C83 87 44 65 18 32c-4 7-7 16-7 25 0 19 9 35 24 45-9 0-17-3-24-7v1c0 26 19 48 43 53-4 1-9 2-14 2-3 0-7 0-10-1 7 21 26 37 49 37-18 14-41 23-66 23-4 0-8 0-12-1 23 15 50 23 79 23 94 0 146-78 146-146v-7c10-7 19-16 26-26z" fill="#000" fill-rule="nonzero"/></svg>`;
  color = "#1da1f2";
  exampleURL = "https://twitter.com/AnandChowdhary/status/1130815388839460864";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?(twitter|t)\.(com|co)(\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?)/.test(
      input
    );
}
