'use strict'

import React, {Component, PropTypes} from 'react';

export default class Input extends Component {
    render() {
        const {onchange, placeholder, onsubmit, searchName, onloading} = this.props
        return (
            <p className="control has-addons">
                <input className="input" onChange={e => onchange(e.target.value)} type="text" placeholder={placeholder || 'Find somthing...'}/>
                <a className={onloading
                    ? "button is-primary is-loading"
                    : "button is-primary"} onClick={e => onsubmit(e)}>
                    {searchName || 'Search'}
                </a>
            </p>
        )
    }
}

Input.propTypes = {
    onchange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    searchName: PropTypes.string,
    onsubmit: PropTypes.func.isRequired,
    onloading: PropTypes.bool.isRequired
}
