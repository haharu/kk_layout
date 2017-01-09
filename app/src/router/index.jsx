import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {ReduxAsyncConnect} from 'redux-connect'

import routes from './route'

export default class Root extends Component {
    render() {
        const {store, history} = this.props;
        return (
            <Provider store={store}>
                <Router render={(props) => {
                    return <ReduxAsyncConnect {...props}/>
                }} routes={routes} history={history}/>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
