module.exports = {
	context: __dirname + "/src",
	entry: {
		app: "./index.js"
	},
	output: {
		path: __dirname + "/dist",
		filename: "index.js",
		libraryTarget: "umd",
		library: "HelloWorld"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [/src/],
				exclude: /node_modules/,
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
	},
	externals: {
		react: "react"
	}
};
