import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class Tumblr extends MicrolinkBaseClass {
  name = "tumblr";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M187 0h46a128 128 0 01-110 128v55c0 35 28 46 46 46 13 0 33-6 46-17l-9 46c-23 11-48 17-59 17-57 0-110-43-110-110V128H0V82c46-17 69-57 75-82h46v69h69v41z" fill="#000" fill-rule="nonzero"/></svg>`;
  color = "#35465c";
  exampleURL =
    "https://explorius.tumblr.com/post/182508847649/thank-you-to-a-fantastic-2018-and-hello-to-a";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?tumblr\.com(\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?)/.test(
      input
    );
}
