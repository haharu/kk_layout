'use strict';

import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

class NavLink extends Component {
    render() {
        const {index, to, children, activeClassName, router} = this.props

        const isActive = index
            ? router.isActive(to, index)
            : router.isActive(to)
        const LinkComponent = index
            ? IndexLink
            : Link

        return (
            <li className={isActive ? activeClassName : ''}>
                <LinkComponent to={to}>{children}</LinkComponent>
            </li>
        )
    }
}

class SubNavLink extends Component {
    render() {
        const {to, name} = this.props
        return (
            <Link to={to} className="nav-item is-tab" activeClassName="is-active">
                {name}
            </Link>
        )
    }
}

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
                                test
                            </h1>
                            <h2 className="subtitle">
                                中文にほんご간곡고englishอักษรไทยfrançaisहिन्दी或हिंदीHindīالعَرَبِيَّة
                            </h2>
                        </div>
                    </div>
                    <div className="hero-foot">
                        <div className="container">
                            <nav className="tabs is-boxed">
                                <ul>
                                    <NavLink index={true} to="/" router={this.props.router} activeClassName="is-active" children="home"/>
                                    <NavLink to="/bmap" router={this.props.router} activeClassName="is-active" children="bmap"/>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <nav className="nav has-shadow">
                    <div className="container">
                        <div className="nav-left">
                            <SubNavLink to="/bmap/locate" name="locate"/>
                            <SubNavLink to="/bmap/search" name="search"/>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
