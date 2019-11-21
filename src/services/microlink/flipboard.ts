import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class Flipboard extends MicrolinkBaseClass {
  name = "flipboard";
  icon = `<svg viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="nonzero"><path opacity=".8" d="M85 85h85v85H85z"/><path opacity=".9" d="M85 0h171v85H85z"/><path d="M0 0h85v256H0z"/></g></svg>`;
  color = "#e12828";
  exampleURL =
    "https://flipboard.com/@bbcfuture/how-climate-change-could-kill-the-red-apple/f-c8d499b4ca%2Fbbc.com";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?(flipboard|flip)\.(com|it)(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/.test(
      input
    );
}
