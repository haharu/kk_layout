'use strict';

import "../www/stylesheets/screen.css";
import "babel-polyfill";

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, Link, browserHistory, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Card from './components/Card';
import Level from './components/Level';
import Header from './components/Header';
import Footer from './components/Footer';
import Currency from './components/Currency';

injectTapEventPlugin();

const App = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
            <Footer className="margin-t-20"/>
        </div>
    )
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="card" component={Card}/>
            <Route path="level" component={Level}/>
            <Route path="finance" component={Currency}/>
            <Route path="*"/>
        </Route>

    </Router>
), document.getElementById('app'));
