import {opaqueParser, chartTranc} from '../helpers'

export const REQUEST_FINANCE = 'REQUEST_FINANCE'
export const RECEIVE_FINANCE = 'RECEIVE_FINANCE'
export const INVALIDATE_FINANCE = 'INVALIDATE_FINANCE'
export const SELECT_CURRENCY = 'SELECT_CURRENCY'

function requestFinance(currency) {
    return {type: REQUEST_FINANCE, currency}
}

function receiveFinance(currency, json) {
    return {type: RECEIVE_FINANCE, currency, data: json, receiveAt: Date.now()}
}

export function invalidateFinance(currency) {
    return {type: INVALIDATE_FINANCE, currency}
}

export function selectCurrency(currency) {
    return {type: SELECT_CURRENCY, currency}
}

function fetchFinance(currency, period ='1M') {
    return dispatch => {
        let options = {
            method: 'GET',
            headers: new Headers(),
            cache: 'default'
        };
        let url = `https://www.google.com/finance/getprices?q=${currency}&x=CURRENCY&i=86400&p=${period}`;
        let req = new Request(url, options)
        dispatch(requestFinance(currency))
        return fetch(req)
        .then(resp => resp.text())
        .then(row => opaqueParser(row))
        .then(data => dispatch(receiveFinance(currency, chartTranc(data))))
    }
}

function shouldFetchFinance(state, currency) {
    const finance = state.financeByGoogle[currency];
    if (!finance) {
        return true;
    }
    if (finance.isFetching) {
        return false;
    }
    return finance.didInvalidate
}

export function fetchFinanceIfNeeded(currency) {
    return (dispatch, getState) => {
        if (shouldFetchFinance(getState(), currency)) {
            return dispatch(fetchFinance(currency))
        }
    }
}
