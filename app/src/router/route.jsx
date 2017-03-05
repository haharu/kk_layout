import React from 'react'
import {Route, Link, IndexRedirect, IndexRoute} from 'react-router'
import App, {PageNotFound, Home} from '../containers/App'
import Header from '../components/Header'

export default(
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="*" component={() => (
            <div><Header/><PageNotFound/></div>
        )}/>
    </Route>
);
