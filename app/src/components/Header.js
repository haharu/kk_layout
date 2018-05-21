import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
    static propTypes = {
        children: PropTypes.node,
    }
    render() {
        return (
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </section>
        );
    }
}
