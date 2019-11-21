import { MicrolinkBaseClass } from "../../helpers/microlink";

export default class DeviantArt extends MicrolinkBaseClass {
  name = "deviantart";
  icon = `<svg aria-hidden="true" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="#000" fill-rule="nonzero" d="M208 44V0h-49l-2 5-22 35-7 9H49v66h44l5 5-49 89v47h49l2-5 24-42 4-6h80v-62h-44l-5-4z"/></svg>`;
  color = "#00d159";
  exampleURL =
    "https://www.deviantart.com/artbycatherineradley/art/Despair-820869682";
  validator = (input: string) =>
    /(https?:\/\/(.+?\.)?(deviantart|fav)\.(com|me)(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/.test(
      input
    );
}
