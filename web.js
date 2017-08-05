import webpack from 'webpack';
import path from 'path';

import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';

import devConfig from './webpack-dev-server.config';

import Koa from 'koa';
import convert from 'koa-convert';
import staticCache from 'koa-static-cache';
import compress from 'koa-compress';
import zlib from 'zlib';
import responseTime from 'koa-response-time';
import bodyParser from 'koa-bodyparser';

import React from 'react';
import {renderToString} from 'react-dom/server';
import configureStore from './app/src/store/configureStore';
import config from './config';
import {createMemoryHistory} from 'history';
import Html from './app/src/helpers/Html';
import Routes from './app/src/router/route';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {StaticRouter} from 'react-router';

import proxy from 'koa-proxy';

const app = new Koa();

const _use = app.use;
app.use = (x) => _use.call(app, convert(x));

app.use(proxy({host: `http://${config.apiHost}:${config.apiPort}`, match: /^\/api\//}));

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

if (!config.isProduction) {
    const compile = webpack(devConfig);
    app.use(devMiddleware(compile, {
        noInfo: false,
        stats: {
            colors: true,
        },
        hot: true,
        quiet: true,
        inline: true,
        port: config.port,
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

    const context = {};

    const history = createMemoryHistory();
    const store = configureStore(history);
    const muiTheme = getMuiTheme({userAgent: ctx.request.headers['user-agent']});
    const component = (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <StaticRouter location={ctx.originalUrl} context={context}>
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <Routes/>
                    </MuiThemeProvider>
                </StaticRouter>
            </ConnectedRouter>
        </Provider>
    );
    const html = renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>);

    ctx.body = '<!doctype html>\n' + html;
});

app.listen(config.port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
});

console.log('Listening at port ' + config.port);
