var webpack = require('webpack');
var path = require('path');

var HOST = 'localhost';
var PORT = process.env.PORT || 3000;

var assetPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        path.join(__dirname, '/app/src/app.jsx')
    ],
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: assetPath,
        filename: 'bundle_[hash].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'dr.hush',
            description: 'dr.hush',
            template: path.join(__dirname, '/app/index.ejs')
        })
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
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            }, {
                test: /\.jpg(\?.*$|$)/,
                loader: "file-loader"
            }
        ]
    },
    eslint: {
        configFile: '.eslintrc'
    }
};

module.exports = config;
