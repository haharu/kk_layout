import webpack from 'webpack'
import path from 'path';

import kwdm from 'koa-webpack-dev-middleware';
import kwhm from 'koa-webpack-hot-middleware';
import devConfig from './webpack-dev-server.config.js';
import prodConfig from './webpack-production.config.js';
import Koa from 'koa';
import convert from 'koa-convert';

let PORT = process.env.PORT || 3000;
let NODE_ENV = process.env.NODE_ENV  || 'development';

const app = new Koa();
const compile = webpack(NODE_ENV === 'production' && prodConfig || devConfig);

const _use = app.use
app.use = x => _use.call(app, convert(x))

app.use(kwdm(compile, {
    // display no info to console (only warnings and errors)
    noInfo: false,

    // display nothing to the console
    quiet: false,

    // switch into lazy mode
    // that means no watching, but recompilation on every request
    lazy: true,

    // public path to bind the middleware to
    // use the same as in webpack
    // publicPath: path.join(__dirname, 'build'),

    // custom headers
    // headers: {
    //     'Access-Control-Allow-Origin': '*'
    // },

    // options for formating the statistics
    stats: {
        colors: true
    }
}));

app.use(kwhm(compile));


// set the initial content
app.use(async(ctx, next) => {
    try {
        await next(); // next is now a function
    } catch (err) {
        ctx.body = {
            message: err.message
        };
        ctx.status = err.status || 500;
    }
})

app.listen(PORT, function(err) {
    if (err) {
        console.log(err);
        return;
    }
});
console.log('Listening at port ' + PORT);
