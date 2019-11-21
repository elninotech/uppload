import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class LinkedIn extends MicrolinkBaseClass {
  name = "linkedin";
  icon = `<svg viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M19 256h218c10 0 19-8 19-18V18c0-10-8-18-19-18H19C9 0 0 8 0 18v220c0 10 8 18 19 18h218zM58 83c-13 0-21-9-21-20s8-20 22-20c13 0 21 9 21 20s-8 20-22 20zm80 131H99V99h39v16c5-8 14-19 34-19h1c25 0 44 17 44 52v66h-39v-62c0-15-5-26-19-26-11 0-17 7-20 14l-1 10v64zm-60 0H39V99h39v115zm60-99h-1 1z" fill="#000" fill-rule="nonzero"/></svg>`;
  color = "#0e76a8";
  exampleURL =
    "https://www.linkedin.com/posts/explorius-vastgoedontwikkeling-b-v-_el-nino-huurt-kantoor-in-enschede-activity-6480386878641180672-7DC_";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?linkedin\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/.test(
      input
    );
}
