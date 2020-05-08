import { Configuration } from "webpack";
import { resolve } from "path";

const config: Configuration = {
  mode: "production",
  entry: "./src/browser.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "browser.js",
    path: resolve(__dirname, "dist"),
  },
};

export default config;
