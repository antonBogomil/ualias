const path = require('path')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const {SourceMapDevToolPlugin} = require("webpack");
module.exports = merge(baseConfig,
  {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	devServer: {
	  compress: true,
	  historyApiFallback: true,
	  port: 9000,
	  contentBase: "/dist",
	},

	module: {
	  rules: [
		{
		  test: /\.tsx?$/,
		  use: [
			{
			  loader: "ts-loader", options: {
				transpileOnly: true,
			  }
			}
		  ],
		  exclude: path.resolve(__dirname, "node_modules")
		},
		{
		  test: /\.scss$/i,
		  use: [
			{
			  loader: "style-loader",
			  options: {
				modules: {
				  namedExport: true,
				},
			  }
			},
			{
			  loader: "css-loader",
			  options: {
				modules: {
				  namedExport: true,
				  localIdentName: '[path][name]__[local]',
				},
				sourceMap: true,
				importLoaders: 1,
			  }
			},
			"sass-loader",
		  ],
		  exclude: path.resolve(__dirname, "node_modules")
		}
	  ],
	}
  },
)
