
const path = require('path');
const config = require('config');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: './static/app.tsx',
	devtool: isDev ? 'sourcemap' : 'none',
	module: {
		rules: [
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
				exclude: /\.module.css$/,
			},
			{
				// css-mdoules
				test: /\.module.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true
						},
					}
				],
			},
			{
				test: /\.(jpe?g|png|gif|mp3|svg)$/i,
				loaders: 'file-loader'
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					transpileOnly: true,
				}
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
	output: {
    path: path.resolve(__dirname, './bundles/'),
    filename: 'index.js',
    publicPath: `${config.get('staticURL')}`
	},
};