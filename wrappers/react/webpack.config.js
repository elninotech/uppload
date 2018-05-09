module.exports = {
	context: __dirname + "/demo",
	entry: {
		app: "./index.js"
	},
	output: {
		path: __dirname + "/demo",
		filename: "bundle.js",
		publicPath: "/"
	},
	devServer: {
		open: false,
		contentBase: __dirname + "/demo"
	},
	resolve: {
		extensions: [".js"]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [/demo/, /dist/],
				exclude: /node_modules/,
				enforce: "pre",
				use: [
					{
						loader: "babel-loader",
						options: { presets: ["es2015", "react"] }
					}
				]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	}
};
