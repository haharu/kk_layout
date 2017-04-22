'use strict';

import React, {Component} from 'react';
import {NavLink, SubNavLink} from './NavLink'

export default class Nav extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <nav className="nav">
                <div className="nav-left">
                    <a className="nav-item">
                        <img src="http://placehold.it/640x160" alt="title"/>
                    </a>
                </div>

                <span className="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>

                <div className="nav-right nav-menu">
                    <SubNavLink index={true} to="/" name="Home"/>
                    <SubNavLink to="/bmap/locate" name="locate"/>
                    <SubNavLink to="/temp-page" name="Sample"/>

                    <span className="nav-item">
                        <a className="button is-primary">
                            <span className="icon">
                                <i className="fa fa-download"></i>
                            </span>
                            <span>FakeBtn</span>
                        </a>
                    </span>
                </div>
            </nav>
        )
    }
}
