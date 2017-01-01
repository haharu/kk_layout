const SELECT_CURRENCY = 'SELECT_CURRENCY';

export default function reducer(currency='TWDJPY', action) {
    switch (action.type) {
        case SELECT_CURRENCY:
            return action.currency
        default:
            return currency;
    }
}

export function selectCurrency(currency) {
    return {type: SELECT_CURRENCY, currency}
}
