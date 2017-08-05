let WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
let webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'));
let webpack = require('webpack');
let path = require('path');
let config = require('./config');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let distPath = path.resolve(__dirname, 'dist');

module.exports = {
    context: path.resolve(__dirname, 'app/src'),
    entry: {
        main: [
            './app', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        ],
    },
    resolve: {
        alias: {
            Root: path.resolve(__dirname, './'),
            Assets: path.resolve(__dirname, 'app/assets'),
        },
        extensions: [
            '.js', '.jsx',
        ],
        modules: [
            path.resolve(__dirname, './app/src'),
            'node_modules',
        ],
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: distPath,
        filename: '[name]_[hash].js',
        chunkFilename: '[name]_[chunkhash].js',
        publicPath: 'http://' + config.host + ':' + config.port + '/assets/',
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                debug: true,
                eslint: {
                    configFile: '.eslintrc',
                    fix: true,
                },
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({children: true, async: true}),
        new ExtractTextPlugin({filename: '[name]_[chunkhash].css', allChunks: true}),
        webpackIsomorphicToolsPlugin.development(),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, 'app/src')],
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
