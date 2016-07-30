export const REQUEST_FINANCE = 'REQUEST_FINANCE'
export const RECEIVE_FINANCE = 'RECEIVE_FINANCE'

function requestFinance(finance) {
    return {type: REQUEST_FINANCE, finance}
}

function receiveFinance(finance, json) {
    return {type: RECEIVE_FINANCE, finance, data: json, receiveAt: Date.now()}
}

function fetchFinance(finance) {
    return dispatch => {
        dispatch(requestFinance(finance))
        return fetch(`http://www.google.com/finance/getprices?q=${finance}&x=CURRENCY&i=86400&p=1Y`).then(resp => resp.json()).then(json => dispatch(receiveFinance(finance, json)))
    }
}

function shouldFetchFinance(state, finance) {
    if (state) {}
}
export function fetchFinanceIfNeeded(finance) {
    return (dispatch, getState) => {
        if (shouldFetchFinance(getState, finance)) {
            return dispatch(fetchFinance(finance))
        }
    }
}
