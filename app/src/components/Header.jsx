'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
    static propTypes = {
        title: PropTypes.string,
        subtitle: PropTypes.string,
    }
    render() {
        let {title, subtitle} = this.props;
        return (
            <div>
                <section className="hero is-primary">
                    {(title || subtitle) && (
                        <div className="hero-body">
                            <div className="container">
                                {title && (
                                    <h1 className="title">
                                        {title}
                                    </h1>
                                )
}
                                {subtitle && (
                                    <h2 className="subtitle">
                                        {subtitle}
                                    </h2>
                                )
}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        );
    }
}
