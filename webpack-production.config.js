let webpack = require('webpack');
let path = require('path');
let distPath = path.resolve(__dirname, 'dist');
let nodeModulesPath = path.resolve(__dirname, 'node_modules');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
let webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'));

// let ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
let Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, './app/src'),
    entry: {
        main: './app',
    },
    resolve: {
        alias: {
            Root: path.resolve(__dirname, '.'),
            App: path.resolve(__dirname, './app/src'),
            Assets: path.resolve(__dirname, './app/assets'),
        },
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: distPath,
        filename: '[name]_[hash].js',
        chunkFilename: '[name]_[chunkhash].js',
        publicPath: '/',
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        // new ServiceWorkerWebpackPlugin({
        //     entry: path.join(__dirname, 'serviceWorker/sw.js'),
        //     excludes: [
        //         '**/.*', '**/*.map',
        //     ],
        // }),
        new webpack.LoaderOptionsPlugin({
            debug: false,
            options: {
                context: path.resolve(__dirname, './app/src'),
                debug: false,
                eslint: {
                    configFile: '.eslintrc',
                },
            },
        }),
        new Dotenv(),
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
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
