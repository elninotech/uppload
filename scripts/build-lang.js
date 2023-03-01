const { translateObject } = require("auto-i18n");
const { writeFileSync, readFileSync } = require("fs");
const { join } = require("path");

let lang;
eval(
  "lang = " +
    readFileSync(join("src", "i18n", "nl.ts"))
      .toString()
      .replace("export default ", "")
);

translateObject(lang, "de")
  .then(translation => {
    const content = `export default ${JSON.stringify(translation, null, 2)};\n`;
    writeFileSync(join("src", "i18n", "de.ts"), content);
  })
  .catch(error => {
    console.log("Got an error", error);
  });
