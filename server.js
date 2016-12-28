import webpack from 'webpack'
import path from 'path';

import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';

import devConfig from './webpack-dev-server.config.js';

import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import zlib from 'zlib'
import responseTime from 'koa-response-time';
import session from 'koa-generic-session';
import redisStore from 'koa-redis';

const app = new Koa();
const compile = webpack(devConfig);

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const _use = app.use;
app.use = x => _use.call(app, convert(x));

app.use(responseTime());

app.use(bodyParser());

app.use(session());

app.use(async(ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }
})

app.use(compress({threshold: 2048, flush: zlib.Z_SYNC_FLUSH}));

if (NODE_ENV === 'development') {
    app.use(devMiddleware(compile, {
        noInfo: false,
        stats: {
            colors: true
        },
        hot: true,
        quiet: true,
        inline: true,
        port: process.env.PORT || 3000,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }));

    app.use(hotMiddleware(compile));
} else {
    app.use(serve('public'));
}

app.listen(PORT, function(err) {
    if (err) {
        console.log(err);
        return;
    }
});

console.log('Listening at port ' + PORT);
