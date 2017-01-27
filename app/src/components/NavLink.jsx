import React, {Component, PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

export class NavLink extends Component {
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


export class SubNavLink extends Component {
    render() {
        const {to, name} = this.props
        return (
            <Link to={to} className="nav-item is-tab" activeClassName="is-active">
                {name}
            </Link>
        )
    }
}
