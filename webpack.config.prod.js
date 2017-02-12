import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: 	{
    vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
		// Generate an external css file with a hash in the filename
		new ExtractTextPlugin('[name].[contenthash].css'),
		// Hash the files using MD5 so that their name change when the content changes
		new WebpackMd5Hash(),
		//Use CommonChunkPlugin to create separate bundle
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendor'
		}),
		// Create HTML file that includes reference to bundled js
		new HtmlWebPackPlugin({
			template:'src/index.html',
			minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
			inject:true,
			trackJSToken:'7a54dce5976d4d79a1f414ec64267c8e'
		}),
		// Eliminate duplicate packages when generating bundle
		new webpack.optimize.DedupePlugin(),
		//Minify js
		new webpack.optimize.UglifyJsPlugin()
	],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
