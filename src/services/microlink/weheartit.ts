import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class WeHeartIt extends MicrolinkBaseClass {
  name = "weheartit";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M128 239L54 165c-41-41-41-108 0-149s108-41 149 0c41 41 41 108 0 149l-74 74z" fill="#000" fill-rule="nonzero"/></svg>`;
  color = "#ff6771";
  exampleURL = "https://weheartit.com/entry/321668842";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?weheartit\.com(\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?)/.test(
      input
    );
}
