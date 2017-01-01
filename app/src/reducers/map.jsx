const CHANGE_SEARCH_TXT = 'CHANGE_SEARCH_TXT';
const REQUEST_LOCATION = 'REQUEST_LOCATION';
const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
const INVALID_LOCATION = 'INVALID_LOCATION';
const LOCATE_PLACE = 'LOCATE_PLACE';
const INVALID_PLACE = 'INVALID_PLACE';
const REQUEST_GEO_CONV = 'REQUEST_GEO_CONV';
const RECEIVE_GEO_CONV = 'RECEIVE_GEO_CONV';
const INVALID_GEO = 'INVALID_GEO';

import rp from 'request-promise';

const baseUrl = window.location.protocol + '//' + window.location.host;

export default function reducer(state = {
    searchTxt: '',
    location: {},
    currLocation: {},
    isFetching: false
}, action) {
    switch (action.type) {
        case CHANGE_SEARCH_TXT:
        case INVALID_LOCATION:
            return Object.assign({}, state, {
                searchTxt: action.searchTxt,
                isFetching: false
            })
        case REQUEST_LOCATION:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_LOCATION:
            return Object.assign({}, state, {
                location: action.data,
                isFetching: false
            })
        case LOCATE_PLACE:
            return Object.assign({}, state, {})
        case REQUEST_GEO_CONV:
            return Object.assign({}, state, {
                currLocation: {
                    geo: action.geo
                }
            })
        case RECEIVE_GEO_CONV:
            return Object.assign({}, state, {
                currLocation: {
                    geo: action.geo,
                    coord: action.coord
                }
            })

        default:
            return state
    }
}

export function requestLocation(searchTxt) {
    return {type: REQUEST_LOCATION, searchTxt};
}

export function receiveLocation(searchTxt, json) {
    return {type: RECEIVE_LOCATION, searchTxt, data: json};
}

export function invalidLocation(searchTxt) {
    return {type: INVALID_LOCATION, searchTxt}
}

export function changeSearchTxt(searchTxt) {
    return {type: CHANGE_SEARCH_TXT, searchTxt};
}

export function locatePlace(location) {
    return {type: LOCATE_PLACE, location}
}

export function requestGeoConv(geo) {
    return {type: REQUEST_GEO_CONV, geo}
}

export function receiveGeoConv(geo, coord) {
    return {type: RECEIVE_GEO_CONV, geo, coord}
}

export function invalidGeo(geo) {
    return {type: INVALID_GEO, geo}
}

function fetchGeo2Coord(geo) {
    let _geo = _.split(geo, /[\|\,\;]/g)
    const opts = {
        uri: baseUrl + '/map/geoconv',
        qs: {
            geoX: _geo[1],
            geoY: _geo[2]
        }
    }

    return dispatch => {
        dispatch(requestGeoConv(geo))
        rp(opts).then(resp => {
            dispatch(receiveGeoConv(geo, resp))
        }).catch(err => {
            console.log(err);
            dispatch(invalidGeo(geo));
        })
    }
}

function fetchLocation(searchTxt) {
    const opts = {
        uri: baseUrl + '/map/locate/' + searchTxt,
        json: true
    }

    return dispatch => {
        dispatch(requestLocation(searchTxt))
        rp(opts).then(resp => {
            dispatch(receiveLocation(searchTxt, resp))
            return resp;
        }).then(location => {
            if (_.size(location.content) === 1) {
                let {geo} = location.content[0]
                dispatch(fetchGeo2CoordIfNeeded(geo))
            }
        }).catch(err => {
            console.log(err);
            dispatch(invalidLocation(searchTxt))
        });
    }
}

export function fetchGeo2CoordIfNeeded(geo) {
    return (dispatch, getState) => {
        const state = getState();
        return dispatch(fetchGeo2Coord(geo));
    }
}
export function fetchLocationIfNeeded() {
    return (dispatch, getState) => {
        const state = getState();
        return dispatch(fetchLocation(state.map.searchTxt));
    }
}
