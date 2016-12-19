import webpack from 'webpack'
// import webpackMiddleware from 'webpack-dev-middleware';
import kwdm from 'koa-webpack-dev-middleware';
import kwhm from 'koa-webpack-hot-middleware';
import devConfig from './webpack-dev-server.config.js'
import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';

const app = new Koa();
const compile = webpack(devConfig)
app.use(convert(kwdm(compile, {
    // display no info to console (only warnings and errors)
    noInfo: false,

    // display nothing to the console
    quiet: false,

    // switch into lazy mode
    // that means no watching, but recompilation on every request
    lazy: true,

    // public path to bind the middleware to
    // use the same as in webpack
    publicPath: "./build/",

    // custom headers
    headers: {
        'Access-Control-Allow-Origin': '*'
    },

    // options for formating the statistics
    stats: {
        colors: true
    }
})));

app.use(convert(kwhm(compile, {

})));

// serve static files e.g. bundle.js
app.use(serve('./build'));

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

app.listen(3000, function(err) {
    if (err) {
        console.log(err);
        return;
    }
});
console.log('Listening at port 3000');
