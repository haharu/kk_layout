import React, {Component} from 'react'
import {Route, Link} from 'react-router'
import App from '../containers/App'

export default(
    <Route path="/" component={App}>
        <Route path="app" component={App}/>
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
