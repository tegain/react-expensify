const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Use '--env' param used in package.json script
module.exports = (env) => {
	const isProduction = env === 'production'
	// Set CSS output file name, which will go inside the 'output' folder defined below
	const CSSExtract = new ExtractTextPlugin('styles.css')

	return {
		entry: './src/app.js',
		output: {
			path: path.join(__dirname, 'public'),
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.s?css$/,
					// use allows to provide array of loaders
					// Use CSSExtract plugin here
					use: CSSExtract.extract({
						use: [
							// Define loaders as array to pass options (sourceMap, here)
							{
								loader: 'css-loader',
								options: {
									sourceMap: true
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true
								}
							}
						]
					})
				}
			]
		},
		// Define plugins
		plugins: [
			CSSExtract
		],
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true // prevents 'Cannot get /route' (redirects all 'cannot get...' to index.html when loading the page and fetching the server route)
		}
	}
}