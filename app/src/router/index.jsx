import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {Router, Route} from 'react-router';

import App from '../containers/App'

const routes = (
    <Route path="/" component={App}>
        <Route path="*"/>
    </Route>
);

export default class Root extends Component {
    render() {
        const {store, history} = this.props;
        return (
            <Provider store={store}>
                <Router routes={routes} history={history}/>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
