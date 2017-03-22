
const { resolve } = require('path');
const webpack = require('webpack');
const { name } = require('./package.json');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const PROJECT_PATH = __dirname;
const inProject = (...args) => resolve(PROJECT_PATH, ...args);
const inSrc = inProject.bind(null, 'src');
const inTest = inProject.bind(null, 'test');
const srcDir = inSrc();
const testDir = inTest();

module.exports = (webpackEnv = {}) => {
	const { minify } = webpackEnv;

	const config = {
		devtool: 'source-map',
		entry: './src',
		output: {
			filename: `${name}${minify ? '.min' : ''}.js`,
			path: resolve(__dirname, 'dist'),
			library: 'ReactInput',
			libraryTarget: 'umd',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [srcDir, testDir],
					loader: 'babel-loader',
					options: {
						presets: [
							['es2015', { modules: false }],
							'react',
							'stage-0',
						],
						cacheDirectory: true,
						babelrc: false,
					},
				},
			],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			}),
		],
		resolve: {
			modules: [srcDir, 'node_modules'],
			extensions: ['.js'],
		},
		resolveLoader: {
			moduleExtensions: ['-loader'],
		},
		externals: {
			react: 'React',
			'react-dom': 'ReactDom',
		},
	};


	if (minify) {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin(),
		);
	}

	return config;
};
