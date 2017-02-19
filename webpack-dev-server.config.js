var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))
var webpack = require('webpack');
var path = require('path');
var config = require('./app/src/config').default;

var assetPath = path.resolve(__dirname, 'dist');

module.exports = {
    entry: {
        main: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            path.join(__dirname, '/app/src/app.jsx')
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        modules: [
            path.resolve(__dirname, './app/src'),
            'node_modules'
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: assetPath,
        filename: 'bundle_[hash].js',
        publicPath: 'http://' + config.host + ':' + config.port + '/assets/'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                debug: true,
                eslint: {
                    configFile: '.eslintrc'
                }
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        webpackIsomorphicToolsPlugin.development()
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, "app/src")],
                enforce: 'pre'
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    }
                ]
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
