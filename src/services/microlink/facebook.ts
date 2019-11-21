import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class Facebook extends MicrolinkBaseClass {
  name = "facebook";
  icon = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M128 0c71 0 128 58 128 129 0 64-47 117-108 127v-89h30l6-38h-36v-24c0-10 5-20 21-20h16V53s-15-3-29-3c-29 0-48 18-48 50v29H75v37h1v1h32v89C47 246 1 194 0 131v-2C0 58 57 0 128 0z" fill="#000" fill-rule="nonzero"/></svg>`;
  color = "#1b69f6";
  exampleURL =
    "https://www.facebook.com/elninotech/photos/a.2066268863489861/2066268886823192/?type=3&theater";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?(facebook|fb)\.(com|me)(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/.test(
      input
    );
}
