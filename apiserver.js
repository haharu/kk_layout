import _ from 'lodash';
import Koa from 'koa';
import convert from 'koa-convert';
import compress from 'koa-compress';
import zlib from 'zlib'
import responseTime from 'koa-response-time';
import bodyParser from 'koa-bodyparser';
import koaRouter from 'koa-router';

import config from './app/src/config';

import request from 'superagent';

const app = new Koa();
const router = koaRouter({prefix: '/api'});

const _use = app.use;
app.use = x => _use.call(app, convert(x))

app.use(compress({threshold: 2048, flush: zlib.Z_SYNC_FLUSH}));

app.use(responseTime())

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.apiPort, function(err) {
    if (err) {
        console.log(err);
        return;
    }
})

console.log('Listening at port ' + config.apiPort);
