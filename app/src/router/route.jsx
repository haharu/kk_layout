import React from 'react'
import {Route, Link, IndexRedirect, IndexRoute} from 'react-router'
import App, {PageNotFound, Home} from '../containers/App'
import Map from '../containers/Map'
import Temp, {Temp1, Temp2, Temp3} from '../containers/Temp'
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
        <Route path="temp-page" component={Temp}>
            <IndexRedirect to="/temp-page/1"/>
            <Route path="/temp-page/1" component={Temp1}/>
            <Route path="/temp-page/2" component={Temp2}/>
            <Route path="/temp-page/3" component={Temp3}/>
            <Route path="*" component={PageNotFound}/>
        </Route>
        <Route path="*" component={() => (
            <div><Header/><PageNotFound/></div>
        )}/>
    </Route>
);
