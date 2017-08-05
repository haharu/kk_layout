require('es6-promise').polyfill();
require('isomorphic-fetch');


export default(url, opts) => {
    return fetch(url, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        ...opts,
    }).then((resp) => {
        let contentType = resp.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return resp.json();
        } else {
            return resp.text();
        }
    });
};
