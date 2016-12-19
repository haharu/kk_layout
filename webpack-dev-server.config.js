var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    entry: [
        'webpack/hot/dev-server',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/app/src/app.jsx')
    ],
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    devServer: {
        contentBase: buildPath,
        devtool: 'eval',
        hot: true, //Live-reload
        inline: true,
        port: process.env.PORT || 8080,
        historyApiFallback: true,
        compress: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    devtool: 'eval',
    output: {
        path: buildPath,
        filename: 'bundle_[hash].js'
    },
    plugins: [
        //Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'workbox',
            template: path.join(__dirname, '/app/index.ejs')
        })
    ],
    module: {
        preLoaders: [
            {
                //Eslint loader
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, "app/src")]
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime'], //react-hot is like browser sync and babel loads jsx and es6-7
                include: [path.resolve(__dirname, "app/src")]
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                exclude: [nodeModulesPath]
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
