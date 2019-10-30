const { readdir, copy, ensureDir } = require("fs-extra");
const { join } = require("path");
const { exec } = require("shelljs");

const publish = async () => {

  const packagesDir = join(__dirname, "..", "packages");
  const packagesList = await readdir(packagesDir);

  console.log("Building all packages...");
  console.log(exec("cd .. && npm run build").stdout);

  for await (const package of packagesList) {
    console.log(`Getting package ready: ${package}`);
    await ensureDir(join(__dirname, "..", "packages", package, "dist"));
    await copy(
      join(__dirname, "..", "dist", "packages", package),
      join(__dirname, "..", "packages", package, "dist")
    );
  }

  for await (const package of packagesList) {
    if (process.env.NPM_TOKEN) {
      console.log(`Publishing package: ${package}`);
      console.log(exec(`cd ../packages/${package} && npm publish --access public && cd ../..`).stdout);
    }
  }
}

publish()
  .then(() => console.log("Published successfully!"))
  .catch(error => console.log("ERR", error))
  .finally(() => process.exit(0));
