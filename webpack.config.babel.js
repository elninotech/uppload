import webpack from "webpack";
import path from "path";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";

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
		})
	]
});
