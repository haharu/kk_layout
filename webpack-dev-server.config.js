let WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
let webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'));
let webpack = require('webpack');
let path = require('path');
let config = require('./config');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
// let ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

let distPath = path.resolve(__dirname, 'dist');

let Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, './app/src'),
    entry: {
        main: [
            './app',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000',
        ],
    },
    resolve: {
        alias: {
            Root: path.resolve(__dirname, '.'),
            App: path.resolve(__dirname, './app/src'),
            Assets: path.resolve(__dirname, './app/assets'),
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
        chunkFilename: '[name]_[hash].js',
        publicPath: 'https://' + config.host + ':' + config.port + '/assets/',
    },
    plugins: [
        // new ServiceWorkerWebpackPlugin({
        //     entry: path.resolve(__dirname, './serviceWorker/sw.js'),
        // }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: path.resolve(__dirname, './app/src'),
                debug: true,
                eslint: {
                    configFile: '.eslintrc',
                    fix: true,
                },
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv(),
        new ExtractTextPlugin({filename: '[name]_[hash].css', allChunks: true}),
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
