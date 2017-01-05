const CHANGE_SEARCH_TXT = 'CHANGE_SEARCH_TXT';
const CHANGE_PLACE_ID = 'CHANGE_PLACE_ID';
const INVALID_TEXT_SEARCH = 'INVALID_TEXT_SEARCH';
const INVALID_AUTOCOMPLETE = 'INVALID_AUTOCOMPLETE';
const INVALID_PLACE_DETAIL = 'INVALID_PLACE_DETAIL';
const REQUEST_TEXT_SEARCH = 'REQUEST_TEXT_SEARCH';
const RECEIVE_TEXT_SEARCH = 'RECEIVE_TEXT_SEARCH';
const REQUEST_AUTOCOMPLETE = 'REQUEST_AUTOCOMPLETE';
const RECEIVE_AUTOCOMPLETE = 'RECEIVE_AUTOCOMPLETE';
const REQUEST_PLACE_DETAIL = 'REQUEST_PLACE_DETAIL';
const RECEIVE_PLACE_DETAIL = 'RECEIVE_PLACE_DETAIL';
const REQUEST_BAIDU_LOCATION = 'REQUEST_BAIDU_LOCATION';
const RECEIVE_BAIDU_LOCATION = 'RECEIVE_BAIDU_LOCATION';
const INVALID_BAIDU_LOCATION = 'INVALID_BAIDU_LOCATION'

import rp from 'request-promise';

const baseUrl = window.location.protocol + '//' + window.location.host;

export default function reducer(state = {
    searchTxt: '',
    placeId: '',
    predictions: {},
    placeDetail: {},
    location: {},
    isFetching: false
}, action) {
    switch (action.type) {
        case CHANGE_SEARCH_TXT:
            return Object.assign({}, state, {
                searchTxt: action.searchTxt,
                isFetching: false
            })
        case CHANGE_PLACE_ID:
            return Object.assign({}, state, {
                placeId: action.placeId,
                isFetching: false
            })
        case REQUEST_TEXT_SEARCH:
        case INVALID_TEXT_SEARCH:
        case REQUEST_AUTOCOMPLETE:
        case INVALID_AUTOCOMPLETE:
        case REQUEST_PLACE_DETAIL:
        case INVALID_PLACE_DETAIL:
        case REQUEST_BAIDU_LOCATION:
        case INVALID_BAIDU_LOCATION:
            return Object.assign({}, state, {isFetching: true})
        case RECEIVE_TEXT_SEARCH:
            return Object.assign({}, state, {
                predictions: action.data,
                isFetching: false
            })
        case RECEIVE_AUTOCOMPLETE:
            return Object.assign({}, state, {
                predictions: action.data,
                isFetching: false
            })
        case RECEIVE_PLACE_DETAIL:
            return Object.assign({}, state, {
                placeDetail: {
                    [action.placeId]: action.data
                },
                isFetching: false
            })
        case RECEIVE_BAIDU_LOCATION:
            return Object.assign({}, state, {
                location: action.data,
                isFetching: false
            })
        default:
            return state
    }
}

export function requestTextSearch(searchTxt) {
    return {type: REQUEST_TEXT_SEARCH, searchTxt}
}

export function receiveTextSearch(searchTxt, data) {
    return {type: RECEIVE_TEXT_SEARCH, searchTxt, data: data.results}
}

export function invalidTextSearch(searchTxt) {
    return {type: INVALID_TEXT_SEARCH, searchTxt}
}

export function requestAutocomplete(searchTxt) {
    return {type: REQUEST_AUTOCOMPLETE, searchTxt};
}

export function receiveAutocomplete(searchTxt, data) {
    return {type: RECEIVE_AUTOCOMPLETE, searchTxt, data: data.predictions};
}

export function invalidAutocomplete(searchTxt) {
    return {type: INVALID_AUTOCOMPLETE, searchTxt}
}

export function changeSearchTxt(searchTxt) {
    return {type: CHANGE_SEARCH_TXT, searchTxt};
}

