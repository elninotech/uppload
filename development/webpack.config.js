const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./index.js",
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devServer: {
    contentBase: "./dist"
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
