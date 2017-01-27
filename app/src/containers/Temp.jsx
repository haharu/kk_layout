import React, {Component, PropTypes} from 'react';
import Nav from '../components/Nav';
import {RegNavLink} from '../components/NavLink'
import {PageNotFound} from '../containers/App'

class Menu extends Component {
    render() {
        return (
            <aside className="menu">
                <p className="menu-label">
                    Menu
                </p>
                <ul className="menu-list">
                    <li>
                        <a className="is-active">選擇學位</a>
                        <ul>
                            <li>
                                <a>Bachelor</a>
                            </li>
                            <li>
                                <a>Master</a>
                            </li>
                            <li>
                                <a>Doctor</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a>選擇類群</a>
                    </li>
                    <li>
                        <a>選擇科系</a>
                    </li>
                </ul>
            </aside>
        )
    }
}

class Pagination extends Component {
    render() {
        return (
            <nav className="pagination is-centered">
                <ul className="pagination-list">
                    <li>
                        <RegNavLink to="/temp-page/1" className="pagination-link" activeClassName="is-current" name="1"/>
                    </li>
                    <li>
                        <RegNavLink to="/temp-page/2" className="pagination-link" activeClassName="is-current" name="2"/>
                    </li>
                    <li>
                        <RegNavLink to="/temp-page/3" className="pagination-link" activeClassName="is-current" name="3"/>
                    </li>
                    <li>
                        <RegNavLink to="/temp-page/4" className="pagination-link" activeClassName="is-current" name="4"/>
                    </li>
                </ul>
            </nav>
        )
    }
}

export class Temp1 extends Component {
    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="tile is-vertical">
                        <div className="tile is-child">
                            <Pagination/>
                        </div>
                        <div className="tile is-child">
                            <Menu/>
                        </div>
                        <div className="tile is-child">
                            <nav className="pagination is-centered">
                                <a className="pagination-previous">Previous</a>
                                <a className="pagination-next">Next page</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export class TempNotFound extends Component {
    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="tile is-vertical">
                        <div className="tile is-child">
                            <Pagination/>
                        </div>
                        <div className="tile is-child">
                            <PageNotFound/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default class Temp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {children} = this.props

        return (
            <div>
                <Nav/> {children}
            </div>
        )
    }
}