import React, {Component} from 'react';

import IconMenu from 'material-ui/IconMenu';
import {MoreVertButton} from '../components/Button';
import PropTypes from 'prop-types';

export class MoreVertMenu extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.onTouchTap = this.onTouchTap.bind(this);
        this.onRequestChange = this.onRequestChange.bind(this);
    }

    onTouchTap() {
        this.setState({open: true});
    }

    onRequestChange(value) {
        this.setState({open: value});
    }

    render() {
        return (
            <IconMenu iconButtonElement={< MoreVertButton />} open={this.state.open} onTouchTap={this.onTouchTap} onRequestChange={this.onRequestChange}>
                {this.props.children}
            </IconMenu>
        );
    }
}
