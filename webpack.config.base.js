const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  entry: {
	app: "./src/index.js",
  },
  output: {
	path: path.join(__dirname, "dist"),
	filename: '[name].js',
	chunkFilename: "[contenthash].js",
  },
  resolve: {
	extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
	splitChunks: {
	  cacheGroups: {
		vendor: {
		  test: path.resolve(__dirname, "node_modules"),
		  name: 'vendors',
		  chunks: 'all',
		},
	  }
	}
  },
  plugins: [
	new CleanWebpackPlugin(),
	new HtmlWebpackPlugin({
	  template: `public/index.html`,
	}),
  ],
}
