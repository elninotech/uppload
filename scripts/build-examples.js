const download = require("download");
const extract = require("extract-zip");
const { exec } = require("child_process");
const { join } = require("path");
const {
  readdirSync,
  copyFileSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
} = require("fs");

const examplesDir =
  "https://github.com/elninotech/uppload-examples/archive/master.zip";

(async () => {
  console.log("Downloading examples...");
  await download(examplesDir, __dirname, { filename: "master.zip" });

  console.log("Extracting examples...");
  await extract(join(__dirname, "master.zip"), { dir: __dirname });

  const examples = readdirSync(
    join(__dirname, "uppload-examples-master", "examples")
  );

  mkdirSync(join(__dirname, "..", "content", "examples"), {
    recursive: true,
  });

  examples.forEach(example => {
    copyFileSync(
      join(
        __dirname,
        "uppload-examples-master",
        "examples",
        example,
        "README.md"
      ),
      join(__dirname, "..", "content", "examples", `${example}.md`)
    );

    writeFileSync(
      join(__dirname, "..", "content", "examples", `${example}.md`),
      readFileSync(
        join(__dirname, "..", "content", "examples", `${example}.md`)
      )
        .toString()
        .replace(
          "##",
          `You can [**view the source code on GitHub**](https://github.com/elninotech/uppload-examples/tree/master/examples/${example}) or [try it on CodeSandbox](https://codesandbox.io/s/github/elninotech/uppload-examples/tree/master/examples/${example}).\n\n##`
        )
    );
  });
  console.log("Added examples!");
})();
