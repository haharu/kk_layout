'use strict';

import React, {Component, PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

class NavLink extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {index, to, children, activeClassName} = this.props
        const {router} = this.context

        const isActive = index
            ? router.isActive(to, index)
            : router.isActive(to)
        const LinkComponent = index
            ? IndexLink
            : Link

        return (
            <li className={isActive
                ? activeClassName
                : ''}>
                <LinkComponent to={to}>{children}</LinkComponent>
            </li>
        )
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object.isRequired
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
                                    <NavLink index={true} to="/" activeClassName="is-active" children="home"/>
                                    <NavLink to="/bmap" activeClassName="is-active" children="bmap"/>
                                    <NavLink to="/temp-page" activeClassName="is-active" children="Sample"/>
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
