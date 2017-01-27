'use strict';

import React, {Component, PropTypes} from 'react';
import {NavLink, SubNavLink} from './NavLink'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                drhush
                            </h1>
                            <h2 className="subtitle">
                                drhush map
                            </h2>
                        </div>
                    </div>
                    <div className="hero-foot">
                        <div className="container">
                            <nav className="tabs is-boxed">
                                <ul>
                                    <NavLink index={true} to="/" activeClassName="is-active" name="home"/>
                                    <NavLink to="/bmap" activeClassName="is-active" name="bmap"/>
                                    <NavLink to="/temp-page" activeClassName="is-active" name="Sample"/>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <nav className="nav has-shadow">
                    <div className="container">
                        <div className="nav-left">
                            <SubNavLink to="/bmap/locate" name="locate"/>
                            <SubNavLink to="/bmap/route" name="route"/>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
