const gulp = require("gulp");
const rollup = require("rollup");
const rollupTypescript = require("@rollup/plugin-typescript");
const exec = require("child_process").exec;

gulp.task("build", async function () {
  const bundle = await rollup.rollup({
    input: "./src/index.ts",
    plugins: [
      rollupTypescript()
    ]
  });

  exec("tsc");

  await bundle.write({
    file: "./dist/index.umd.js",
    format: "umd",
    name: "uppload",
    sourcemap: true
  });

  await bundle.write({
    file: "./dist/index.cjs.js",
    format: "cjs",
    sourcemap: true
  });

  await bundle.write({
    file: "./dist/index.amd.js",
    format: "amd",
    sourcemap: true
  });
});
