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
        //When require, do not have to add these extensions to file's name
        extensions: ["", ".js", ".jsx"]
        //node_modules: ["web_modules", "node_modules"]  (Default Settings)
    },
    //output config
    output: {
        path: buildPath, //Path of output file
        filename: 'bundle_[hash].js' //Name of output file
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        //Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
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
                test: /\.jsx?$/, //All .js and .jsx files
                loaders: ['babel'], //react-hot is like browser sync and babel loads jsx and es6-7
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
        configFile: '.eslintrc' //Rules for eslint
    }
};

module.exports = config;
