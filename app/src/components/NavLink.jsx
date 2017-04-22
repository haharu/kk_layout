import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';
import PropTypes from 'prop-types';

export class NavLink extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {index, to, name, activeClassName} = this.props
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
                <LinkComponent to={to}>{name}</LinkComponent>
            </li>
        )
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export class SubNavLink extends Component {
    render() {
        const {to, name, index} = this.props
        const LinkComponent = index
            ? IndexLink
            : Link
        return (
            <LinkComponent to={to} className="nav-item is-tab" activeClassName="is-active">
                {name}
            </LinkComponent>
        )
    }
}

export class RegNavLink extends Component {
    render() {
        const {to, className, activeClassName, name, index} = this.props
        const LinkComponent = index
            ? IndexLink
            : Link
        return (
            <LinkComponent to={to} className={className} activeClassName={activeClassName}>{name}</LinkComponent>
        )
    }
}
