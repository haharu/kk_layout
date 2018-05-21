'use strict';

import 'Assets/stylesheets/main.css';

import _ from 'lodash';
window._ = _;

import React from 'react';
import {hydrate} from 'react-dom';
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import Loadable from 'react-loadable';

import Root from './router';

Loadable.preloadReady().then(() => {
    hydrate(<Root />, document.getElementById('app'));
});

// if ('serviceWorker' in navigator) {
//     runtime.register();
// }
