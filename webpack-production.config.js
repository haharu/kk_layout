var webpack = require('webpack');
var path = require('path');
var assetPath = path.resolve(__dirname, 'dist');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'));

module.exports = {
    entry: [path.join(__dirname, '/app/src/app.jsx')],
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    output: {
        path: assetPath,
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
        webpackIsomorphicToolsPlugin,
        new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true})
    ],
    devtool: 'cheap-module-source-map',
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, "app/src")],
                exclude: [nodeModulesPath]
            }
        ],
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            }, {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: [nodeModulesPath]
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
                include: [path.join(__dirname, 'app/stylesheets')]
            }, {
                test: /\.svg(\?.*$|$)/,
                loader: 'file-loader?mimetype=image/svg+xml'
            }, {
                test: /\.woff(\?.*$|$)/,
                loader: "file-loader?mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?.*$|$)/,
                loader: "file-loader?mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?.*$|$)/,
                loader: "file-loader?mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?.*$|$)/,
                loader: "file-loader"
            }, {
                test: webpackIsomorphicToolsPlugin.regular_expression('images'),
                loader: 'url-loader?limit=10240'
            }
        ]
    },
    //Eslint config
    eslint: {
        configFile: '.eslintrc'
    }
};
