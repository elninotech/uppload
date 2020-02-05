import { Configuration } from "webpack";
import { resolve } from "path";

const config: Configuration = {
  mode: "production",
  entry: "./src/browser.ts",
  output: {
    filename: "anand-browser.js",
    path: resolve(__dirname, "dist")
  }
};

export default config;
