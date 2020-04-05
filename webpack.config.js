const path = require('path');
const config = require('config');
const {DefinePlugin} = require('webpack');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
const backendHost = process.env.BACKEND_HOST || (isDev ? 'http://bigone.demist.ru:7779' : null);

module.exports = {
	entry: './static/entry.tsx',
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
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: isDev
                                    ? '[name]__[local]__[hash:base64:5]'
                                    : '[hash:base64:5]'
                            },
                        }
                    },
				],
			},
			{
				test: /\.(jpe?g|png|gif|mp3|svg|webp)$/i,
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
		publicPath: '/'
	},
	plugins: [
		new DefinePlugin({
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new HtmlWebpackPlugin({
			title: 'Neural networks IDEA',
			filename: 'index.html',
			inject: 'head',
			scriptLoading: 'defer',
		}),
		new FaviconsWebpackPlugin('./assets/favicon.png')
	]
};