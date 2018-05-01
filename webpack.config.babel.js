const webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

export default () => ({
	mode: "production",
	entry: {
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
				test: /\.(s*)css$/,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
			},
			{
				test: /\.(js)$/,
				exclude: /(node_modules|bower_components)/,
				use: "babel-loader"
			}
		]
	},
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new OptimizeCssAssetsPlugin({
			
		})
	]
});
