'use strict';

import React, {Component} from 'react';

export default class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="nav">
                <div className="container">
                    <div className="nav-left">
                        <a className="nav-item">
                            WorkBox
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}