export function changePlaceId(placeId) {
    return {type: CHANGE_PLACE_ID, placeId};
}

export function requestPlaceDetail(placeId) {
    return {type: REQUEST_PLACE_DETAIL, placeId}
}

export function receivePlaceDetail(placeId, data) {
    return {type: RECEIVE_PLACE_DETAIL, placeId, data: data.result}
}

export function invalidPlaceDetail(placeId) {
    return {type: INVALID_PLACE_DETAIL, placeId}
}

export function requestBaiduLocation(geometry) {
    return {type: REQUEST_BAIDU_LOCATION, geometry}
}

export function receiveBaiduLocation(geometry, data) {
    return {type: RECEIVE_BAIDU_LOCATION, geometry, data}
}

export function invalidBaiduLocation(geometry) {
    return {type: INVALID_BAIDU_LOCATION, geometry}
}

function fetchBaiduLocation(geometry) {
    let {lng, lat} = geometry
    const opts = {
        uri: baseUrl + '/map/geoconv',
        qs: {
            lng,
            lat
        },
        json: true
    }
    return dispatch => {
        dispatch(requestBaiduLocation(geometry))
        return rp(opts).then(resp => {
            dispatch(receiveBaiduLocation(geometry, resp))
        }).catch(err => {
            console.log(err);
            dispatch(invalidBaiduLocation(geometry))
        })
    }
}

function fetchPlaceDetail(placeId) {

    const opts = {
        uri: baseUrl + '/map/place/detail/' + placeId,
        json: true
    }

    return (dispatch, getState) => {
        dispatch(requestPlaceDetail(placeId))
        return rp(opts).then(resp => {
            dispatch(receivePlaceDetail(placeId, resp))
        }).catch(err => {
            console.log(err);
            dispatch(invalidPlaceDetail(placeId));
        })
    }
}

function fetchAutocomplete(searchTxt) {
    const opts = {
        uri: baseUrl + '/map/autocomplete/' + searchTxt,
        json: true
    }

    return dispatch => {
        dispatch(requestAutocomplete(searchTxt))
        return rp(opts).then(resp => {
            dispatch(receiveAutocomplete(searchTxt, resp))
        }).catch(err => {
            console.log(err);
            dispatch(invalidAutocomplete(searchTxt))
        });
    }
}

function fetchTextSearch(searchTxt) {
    const opts = {
        uri: baseUrl + '/map/place/textsearch/' + searchTxt,
        json: true
    }
    return dispatch => {
        dispatch(requestTextSearch(searchTxt))
        return rp(opts).then(resp => {
            dispatch(receiveTextSearch(searchTxt, resp))
        }).catch(err => {
            console.log(err);
            dispatch(invalidTextSearch(searchTxt))
        })
    }
}

export function fetchBaiduLocationIfNeeded() {
    return (dispatch, getState) => {
        const {map} = getState();
        if (!_.isEmpty(map.placeDetail) && !_.has(map.location, map.placeId)) {
            return dispatch(fetchBaiduLocation(map.placeDetail[map.placeId].geometry.location));
        } else {
            return Promise.resolve();
        }
    }
}

export function fetchPlaceDetailIfNeeded() {
    return (dispatch, getState) => {
        const {map} = getState();
        if (map.placeId && !_.has(map.placeDetail, map.placeId)) {
            return dispatch(fetchPlaceDetail(map.placeId));
        } else {
            return Promise.resolve();
        }
    }
}
export function fetchAutocompleteIfNeeded() {
    return (dispatch, getState) => {
        const {map} = getState();
        if (_.trim(map.searchTxt)) {
            return dispatch(fetchAutocomplete(map.searchTxt));
        }
    }
}

export function fetchTextSearchIfNeeded() {
    return (dispatch, getState) => {
        const {map} = getState();
        if (_.trim(map.searchTxt)) {
            return dispatch(fetchTextSearch(map.searchTxt))
        }
    }
}
