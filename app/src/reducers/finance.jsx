const REQUEST_FINANCE = 'REQUEST_FINANCE'
const RECEIVE_FINANCE = 'RECEIVE_FINANCE'
const INVALIDATE_FINANCE = 'INVALIDATE_FINANCE'

import {opaqueParser, chartTranc} from '../helpers'

function finance(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_FINANCE:
            return Object.assign({}, state, {didInvalidate: true})
        case REQUEST_FINANCE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_FINANCE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.data,
                lastUpdated: action.receiveAt
            })
        default:
            return state
    }
}


export default function reducer(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_FINANCE:
        case RECEIVE_FINANCE:
        case REQUEST_FINANCE:
            return Object.assign({}, state, {
                [action.currency]: finance(state[action.currency], action)
            })
        default:
            return state
    }
}

export function requestFinance(currency) {
    return {type: REQUEST_FINANCE, currency}
}

export function receiveFinance(currency, json) {
    return {type: RECEIVE_FINANCE, currency, data: json, receiveAt: Date.now()}
}

export function invalidateFinance(currency) {
    return {type: INVALIDATE_FINANCE, currency}
}

function fetchFinance(currency, url) {
    return dispatch => {
        dispatch(requestFinance(currency))
        return fetch(url)
        .then(resp => resp.text())
        .then(row => opaqueParser(row))
        .then(data => dispatch(receiveFinance(currency, chartTranc(data))))
    }
}

export function fetchFinanceIfNeeded(currency) {
    return (dispatch, getState) => {
        const url = `https://www.google.com/finance/getprices?q=${currency}&x=CURRENCY&i=86400&p=1M`;
        const state = getState();

        if (state.finance && !finance.isFetching) {
            return dispatch(fetchFinance(currency, url));
        }

    }
}
