const webpack = require("webpack");
const path = require("path");

var ROOT = path.resolve(__dirname);
var root = path.join.bind(path, ROOT);

const create = (filename, output, external) => {
	return {
		entry: "./uppload-react.js",
		output: {
			path: output,
			filename: filename,
			libraryTarget: "umd",
			library: "uppload-react",
			umdNamedDefine: true
		},
		externals: {
			"uppload-widget": external
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: "babel-loader",
					include: __dirname,
					exclude: /node_modules/,
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				},
				{
					test: /\.(s*)css$/,
					use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
				}
			]
		}
	};
};
module.exports = [create("index.js", root("./dist"), "uppload-js"), create("uppload-react.js", root("./example"), "uppload")];
