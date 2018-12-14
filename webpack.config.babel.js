import webpack from "webpack";
import path from "path";
import pkg from "./package.json";
import "babel-polyfill";

export default () => ({
	plugins: [
		new webpack.DefinePlugin({
			UPPLOAD_VERSION: JSON.stringify(pkg.version.replace(/\./g, "-"))
		})
	],
	mode: "production",
	entry: {
		"uppload.min": ["./index.js"],
		"uppload.polyfills": ["babel-polyfill", "./index.js"]
	},
	devServer: {
		contentBase: path.join(__dirname, "./docs"),
		compress: true,
		port: 9000
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
