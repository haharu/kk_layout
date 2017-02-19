import webpack from 'webpack'
import path from 'path';
import _ from 'lodash';

import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';

import devConfig from './webpack-dev-server.config';

import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import compress from 'koa-compress';
import zlib from 'zlib'
import responseTime from 'koa-response-time';
import bodyParser from 'koa-bodyparser';

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

import proxy from 'koa-proxy'

const app = new Koa();

const _use = app.use;
app.use = x => _use.call(app, convert(x))

app.use(proxy({
    host: `http://${config.apiHost}:${config.apiPort}`,
    match: /^\/api\//
}))

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
