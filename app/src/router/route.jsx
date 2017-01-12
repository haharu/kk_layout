import React, {Component} from 'react'
import {Route, Link, IndexRedirect} from 'react-router'
import App from '../containers/App'
import Map, {Locate} from '../containers/Map'

export default(
    <Route path="/" component={App}>
        <Route path="bmap" component={Map}>
            <IndexRedirect to="/bmap/locate" />
            <Route path="locate" component={Locate} />
        </Route>
        <Route path="*" component={PageNotFound}/>
    </Route>
);

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h1>Page Not Found.</h1>
                <p>Go to
                    <Link to="/">Home Page</Link>
                </p>
            </div>
        )
    }
}
