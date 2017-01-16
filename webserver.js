import webpack from 'webpack'
import path from 'path';
import _ from 'lodash';

import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';

import devConfig from './webpack-dev-server.config';
import prodConfig from './webpack-production.config';

import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import compress from 'koa-compress';
import zlib from 'zlib'
import responseTime from 'koa-response-time';
import bodyParser from 'koa-bodyparser';
import koaRouter from 'koa-router';

import querystring from 'querystring';

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

import googleMapService from '@google/maps'
const googleMapsClient = googleMapService.createClient({key: 'AIzaSyCWF9rxrnc0Lxx5YuhojPNhO-kY3aflIXE', Promise: Promise});

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
    app.use(serve('dist'));
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
    await googleMapsClient.places({query: ctx.params.input}).asPromise().then(resp => {
        ctx.body = resp.json.results
    })

}).get('/map/autocomplete/:input', async(ctx, next) => {

    await googleMapsClient.placesAutoComplete({input: ctx.params.input}).asPromise().then(resp => {
        ctx.body = resp.json.predictions
    })

}).get('/map/place/detail/:placeId', async(ctx, next) => {

    await googleMapsClient.place({placeid: ctx.params.placeId}).asPromise().then(resp => {
        ctx.body = resp.json.result
    })

}).get('/map/photo/:maxwidth/:maxheight/:ref', async(ctx, next) => {

    await googleMapsClient.placesPhoto({photoreference: ctx.params.ref, maxheight: _.toNumber(ctx.params.maxheight), maxwidth: _.toNumber(ctx.params.maxwidth)}).asPromise().then(resp => {
        ctx.body = resp
    })

}).get('/map/distancematrix', async(ctx, next) => {
    const renameMap = {
        origin: 'origins',
        destination: 'destinations'
    }
    let opts = _.reduce(ctx.query, (acc, value, key) => {
        key = renameMap[key] || key;
        acc[key] = value
        return acc
    }, {})

    let _opts = _.omitBy(opts, _.isEmpty)

    if (_.has(_opts, 'mode') && _opts.mode === 'transit' && _.isEmpty(_opts.transit_mode)) {
        _opts.transit_mode = 'bus|rail';
        _opts.transit_routing_preference = 'fewer_transfers'
    }

    await googleMapsClient.distanceMatrix(_opts).asPromise().then(resp => {
        ctx.body = resp.json
    })

}).get('/map/directions', async(ctx, next) => {
    let opts = _.omitBy(ctx.query, _.isEmpty)

    if (_.has(opts, 'mode') && opts.mode === 'transit' && _.isEmpty(opts.transit_mode)) {
        opts.transit_mode = 'bus|rail';
        opts.transit_routing_preference = 'fewer_transfers'
    }

    await googleMapsClient.directions(opts).asPromise().then(resp => {
        ctx.body = resp.json
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
