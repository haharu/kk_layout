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

const app = new Koa();
const router = koaRouter();
const compile = webpack(devConfig);

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const G_API_KEY = 'AIzaSyC9RIsTSntRihFUG6spUF2jeDycO-ZyWeE';

if (NODE_ENV === 'development') {
    require('request-debug')(rp);
}

const _use = app.use;
app.use = x => _use.call(app, convert(x))

app.use(responseTime())

app.use(session())

router.get('/map/autocomplete/:input', async(ctx, next) => {

    try {
        let opts = {
            uri: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURI(_.trim(ctx.params.input))}&types=establishment&components=country:us&key=${G_API_KEY}`,
            json: true
        }

        await rp(opts).then(resp => ctx.body = resp)

    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }

}).get('/map/place/detail/:placeId', async(ctx, next) => {
    try {
        let opts = {
            uri: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${ctx.params.placeId}&key=${G_API_KEY}`,
            json: true
        }
        await rp(opts).then(resp => ctx.body = resp)

    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }
}).get('/map/geoconv', async(ctx, next) => {
    try {
        let opts = {
            uri: `https://api.map.baidu.com/ag/coord/convert?from=2&to=4&x=${ctx.query.lng}&y=${ctx.query.lat}`,
            json: true
        }
        await rp(opts).then(resp => {
            ctx.body = resp
        })
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

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

app.use(async(ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }
})

console.log('Listening at port ' + PORT);
