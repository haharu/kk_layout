'use strict';

import 'Assets/stylesheets/main.css';

import _ from 'lodash';
window._ = _;

import React from 'react';
import {render} from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';

import Root from './router';

const history = createHistory();
const store = configureStore(history, window.__INITIAL_STATE__);

render(
    <Root store={store} history={history}/>, document.getElementById('app'));

if (module.hot) {
    module.hot.accept('./router', () => {
        const NewRoot = require('./router').default;
        render(
            <NewRoot store={store} history={history}/>, document.getElementById('app'));
    });
}
