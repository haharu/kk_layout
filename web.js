import webpack from 'webpack';
import path from 'path';

import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';

import devConfig from './webpack-dev-server.config';

import http2 from 'http2';
import Koa from 'koa';
import fs from 'fs';
import convert from 'koa-convert';
import staticCache from 'koa-static-cache';
import compress from 'koa-compress';
import zlib from 'zlib';
import responseTime from 'koa-response-time';
import bodyParser from 'koa-bodyparser';

import React from 'react';
import {renderToNodeStream} from 'react-dom/server';
import config from './config';

import Html from './app/src/helpers/Html';
import Routes from './app/src/router/route';

import multistream from 'multistream';
import stringToStream from 'string-to-stream';

import {StaticRouter} from 'react-router';
import send from 'koa-send';

import {baseFetch} from 'Root/helpers/Request';

import {ApolloProvider, getDataFromTree} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import Loadable from 'react-loadable';

const app = new Koa();

const _use = app.use;
app.use = (x) => _use.call(app, convert(x));

app.use(compress({threshold: 2048, flush: zlib.Z_SYNC_FLUSH}));

app.use(responseTime());

app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

// middleware for favicon
app.use(async (ctx, next) => {
    if ('/favicon.ico' === ctx.path) {
        await send(ctx, './favicon.png');
        return;
    }

    await next();
});

if (!config.isProduction) {
    const compile = webpack(devConfig);
    app.use(devMiddleware(compile, {
        compress: true,
        hot: true,
        inline: true,
        quiet: true,
        https: true,
        progress: true,
        publicPath: devConfig.output.publicPath,
    }));

    app.use(hotMiddleware(compile));
} else {
    const files = {};
    app.use(staticCache(path.join(__dirname, 'dist'), {}, files));
}

app.use(async (ctx, next) => {
    if (!config.isProduction) {
        webpackIsomorphicTools.refresh();
    }

    const client = new ApolloClient({
        ssrMode: true,
        link: new HttpLink({
            uri: `${config.gqlApiURL}/graphql`,
            fetch: baseFetch,
        }),
        cache: new InMemoryCache(),
    });

    const context = {};

    const modules = [];
    const Component = (
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
            <ApolloProvider client={client}>
                <StaticRouter location={ctx.originalUrl} context={context}>
                    <Routes />
                </StaticRouter>
            </ApolloProvider>
        </Loadable.Capture>
    );

    await getDataFromTree(Component);

    const html = renderToNodeStream(<Html assets={webpackIsomorphicTools.assets()} component={Component} state={client.extract()} />);

    ctx.type = 'html';
    ctx.body = multistream([stringToStream('<!DOCTYPE html>\n'), html]);
});

http2.createSecureServer({
    key: fs.readFileSync(process.env.SERVER_CERT_KEY_PATH),
    cert: fs.readFileSync(process.env.SERVER_CERT_PATH),
    allowHTTP1: true,
}, app.callback()).listen(config.port, () => {
    console.log('Listening at port ' + config.port);
});
