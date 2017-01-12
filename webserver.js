import webpack from 'webpack'
import path from 'path';
import _ from 'lodash';
require('isomorphic-fetch')

import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';

import devConfig from './webpack-dev-server.config.js';

import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import compress from 'koa-compress';
import zlib from 'zlib'
import responseTime from 'koa-response-time';
import bodyParser from 'koa-bodyparser';
import koaRouter from 'koa-router';

import React from 'react'
import {renderToString} from 'react-dom/server'
import {ReduxAsyncConnect, loadOnServer, reducer as reduxAsyncConnect} from 'redux-connect'
import {match} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './app/src/store/configureStore'
import config from './app/src/config';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import Html from './app/src/helpers/Html'
import Root from './app/src/router';
import routes from './app/src/router/route';

const app = new Koa();
const router = koaRouter();

const G_API_KEY = 'AIzaSyCWF9rxrnc0Lxx5YuhojPNhO-kY3aflIXE';

const _use = app.use;
app.use = x => _use.call(app, convert(x))

app.use(compress({threshold: 2048, flush: zlib.Z_SYNC_FLUSH}));

if (!config.isProduction) {
    const compile = webpack(devConfig);
    app.use(devMiddleware(compile, {
        noInfo: false,
        stats: {
            colors: true
        },
        hot: true,
        quiet: true,
        inline: true,
        port: config.port,
        publicPath: devConfig.output.publicPath
    }));

    app.use(hotMiddleware(compile));
} else {
    app.use(serve('public'));
}

app.use(responseTime())

app.use(bodyParser());

app.use(async(ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }
})

router.get('/map/place/textsearch/:input', async(ctx, next) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(_.trim(ctx.params.input))}&language=zh-CN&key=${G_API_KEY}`

    await fetch(url).then(resp => resp.json()).then(resp => ctx.body = resp).catch(err => {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    })
}).get('/map/autocomplete/:input', async(ctx, next) => {

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURI(_.trim(ctx.params.input))}&types=establishment&language=zh-CN&components=country:us&key=${G_API_KEY}`

    await fetch(url).then(resp => resp.json()).then(resp => ctx.body = resp).catch(err => {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    })

}).get('/map/place/detail/:placeId', async(ctx, next) => {

    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${ctx.params.placeId}&key=${G_API_KEY}`

    await fetch(url).then(resp => resp.json()).then(resp => ctx.body = resp).catch(err => {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    })

}).get('/map/photo/:maxWidth/:maxHeight/:ref', async(ctx, next) => {

    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${ctx.params.maxWidth}&maxheight=${ctx.params.maxHeight}&photoreference=${ctx.params.ref}&key=${G_API_KEY}`;

    await fetch(url).then(resp => ctx.body = resp.body).catch(err => {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    })

}).get('/map/geoconv', async(ctx, next) => {

    const url = `https://api.map.baidu.com/ag/coord/convert?from=2&to=4&x=${ctx.query.lng}&y=${ctx.query.lat}`;

    await fetch(url).then(resp => resp.json()).then(resp => {
        ctx.body = resp
    }).catch(err => {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    })

})

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async(ctx, next) => {

    if (!config.isProduction) {
        webpackIsomorphicTools.refresh();
    }
    const store = configureStore();
    const memoryHistory = createMemoryHistory(ctx.originalUrl)
    const history = syncHistoryWithStore(memoryHistory, store);

    match({
        history,
        routes,
        location: ctx.originalUrl
    }, (err, redirect, renderProps) => {
        loadOnServer({
            ...renderProps,
            store
        }).then(() => {
            const component = <Root store={store} history={history}/>
            ctx.body = '<!doctype html>\n' + renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>)
        })
    })
})

app.listen(config.port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
})

console.log('Listening at port ' + config.port);
