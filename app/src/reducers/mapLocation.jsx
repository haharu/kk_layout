const CHANGE_SEARCH_TXT = 'CHANGE_SEARCH_TXT';
const CHANGE_PLACE_ID = 'CHANGE_PLACE_ID';
const CHANGE_DISTANCE_MATRIX_STATE = 'CHANGE_DISTANCE_MATRIX_STATE';
const REQUEST_TEXT_SEARCH = 'REQUEST_TEXT_SEARCH';
const RECEIVE_TEXT_SEARCH = 'RECEIVE_TEXT_SEARCH';
const REQUEST_AUTOCOMPLETE = 'REQUEST_AUTOCOMPLETE';
const RECEIVE_AUTOCOMPLETE = 'RECEIVE_AUTOCOMPLETE';
const REQUEST_PLACE_DETAIL = 'REQUEST_PLACE_DETAIL';
const RECEIVE_PLACE_DETAIL = 'RECEIVE_PLACE_DETAIL';

import request from 'superagent';

export default function reducer(state = {
    searchTxt: '',
    placeId: '',
    predictions: {},
    placeDetail: {},
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
        case REQUEST_AUTOCOMPLETE:
        case REQUEST_PLACE_DETAIL:
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
            return deepAssign({}, state, {
                placeDetail: {
                    [action.placeId]: action.data
                },
                isFetching: false
            })
        default:
            return state
    }
}

export function changeSearchTxt(searchTxt) {
    return {type: CHANGE_SEARCH_TXT, searchTxt};
}

export function changePlaceId(placeId) {
    return {type: CHANGE_PLACE_ID, placeId};
}

export function requestTextSearch(searchTxt) {
    return {type: REQUEST_TEXT_SEARCH, searchTxt}
}

export function receiveTextSearch(searchTxt, data) {
    return {type: RECEIVE_TEXT_SEARCH, searchTxt, data: data.results}
}

export function requestAutocomplete(searchTxt) {
    return {type: REQUEST_AUTOCOMPLETE, searchTxt};
}

export function receiveAutocomplete(searchTxt, data) {
    return {type: RECEIVE_AUTOCOMPLETE, searchTxt, data: data.predictions};
}

export function requestPlaceDetail(placeId) {
    return {type: REQUEST_PLACE_DETAIL, placeId}
}

export function receivePlaceDetail(placeId, data) {
    return {type: RECEIVE_PLACE_DETAIL, placeId, data: data.result}
}


function fetchPlaceDetail(placeId) {
    const url = `/map/place/detail/${placeId}`

    return (dispatch, getState) => {
        dispatch(requestPlaceDetail(placeId))
        return fetch(url).then(resp => resp.json()).then(resp => {
            dispatch(receivePlaceDetail(placeId, resp.json()))
        }).catch(err => {
            console.log(err);
        })
    }
}

function fetchAutocomplete(searchTxt) {
    const url = `/map/autocomplete/${searchTxt}`

    return dispatch => {
        dispatch(requestAutocomplete(searchTxt))
        return fetch(url).then(resp => resp.json()).then(resp => {
            dispatch(receiveAutocomplete(searchTxt, resp.json()))
        }).catch(err => {
            console.log(err);
        });
    }
}

function fetchTextSearch(searchTxt) {
    const url = `/map/place/textsearch/${searchTxt}`

    return dispatch => {
        dispatch(requestTextSearch(searchTxt))
        return fetch(url).then(resp => resp.json()).then(resp => {
            dispatch(receiveTextSearch(searchTxt, resp))
        }).catch(err => {
            console.log(err);
        })
    }
}

export function fetchPlaceDetailIfNeeded() {
    return (dispatch, getState) => {
        const {mapLocation} = getState();
        if (mapLocation.placeId && !_.has(mapLocation.placeDetail, mapLocation.placeId)) {
            return dispatch(fetchPlaceDetail(mapLocation.placeId));
        } else {
            return Promise.resolve();
        }
    }
}
export function fetchAutocompleteIfNeeded() {
    return (dispatch, getState) => {
        const {mapLocation} = getState();
        if (!_.isEmpty(mapLocation.searchTxt)) {
            return dispatch(fetchAutocomplete(mapLocation.searchTxt));
        }
    }
}

export function fetchTextSearchIfNeeded() {
    return (dispatch, getState) => {
        const {mapLocation} = getState();
        if (!_.isEmpty(mapLocation.searchTxt)) {
            return dispatch(fetchTextSearch(mapLocation.searchTxt))
        }
    }
}
