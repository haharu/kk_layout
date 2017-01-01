import webpack from 'webpack'
import path from 'path';

import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';

import devConfig from './webpack-dev-server.config.js';

import _ from 'lodash';

import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import compress from 'koa-compress';
import zlib from 'zlib'
import responseTime from 'koa-response-time';
import session from 'koa-generic-session';
import redisStore from 'koa-redis';
import koaRouter from 'koa-router';

import request from 'request';
import rp from 'request-promise'

import {execSync} from 'child_process';

const app = new Koa();
const router = koaRouter();
const compile = webpack(devConfig);

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

if (NODE_ENV === 'development') {
    require('request-debug')(rp);
}


const _use = app.use;
app.use = x => _use.call(app, convert(x))

app.use(responseTime())

app.use(session())

router.get('/map/locate/:addr', async(ctx, next) => {

    try {
        let opts = {
            uri: `http://map.baidu.com/?qt=s&wd=${_.trim(ctx.params.addr)}&b=(13499863,2853429;13567511,2885813)`,
            json: true
        }

        await rp(opts).then(resp => {
            return {result: resp.result, content: resp.content, psrs: resp.psrs}
        }).then(result => {
            ctx.body = result
        })

    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }

}).get('/map/geoconv', async(ctx, next) => {
    try {
        let resp = execSync(`bash ${path.join(__dirname, 'api/map-utils/point2coord.sh')} ${ctx.query.geoX}, ${ctx.query.geoY}`)
        ctx.body = _.trim(resp);
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

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
        historyApiFallback: true
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
})

console.log('Listening at port ' + PORT);
