const path = require('path');
const config = require('config');
const {DefinePlugin} = require('webpack');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');


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
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		plugins: [
			new TsconfigPathsPlugin({configFile: "tsconfig.json"}),
		]
	},
	output: {
		path: path.resolve(__dirname, './bundles/'),
		filename: 'index.js',
		publicPath: `${config.get('staticURL')}`
	},
	plugins: [
		new DefinePlugin({
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	]
};