const path = require('path')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
module.exports = merge(baseConfig,
  {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	devServer: {
	  contentBase: path.join(__dirname, 'dist'),
	  compress: true,
	  historyApiFallback: true,
	  port: 9000,
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
		  exclude: /node_modules/,
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
			"sass-loader"
		  ]
		}
	  ],
	},
  }
)
