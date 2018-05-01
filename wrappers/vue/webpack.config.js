const webpack = require("webpack");
const path = require("path");

var ROOT = path.resolve(__dirname);
var root = path.join.bind(path, ROOT);

const create = (filename, output, external) => {
	return {
		entry: "./uppload.vue",
		output: {
			path: output,
			filename: filename,
			libraryTarget: "umd",
			library: "uppload-vue",
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
						presets: ["@babel/preset-env"]
					}
				},
				{
					test: /\.vue$/,
					loader: "vue-loader"
				},
				{
					test: /\.(s*)css$/,
					use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
				}
			]
		}
	};
};
module.exports = [create("index.js", root("./dist"), "uppload-js"), create("uppload-vue.js", root("./example"), "uppload")];
