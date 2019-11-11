import { MicrolinkBaseClass } from "../helpers/microlink";

export default class Flickr extends MicrolinkBaseClass {
  name = "flickr";
  icon = `<svg viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path d="M117 128a59 59 0 11-118 0 59 59 0 01118 0z" fill="#0063DC"/><path d="M257 128a59 59 0 11-118 0 59 59 0 01118 0z" fill="#FF0084"/></g></svg>`;
  noRecolor = true;
  color = "#ff0084";
}
