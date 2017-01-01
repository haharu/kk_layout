var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'public');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry: [path.join(__dirname, '/app/src/app.jsx')],
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    output: {
        path: buildPath,
        filename: 'bundle_[hash].js',
        publicPath: '/'
    },
    plugins: [
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
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
            }
        }),
        new HtmlWebpackPlugin({
            title: 'dr.hush',
            description: 'dr.hush',
            template: path.join(__dirname, '/app/index.ejs')
        }),
        new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
        new ExtractTextPlugin('[name]-[hash].css', {allChunks: true})
    ],
    devtool: 'cheap-module-source-map',
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
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            }, {
                test: /\.jpg(\?.*$|$)/,
                loader: "file-loader"
            }
        ]
    },
    //Eslint config
    eslint: {
        configFile: '.eslintrc'
    }
};

module.exports = config;
