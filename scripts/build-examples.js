const download = require("download");
const extract = require("extract-zip");
const { exec } = require("child_process");
const { join } = require("path");

const examplesDir =
  "https://github.com/elninotech/uppload-examples/archive/master.zip";

(async () => {
  console.log("Downloading examples...");
  await download(examplesDir, __dirname, { filename: "master.zip" });
  console.log("Downloaded zip");
  extract(join(__dirname, "master.zip"), { dir: __dirname }, error => {
    if (error) return console.error(error);
    console.log("Extracted examples zip");
  });
})();
