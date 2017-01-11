'use strict';

import React, {Component} from 'react';
import NavLink from './NavLink';
import {Link} from 'react-router';

export default class Header extends Component {
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
                                    <li className="is-active">
                                        <a>tab-a</a>
                                    </li>
                                    <li>
                                        <a>tab-b</a>
                                    </li>
                                    <li>
                                        <a>tab-c</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                            </div>
                </section>
                <nav className="nav has-shadow">
                    <div className="container">
                        <div className="nav-left">
                            <NavLink>tab1</NavLink>
                            <NavLink>tab2</NavLink>
                            <NavLink>tab3</NavLink>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
