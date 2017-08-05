import Koa from 'koa';
import convert from 'koa-convert';
import compress from 'koa-compress';
import zlib from 'zlib';
import responseTime from 'koa-response-time';
import bodyParser from 'koa-bodyparser';

import session from 'koa-session';
import redis from 'koa-redis';

import config from './config';
import redisConfig from './cert/redis';

const app = new Koa();

const _use = app.use;
app.use = (x) => _use.call(app, convert(x));

app.use(compress({threshold: 2048, flush: zlib.Z_SYNC_FLUSH}));

app.use(responseTime());

app.use(bodyParser({formLimit: '50mb'}));

app.keys = ['secret'];
app.proxy = true;

app.use(session({
    key: 'SID',
    store: redis(redisConfig),
}, app));

app.listen(config.apiPort, function(err) {
    if (err) {
        console.log(err);
        return;
    }
});

console.log('Listening at port ' + config.apiPort);
