import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class LinkedIn extends MicrolinkBaseClass {
  name = "linkedin";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M58 214V94H14v120h44zM36 78a26 26 0 10-1-51c13 0 24 11 24 25A25 25 0 0136 78zM214 214h44V150c0-40-21-59-49-59-23 0-33 13-39 22h-1V94h-42v120h44v-59c0-20 4-39 28-39 24 0 25 22 25 40v58z" fill="#000" fill-rule="evenodd"/></svg>`;
  color = "#1082c7";
  exampleURL = "https://www.linkedin.com/in/anandchowdhary/";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?linkedin\.com(\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?)/.test(
      input
    );
}
