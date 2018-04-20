const webpack = require("webpack");
const path = require("path");

export default () => ({
	mode: "production",
	entry: {
		uppload: "./index.js",
		"uppload.min": "./index.js"
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		libraryTarget: "umd",
		globalObject: "this",
		library: "uppload"
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /(node_modules|bower_components)/,
				use: "babel-loader"
			}
		]
	}
});
