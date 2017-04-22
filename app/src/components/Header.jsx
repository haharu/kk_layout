'use strict';

import React, {Component} from 'react';
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
                                workbox
                            </h1>
                            <h2 className="subtitle">
                                A startkit with react, redux, webpack, hot, universal, koa2, sass
                            </h2>
                        </div>
                    </div>
                    <div className="hero-foot">
                        <div className="container">
                            <nav className="tabs is-boxed">
                                <ul>
                                    <NavLink index={true} to="/" activeClassName="is-active" name="root"/>
                                    <NavLink to="/foo" activeClassName="is-active" name="foo"/>
                                    <NavLink to="/bar" activeClassName="is-active" name="bar"/>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <nav className="nav has-shadow">
                    <div className="container">
                        <div className="nav-left">
                            <SubNavLink to="/hey" name="hey"/>
                            <SubNavLink to="/ho" name="ho"/>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
