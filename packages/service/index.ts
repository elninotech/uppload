import UpploadPlugin from "@uppload/plugin";
import { HandlersParams } from "@uppload/common";

export class UpploadService extends UpploadPlugin {
  type = "service";
  name: string = "";
  invisible = false;
  icon: string = "";
  template: () => string = () => "";
  handlers: (params: HandlersParams) => void = () => {};

  constructor() {
    super();
  }

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
