let webpack = require('webpack');
let path = require('path');
let distPath = path.resolve(__dirname, 'dist');
let nodeModulesPath = path.resolve(__dirname, 'node_modules');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
let webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'));

module.exports = {
    context: path.resolve(__dirname, 'app/src'),
    entry: {
        main: './app',
    },
    resolve: {
        alias: {
            Root: path.resolve(__dirname, './'),
            Assets: path.resolve(__dirname, 'app/assets'),
        },
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: distPath,
        filename: '[name]_[hash].js',
        chunkFilename: '[name]_[chunkhash].js',
        publicPath: '/',
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                context: __dirname,
                debug: false,
                eslint: {
                    configFile: '.eslintrc',
                },
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true,
            },
            compress: {
                screw_ie8: true,
            },
            comments: false,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
        new webpack.optimize.CommonsChunkPlugin({children: true, async: true}),
        new ExtractTextPlugin({filename: '[name]_[chunkhash].css', allChunks: true}),
        webpackIsomorphicToolsPlugin,
    ],
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, 'app/src')],
                exclude: [nodeModulesPath],
                enforce: 'pre',
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
            }, {
                test: /\.svg(\?.*$|$)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        mimetype: 'image/svg+xml',
                    },
                },
            }, {
                test: /\.woff(\?.*$|$)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        mimetype: 'application/font-woff',
                    },
                },
            }, {
                test: /\.woff2(\?.*$|$)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        mimetype: 'application/font-woff',
                    },
                },
            }, {
                test: /\.ttf(\?.*$|$)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        mimetype: 'application/octet-stream',
                    },
                },
            }, {
                test: /\.eot(\?.*$|$)/,
                use: 'file-loader',
            }, {
                test: webpackIsomorphicToolsPlugin.regular_expression('images'),
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                    },
                },
            },
        ],
    },
};
