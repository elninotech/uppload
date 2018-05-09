import webpack from "webpack";
import VueLoaderPlugin from "vue-loader/lib/plugin";
import path from "path";
import "babel-polyfill";

export default () => ({
	mode: "production",
	entry: {
		"uppload-vue.polyfills.min": ["babel-polyfill", "./uppload.vue"],
		"uppload-vue.min": ["./uppload.vue"]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		libraryTarget: "umd",
		globalObject: "this",
		library: "uppload-vue"
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
				test: /\.vue$/,
				use: ["vue-loader", "anand-loader"]
			},
			{
				test: /\.(js)$/,
				exclude: /(node_modules|bower_components)/,
				use: ["babel-loader", "anand-loader"]
			}
		]
	},
	plugins: [new VueLoaderPlugin()]
});
