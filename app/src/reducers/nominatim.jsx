const CHANGE_SEARCH_TXT = 'CHANGE_SEARCH_TXT';
const CHANGE_PLACE = 'CHANGE_PLACE';
const REQUEST_TEXT_SEARCH = 'REQUEST_TEXT_SEARCH';
const RECEIVE_TEXT_SEARCH = 'RECEIVE_TEXT_SEARCH';
const REQUEST_AUTOCOMPLETE = 'REQUEST_AUTOCOMPLETE';
const RECEIVE_AUTOCOMPLETE = 'RECEIVE_AUTOCOMPLETE';
const REQUEST_PLACE_DETAIL = 'REQUEST_PLACE_DETAIL';
const RECEIVE_PLACE_DETAIL = 'RECEIVE_PLACE_DETAIL';
const REQUEST_NEARBY_SEARCH = 'REQUEST_NEARBY_SEARCH';
const RECEIVE_NEARBY_SEARCH = 'RECEIVE_NEARBY_SEARCH';

import request from 'superagent';

export default function reducer(state = {
    searchTxt: '',
    placeId: '',
    predictions: [],
    autocomplete: [],
    place: {},
    isFetching: false
}, action) {
    switch (action.type) {
        case CHANGE_SEARCH_TXT:
            return Object.assign({}, state, {
                searchTxt: action.searchTxt,
                isFetching: false
            })
        case CHANGE_PLACE:
            return Object.assign({}, state, {
                place: action.place,
                isFetching: false
            })
        case REQUEST_TEXT_SEARCH:
        case REQUEST_AUTOCOMPLETE:
        case REQUEST_NEARBY_SEARCH:
            return Object.assign({}, state, {isFetching: true})
        case RECEIVE_TEXT_SEARCH:
            return Object.assign({}, state, {
                predictions: action.data,
                isFetching: false
            })
        case RECEIVE_AUTOCOMPLETE:
            return Object.assign({}, state, {
                autocomplete: action.data,
                isFetching: false
            })
        case RECEIVE_NEARBY_SEARCH:
            return Object.assign({}, state, {
                predictions: action.data,
                isFetching: false
            })
        default:
            return state
    }
}

export function changeSearchTxt(searchTxt) {
    return {type: CHANGE_SEARCH_TXT, searchTxt};
}

export function changePlace(place) {
    return {type: CHANGE_PLACE, place}
}

export function changePlaceId(placeId) {
    return {type: CHANGE_PLACE_ID, placeId}
}

export function requestTextSearch(searchTxt) {
    return {type: REQUEST_TEXT_SEARCH, searchTxt}
}

export function receiveTextSearch(searchTxt, data) {
    return {type: RECEIVE_TEXT_SEARCH, searchTxt, data}
}

export function requestAutocomplete(searchTxt) {
    return {type: REQUEST_AUTOCOMPLETE, searchTxt};
}

export function receiveAutocomplete(searchTxt, data) {
    return {type: RECEIVE_AUTOCOMPLETE, searchTxt, data};
}

export function requestNearbySearch(opts) {
    return {type: REQUEST_NEARBY_SEARCH, ...opts}
}

export function receiveNearbySearch(data) {
    return {type: RECEIVE_NEARBY_SEARCH, data}
}

function fetchAutocomplete(searchTxt) {
    const url = `/api/nominatim/search/${searchTxt}`

    return dispatch => {
        dispatch(requestAutocomplete(searchTxt))
        return fetch(url).then(resp => resp.json()).then(resp => {
            dispatch(receiveAutocomplete(searchTxt, resp))
            return resp
        }).catch(err => {
            console.log(err);
        });
    }
}

function fetchTextSearch(searchTxt) {
    const url = `/api/nominatim/search/${searchTxt}`

    return dispatch => {
        dispatch(requestTextSearch(searchTxt))
        return fetch(url).then(resp => resp.json()).then(resp => {
            dispatch(receiveTextSearch(searchTxt, resp))
            return resp
        }).catch(err => {
            console.log(err);
        })
    }
}

function fetchNearbySearch(opts) {
    return dispatch => {
        const url = `/api/overpass/nearbysearch`
        dispatch(requestNearbySearch(opts))
        return request.get(url).query(opts).ok(resp => resp.status < 500).then(resp => {
            dispatch(receiveNearbySearch(resp.body))
            return resp.body
        })
    }
}

export function fetchAutocompleteIfNeeded() {
    return (dispatch, getState) => {
        const {nominatim} = getState();
        if (!_.isEmpty(nominatim.searchTxt)) {
            return dispatch(fetchAutocomplete(nominatim.searchTxt));
        }
        return Promise.resolve()
    }
}

export function fetchTextSearchIfNeeded() {
    return (dispatch, getState) => {
        const {nominatim} = getState();
        if (!_.isEmpty(nominatim.searchTxt)) {
            return dispatch(fetchTextSearch(nominatim.searchTxt))
        }
        return Promise.resolve()
    }
}

export function fetchNearbySearchIfNeeded(opts) {
    return (dispatch,getState) => {
        return dispatch(fetchNearbySearch(opts))
    }
}
