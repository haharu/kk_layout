
var project_base_path = require('path').resolve(__dirname)

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools-configuration')).server(project_base_path, function() {
    require('./webpack-dev-server')
})
