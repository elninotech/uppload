import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class Reddit extends MicrolinkBaseClass {
  name = "reddit";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="128" fill="#fff" fill-rule="nonzero"/><path fill="#ff4500" fill-rule="nonzero" d="M217 155a23 23 0 00-31-9 127 127 0 00-61-18l11-53 37 8a17 17 0 1017-17 17 17 0 00-19 15l-40-9c-1 0-2 1-2 2l-13 59a128 128 0 00-63 18 23 23 0 00-31 32c0 8 4 15 9 19-1 4-1 7-1 11 0 57 66 102 148 102s148-46 148-102c0-4 0-8-1-11 6-4 10-12 10-20a23 23 0 00-38-17zm-89-71a17 17 0 1134 0 17 17 0 01-34 0zm-85 102c0-9 8-17 17-17s17 8 17 17-8 17-17 17-17-8-17-17zm153 34c-11 11-32 12-68 12s-57-1-68-12a10 10 0 0113-13c7 7 20 8 55 8s48-1 55-8a10 10 0 0113 13zm-2-17c-9 0-17-8-17-17s8-17 17-17 17 8 17 17-8 17-17 17z"/></svg>`;
  color = "#ff4500";
  exampleURL =
    "https://www.reddit.com/r/elonmusk/comments/96oy63/elons_new_profile_picture/";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?reddit\.com(\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?)/.test(
      input
    );
}
