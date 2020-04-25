const path = require('path');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';

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
		new HtmlWebpackPlugin({
			title: 'Neural networks IDEA',
			filename: 'index.html',
			inject: 'head',
			scriptLoading: 'defer',
		}),
		new FaviconsWebpackPlugin('./assets/favicon.png')
	]
};