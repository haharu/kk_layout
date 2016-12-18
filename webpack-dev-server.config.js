var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    //Entry points to the project
    entry: [
        'webpack/hot/dev-server',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/app/src/app.jsx')
    ],
    //Config options on how to interpret requires imports
    resolve: {
        extensions: ["", ".js", ".jsx"]
        //node_modules: ["web_modules", "node_modules"]  (Default Settings)
    },
    //Server Configuration options
    devServer: {
        contentBase: buildPath, //Relative directory for base of server
        devtool: 'eval',
        hot: true, //Live-reload
        inline: true,
        port: process.env.PORT || 8080, //Port Number
        historyApiFallback: true,
        compress: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    devtool: 'eval',
    output: {
        path: buildPath, //Path of output file
        filename: 'bundle_[hash].js'
    },
    plugins: [
        //Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
        //Moves files
        // new TransferWebpackPlugin([
        //     {
        //         from: 'app/stylesheets'
        //     }, {
        //         from: 'app/fonts'
        //     }, {
        //         from: 'app/images'
        //     }
        // ], path.resolve(__dirname, "/build")),
        new HtmlWebpackPlugin({
            title: 'workbox',
            template: path.join(__dirname, '/app/index.ejs')
        })
    ],
    module: {
        //Loaders to interpret non-vanilla javascript code as well as most other extensions including images and text.
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
                //React-hot loader and
                test: /\.jsx?$/, //All .js and .jsx files
                loaders: ['babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime'], //react-hot is like browser sync and babel loads jsx and es6-7
                include: [path.resolve(__dirname, "app/src")],
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
    //eslint config options. Part of the eslint-loader package
    eslint: {
        configFile: '.eslintrc'
    }
};

module.exports = config;
