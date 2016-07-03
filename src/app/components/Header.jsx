'use strict';

import React from 'react';
import NavLink from './NavLink';
import {Link} from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                KK_test
                            </h1>
                            <h2 className="subtitle">
                                中文にほんご간곡고englishอักษรไทยfrançaisहिन्दी或हिंदीHindīالعَرَبِيَّة
                            </h2>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="heading">
                            <h1 className="title">Section</h1>
                            <h2 className="subtitle">
                                A simple container to divide your page into
                                <strong>sections</strong>, like the one you're currently reading
                            </h2>
                        </div>
                    </div>
                </section>
                <nav className="nav has-shadow margin-b-20">
                    <div className="container">
                        <div className="nav-left">
                            <NavLink to={`/card`}>Card</NavLink>
                            <NavLink to={`/level`}>Level</NavLink>
                            <a className="nav-item is-tab">Media object</a>
                            <a className="nav-item is-tab">Menu</a>
                            <a className="nav-item is-tab">Message</a>
                            <a className="nav-item is-tab">Modal</a>
                            <a className="nav-item is-tab">Nav</a>
                            <a className="nav-item is-tab">Pagination</a>
                            <a className="nav-item is-tab">Panel</a>
                            <a className="nav-item is-tab">Tabs</a>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
