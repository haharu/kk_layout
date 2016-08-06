import {REQUEST_FINANCE, RECEIVE_FINANCE, INVALIDATE_FINANCE, SELECT_CURRENCY} from '../actions'
import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'

function finance(state = {
    isFetching: false,
    didInvalidate: false,
    items: {}
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

function currency(state = 'TWDJPY', action) {
    switch (action.type) {
        case SELECT_CURRENCY:
            return action.currency
        default:
            return state
    }
}

function financeByGoogle(state = {}, action) {
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

const rootReducer = combineReducers({financeByGoogle, currency, routing});

export default rootReducer
