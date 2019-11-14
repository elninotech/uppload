import { HandlersParams } from "./helpers/interfaces";
import { Uppload } from "./uppload";

export class UpploadService {
  type = "service";
  name: string = "";
  invisible = false;
  noRecolor = false;
  icon: string = "";
  color = "#333";
  template: (upploadInstance: Uppload) => string = () => "";
  handlers: (params: HandlersParams) => void = () => {};

  /**
   * http://kangax.github.io/compat-table/es5/#test-Object/array_literal_extensions_Reserved_words_as_property_names
   * @param i - CSS class identifier
   */
  class(name: string) {
    return `${(this.name || "1abc9c")
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")}-${name}`;
  }
}
