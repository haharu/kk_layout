import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

import Routes from './route';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../helpers/Injection';

import PropTypes from 'prop-types';

export default class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }

    render() {
        const {store, history} = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <Routes/>
                    </MuiThemeProvider>
                </ConnectedRouter>
            </Provider>
        );
    }
}
