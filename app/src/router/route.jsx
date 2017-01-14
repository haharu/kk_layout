import React from 'react'
import {Route, Link, IndexRedirect, IndexRoute} from 'react-router'
import App, {PageNotFound, Home} from '../containers/App'
import Map from '../containers/Map'
import {Locate, MapRoute} from '../components/LeftCard'

export default(
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="bmap">
            <IndexRedirect to="/bmap/locate"/>
            <Route path="locate" component={Locate}/>
            <Route path="route" component={MapRoute}/>
        </Route>
        <Route path="*" component={PageNotFound}/>
    </Route>
);
