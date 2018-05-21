require('es6-promise').polyfill();
require('isomorphic-fetch');

const responseMiddleware = (resp) => {
    let contentType = resp.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return resp.json();
    } else {
        return resp.text();
    }
};

export default (url, opts) => {
    return fetch(url, opts).then(responseMiddleware);
};

export const baseFetch = (url, opts) => {
    return fetch(url, opts);
};
