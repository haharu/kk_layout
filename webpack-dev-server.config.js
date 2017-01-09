var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))
var webpack = require('webpack');
var path = require('path');
var config = require('./app/src/config');

var assetPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
    entry: {
        main: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            path.join(__dirname, '/app/src/app.jsx')
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: assetPath,
        filename: 'bundle_[hash].js',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        webpackIsomorphicToolsPlugin.development()
    ],
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, "app/src")]
            }
        ],
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            }, {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                exclude: /(node_modules|bower_components)/
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
                loader: 'url-loader?limit=10240',
            }
        ]
    },
    eslint: {
        configFile: '.eslintrc'
    }
};
