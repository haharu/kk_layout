import React from 'react'
import {Route, Link, IndexRedirect, IndexRoute} from 'react-router'
import App, {PageNotFound, Home} from '../containers/App'
import Map from '../containers/Map'
import Temp from '../containers/Temp'
import {Locate} from '../components/LeftCard'
import Header from '../components/Header'

export default(
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="bmap" component={Map}>
            <IndexRedirect to="/bmap/locate"/>
            <Route path="locate" component={Locate}/>
            <Route path="*" component={PageNotFound}/>
        </Route>
        <Route path="temp-page">
            <IndexRoute component={Temp}/>
            <Route path="*" component={() => (
                <div><Header/><PageNotFound/></div>
            )}/>
        </Route>
        <Route path="*" component={() => (
            <div><Header/><PageNotFound/></div>
        )}/>
    </Route>
);
