import webpack from "webpack";
import path from "path";
import "babel-polyfill";

export default () => ({
	mode: "production",
	entry: {
		"uppload.min": ["babel-polyfill", "./index.js"],
		"uppload.no-polyfills.min": ["./index.js"]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		libraryTarget: "umd",
		globalObject: "this",
		library: "uppload"
	},
	resolveLoader: {
		modules: ["node_modules", path.resolve(__dirname, "loaders")]
	},
	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader", options: { minimize: true } },
					{ loader: "sass-loader", options: { minimize: true } }
				]
			},
			{
				test: /\.(js)$/,
				exclude: /(node_modules|bower_components)/,
				use: ["babel-loader", "anand-loader"]
			}
		]
	}
});
