'use strict';
import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
    render() {
        return <Link {...this.props} className="nav-item is-tab" activeClassName="is-active"/>
    }
})
