const path = require("path");

export default () => ({
	mode: "production",
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "uppload.js",
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
