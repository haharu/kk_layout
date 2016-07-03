'use strict';

import "../www/stylesheets/screen.css";
import "babel-polyfill";

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Card from './components/Card';
import Level from './components/Level';
import Header from './components/Header';
import Footer from './components/Footer';

injectTapEventPlugin();

const App = ({children}) => {
    return (
        <div className="container">
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="card" component={Card}/>
            <Route path="level" component={Level}/>
            <Route path="*"/>
        </Route>
    </Router>
), document.getElementById('app'));
