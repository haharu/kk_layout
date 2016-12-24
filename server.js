import webpack from 'webpack'
import path from 'path';

import kwdm from 'koa-webpack-dev-middleware';
import kwhm from 'koa-webpack-hot-middleware';
import devConfig from './webpack-dev-server.config.js';

import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import zlib from 'zlib'
import compress from 'koa-compress';

let PORT = process.env.PORT || 3000;
let NODE_ENV = process.env.NODE_ENV || 'development';

const app = new Koa();
const compile = webpack(devConfig);

const _use = app.use;
app.use = x => _use.call(app, convert(x));

if (NODE_ENV === 'development') {
    app.use(kwdm(compile, {
        noInfo: false,
        quiet: false,
        lazy: false,
        publicPath: path.join(__dirname, 'build'),
        stats: {
            colors: true
        }
    }));

    app.use(kwhm(compile));
} else {
    app.use(compress({threshold: 2048, flush: zlib.Z_SYNC_FLUSH}));
    app.use(serve('public'));
}

app.listen(PORT, function(err) {
    if (err) {
        console.log(err);
        return;
    }
});

console.log('Listening at port ' + PORT);
