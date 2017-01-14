
const CHANGE_DISTANCE_MATRIX_STATE = 'CHANGE_DISTANCE_MATRIX_STATE';
const REQUEST_DISTANCE_MATRIX = 'REQUEST_DISTANCE_MATRIX';
const RECEIVE_DISTANCE_MATRIX = 'RECEIVE_DISTANCE_MATRIX';

import request from 'superagent';

export default function reducer(state = {
    origins: '',
    destinations: '',
    mode: '',
    transit_mode: '',
    avoid: '',
    directions: {},
    distancematrix: {},
    isFetching: false
}, action) {
    switch (action.type) {
        case CHANGE_DISTANCE_MATRIX_STATE:
            return Object.assign({}, state, {
                origins: action.data.origins,
                destinations: action.data.destinations,
                mode: action.data.mode,
                transit_mode: action.data.transit_mode,
                avoid: action.data.avoid
            })

        case REQUEST_DISTANCE_MATRIX:
            return Object.assign({}, state, {isFetching: true})
        case RECEIVE_DISTANCE_MATRIX:
            return Object.assign({}, state, {
                distancematrix: action.data,
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
    return {type: RECEIVE_DISTANCE_MATRIX, data: data.rows}
}

function fetchDistanceMatrix(mapDirections) {
    const {
        directions,
        distancematrix,
        ...opts
    } = mapDirections
    const url = `/map/distancematrix`

    return dispatch => {
        dispatch(requestDistanceMatrix(opts))
        return request.get(url).query(opts).end((err, resp) => {
            if (err) {
                console.log(err);
                return;
            }
            dispatch(receiveDistanceMatrix(resp.body))
        })
    }
}

export function fetchDistanceMatrixIfNeeded() {
    return (dispatch, getState) => {
        const {mapDirections} = getState();
        if (!_.isEmpty(mapDirections.origins) && !_.isEmpty(mapDirections.destinations)) {
            return dispatch(fetchDistanceMatrix(mapDirections));
        }
    }
}
