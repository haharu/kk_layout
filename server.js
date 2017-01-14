import path from 'path'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'
require('isomorphic-fetch')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools-configuration')).server(path.resolve(__dirname), () => {
    require('./webserver')
})

global._ = require('lodash')
