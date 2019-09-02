import UpploadPlugin from "../plugin";

export class UpploadService extends UpploadPlugin {
  type = "service";
  name?: string;
  template?: () => string;

  /**
   * http://kangax.github.io/compat-table/es5/#test-Object/array_literal_extensions_Reserved_words_as_property_names
   * @param i - CSS class identifier
   */
  class(name: string) {
    return `${(this.name || "1abc9c").toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")}-${name}`;
  }
}
