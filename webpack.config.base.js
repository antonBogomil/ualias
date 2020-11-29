const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  entry: {
	app: "./src/index.ts",
  },
  output: {
	path: path.join(__dirname, "dist"),
	filename: "dist/bundle.[name].js"
  },
  resolve: {
	extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
	new CleanWebpackPlugin(),
	new HtmlWebpackPlugin({
	  template: `public/index.html`,
	}),
  ],
}
