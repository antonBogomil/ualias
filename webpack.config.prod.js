const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const base = require('./webpack.config.base')
const withStat = process.env.npm_config_withStat
module.exports = merge(base, {
	mode: 'production',
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
			  loader: MiniCssExtractPlugin.loader,
			  options: {
				esModule: true,
				modules: {
				  namedExport: true,
				},
			  },
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
	plugins: [
	  new MiniCssExtractPlugin(
		{
		  filename: '[name].[contenthash].css'
		}
	  ),
	  new HtmlWebpackPlugin({
		template: `public/index.html`,
	  }),
	  new CleanWebpackPlugin()
	],
  }
)
