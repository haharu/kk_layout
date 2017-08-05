import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import * as authActions from '../reducers/auth';
import {getCurrentUser} from '../helpers/Auth';
import PropTypes from 'prop-types';

@connect((state) => {
    return {auth: state.auth};
})
export class PrivateRoute extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        component: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            redirectToReferrer: false,
        };
    }

    componentDidMount() {
        getCurrentUser().then((resp) => {
            if (resp && resp.uid) {
                this.dispatch(authActions.signIn(resp));
            } else {
                this.dispatch(authActions.signOut());
            }
            this.setState({redirectToReferrer: true});
        });
    }

    render() {
        let {
            component: Component,
            auth: {
                currentUser,
            },
            ...rest
        } = this.props;

        let {redirectToReferrer} = this.state;

        return (
            <Route {...rest} render={(props) => {
                return redirectToReferrer && !currentUser
                    ? (<Redirect to={{
                        pathname: '/signin',
                        state: {
                            from: props.location,
                        },
                    }}/>)
                    : (<Component {...props}/>);
            }}/>
        );
    }
}
