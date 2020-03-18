const download = require("download");
const { exec } = require("child_process");
// const extract = require("extract-zip");

const examplesDir =
  "https://github.com/elninotech/uppload-examples/archive/master.zip";

(async () => {
  console.log("Downloading examples...");
  await download(examplesDir, __dirname);
})();
