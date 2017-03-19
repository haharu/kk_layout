var webpack = require('webpack');
var path = require('path');
var distPath = path.resolve(__dirname, 'dist');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'));

module.exports = {
    entry: [path.join(__dirname, '/app/src/app.jsx')],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        path: distPath,
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                debug: false,
                eslint: {
                    configFile: '.eslintrc'
                }
            }
        }),
        new webpack.optimize.UglifyJsPlugin({sourceMap: true, minimize: true}),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
        webpackIsomorphicToolsPlugin,
        new webpack.optimize.CommonsChunkPlugin({name: 'common', filename: "commons.js", async: true}),
        new ExtractTextPlugin({filename: '[name]-[chunkhash].css', allChunks: true})
    ],
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, "app/src")],
                exclude: [nodeModulesPath],
                enforce: 'pre'
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader", publicPath: distPath})
            }, {
                test: /\.svg(\?.*$|$)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        mimetype: 'image/svg+xml'
                    }
                }
            }, {
                test: /\.woff(\?.*$|$)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        mimetype: 'application/font-woff'
                    }
                }
            }, {
                test: /\.woff2(\?.*$|$)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        mimetype: 'application/font-woff'
                    }
                }
            }, {
                test: /\.ttf(\?.*$|$)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        mimetype: 'application/octet-stream'
                    }
                }
            }, {
                test: /\.eot(\?.*$|$)/,
                use: "file-loader"
            }, {
                test: webpackIsomorphicToolsPlugin.regular_expression('images'),
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                }
            }
        ]
    }
};
