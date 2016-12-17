'use strict';

import "../sass/screen.scss";
import "babel-polyfill";

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, Link, browserHistory, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App'

import {fetchFinanceIfNeeded} from './actions/index'

injectTapEventPlugin();

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

if (typeof document !== 'undefined') {
    render((
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App}>
                    <Route path="*"/>
                </Route>
            </Router>
        </Provider>
    ), document.getElementById('app'));
}
