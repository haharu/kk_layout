import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';

export class PrivateRoute extends Component {
    static propTypes = {
        component: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
        };
    }

    render() {
        let {
            component: Component,
            ...rest
        } = this.props;

        return (
            <Route {...rest} render={(props) => {
                return <Component {...props}/>;
            }}/>
        );
    }
}
