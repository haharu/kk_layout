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
import qo from 'query-overpass';

import googleMapService from '@google/maps'
const googleMapsClient = googleMapService.createClient({key: 'AIzaSyCWF9rxrnc0Lxx5YuhojPNhO-kY3aflIXE', Promise: Promise});

const app = new Koa();
const router = koaRouter({prefix: '/api'});

const _use = app.use;
app.use = x => _use.call(app, convert(x))

app.use(compress({threshold: 2048, flush: zlib.Z_SYNC_FLUSH}));

app.use(responseTime())

app.use(bodyParser());

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

    await googleMapsClient.placesPhoto({
        photoreference: ctx.params.ref,
        maxheight: _.toNumber(ctx.params.maxheight),
        maxwidth: _.toNumber(ctx.params.maxwidth)
    }).asPromise().then(resp => {
        ctx.body = resp
    })

}).get('/map/nearbysearch', async(ctx, next) => {
    let {location, radius, types} = ctx.query
    await googleMapsClient.placesNearby({location, radius: _.toNumber(radius), type: types}).asPromise().then(resp => {
        ctx.body = resp.json.results
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

router.get('/nominatim/search/:input', async(ctx, next) => {
    const url = `http://nominatim.openstreetmap.org/search`
    const opts = {
        q: ctx.params.input,
        format: 'json',
        addressdetails: 1,
        limit: 5
    }

    await request.get(url).query(opts).ok(resp => resp.status < 500).then(resp => {
        ctx.body = resp.body
    })
}).get('/nominatim/nearbysearch', async(ctx, next) => {
    const url = `http://nominatim.openstreetmap.org/search`
    const opts = {
        q: `${ctx.query.types} neer [${_.toNumber(ctx.query.lat)},${_.toNumber(ctx.query.lon)}]`,
        format: 'json',
        addressdetails: 1
    }

    await request.get(url).query(opts).ok(resp => resp.status < 500).then(resp => {
        ctx.body = resp.body
    })
}).get('/overpass/nearbysearch', async(ctx, next) => {
    const q = `[out:json];node(around:${_.toNumber(ctx.query.radius)},${_.toNumber(ctx.query.lat)},${_.toNumber(ctx.query.lon)})[name][amenity="${ctx.query.types}"];out;`;

    await new Promise((resolve, reject) => {
        qo(q, (err, resp) => {
            if (err) {
                reject(err)
            }
            return resolve(resp.features)
        })
    }).then(resp => {
        ctx.body = resp
    })
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.apiPort, function(err) {
    if (err) {
        console.log(err);
        return;
    }
})

console.log('Listening at port ' + config.apiPort);
