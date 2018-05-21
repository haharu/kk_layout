require('dotenv').config();
require('./babel');
let path = require('path');
let WebpackIsomorphicTools = require('webpack-isomorphic-tools');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools-configuration')).server(path.resolve(__dirname, 'app/src'), () => {
    require('./web');
});

global._ = require('lodash');
