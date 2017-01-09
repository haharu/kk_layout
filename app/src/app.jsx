'use strict';

import "../stylesheets/main.css";

import 'isomorphic-fetch'
import React from 'react';
import {render} from 'react-dom';

import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store/configureStore'

import {browserHistory} from 'react-router';

import Root from './router';

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Root store={store} history={history}/>, document.getElementById('app'));

if (module.hot) {
    module.hot.accept('./router', () => {
        const NewRoot = require('./router').default;
        render(
            <NewRoot store={store} history={history}/>, document.getElementById('app'));
    });
}
