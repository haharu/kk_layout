const CHANGE_DISTANCE_MATRIX_STATE = 'CHANGE_DISTANCE_MATRIX_STATE';
const REQUEST_DISTANCE_MATRIX = 'REQUEST_DISTANCE_MATRIX';
const RECEIVE_DISTANCE_MATRIX = 'RECEIVE_DISTANCE_MATRIX';
const REQUEST_DIRECTIONS = 'REQUEST_DIRECTIONS';
const RECEIVE_DIRECTIONS = 'RECEIVE_DIRECTIONS';

import request from 'superagent';

export default function reducer(state = {
    origin: '',
    destination: '',
    mode: 'driving',
    transit_mode: '',
    avoid: '',
    directions: {},
    distancematrix: {},
    isFetching: false
}, action) {
    switch (action.type) {
        case CHANGE_DISTANCE_MATRIX_STATE:
            return Object.assign({}, state, action.data)

        case REQUEST_DISTANCE_MATRIX:
        case REQUEST_DIRECTIONS:
            return Object.assign({}, state, {isFetching: true})
        case RECEIVE_DISTANCE_MATRIX:
            return Object.assign({}, state, {
                distancematrix: action.data,
                isFetching: false
            })
        case RECEIVE_DIRECTIONS:
            return Object.assign({}, state, {
                directions: action.data,
                isFetching: false
            })
        default:
            return state
    }
}

export function changeDistanceMatrixState(data) {
    return {type: CHANGE_DISTANCE_MATRIX_STATE, data}
}

export function requestDistanceMatrix(opts) {
    return {
        type: REQUEST_DISTANCE_MATRIX,
        ...opts
    }
}

export function receiveDistanceMatrix(data) {
    return {type: RECEIVE_DISTANCE_MATRIX, data}
}

export function requestDirections(opts) {
    return {
        type: REQUEST_DIRECTIONS,
        ...opts
    }
}

export function receiveDirections(data) {
    return {type: RECEIVE_DIRECTIONS, data}
}

function fetchDistanceMatrix(mapDirections) {
    const {
        directions,
        distancematrix,
        isFetching,
        ...opts
    } = mapDirections
    const url = `/api/map/distancematrix`

    return dispatch => {
        dispatch(requestDistanceMatrix(opts))
        return request.get(url).query(opts).ok(resp => resp.status < 500).then(resp => {
            dispatch(receiveDistanceMatrix(resp.body))
            return Promise.resolve(resp.body)
        })
    }
}

function fetchDirections(mapDirections) {
    const {
        directions,
        distancematrix,
        isFetching,
        ...opts
    } = mapDirections
    const url = `/api/map/directions`

    return dispatch => {
        dispatch(requestDirections(opts))
        return request.get(url).query(opts).ok(resp => resp.status < 500).then(resp => {
            dispatch(receiveDirections(resp.body))
            return Promise.resolve(resp.body)
        })
    }
}

export function fetchDistanceMatrixIfNeeded() {
    return (dispatch, getState) => {
        const {mapDirections} = getState();
        if (!_.isEmpty(mapDirections.origin) && !_.isEmpty(mapDirections.destination)) {
            return dispatch(fetchDistanceMatrix(mapDirections));
        }
        return Promise.resolve()
    }
}

export function fetchDirectionsIfNeeded() {
    return (dispatch, getState) => {
        const {mapDirections} = getState();
        if (!_.isEmpty(mapDirections.origin) && !_.isEmpty(mapDirections.destination)) {
            return dispatch(fetchDirections(mapDirections))
        }
        return Promise.resolve()
    }

}
