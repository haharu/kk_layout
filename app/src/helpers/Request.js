import request from 'Root/helpers/Request';
import config from 'Root/config';

export default (url, opts) => {
    if (config.isNode) {
        // url = `http://${config.host}:${config.port}${url}`;
        // TODO: prevent request for preload state, do it at browser
        return Promise.reject('do not load on server');
    }

    return request(url, {
        credentials: 'include',
        ...opts,
    });
};

export const requestWithoutCredentials = (url, opts) => {
    if (config.isNode) {
        // url = `http://${config.host}:${config.port}${url}`;
        // TODO: prevent request for preload state, do it at browser
        return Promise.reject('do not load on server');
    }

    return request(url, opts);
};
