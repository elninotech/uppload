import webpack from "webpack";
import path from "path";
import "babel-polyfill";

export default () => ({
	mode: "production",
	entry: {
		"uppload-react.polyfills.min": ["babel-polyfill", "./uppload-react.js"],
		"uppload-react.min": ["./uppload-react.js"]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		libraryTarget: "umd",
		globalObject: "this",
		library: "uppload-react"
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
				test: /\.js$/,
				loader: "babel-loader",
				include: __dirname,
				exclude: /node_modules/,
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"]
				}
			}
		]
	}
});
