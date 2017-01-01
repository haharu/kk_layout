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
                </section>
                <nav className="nav has-shadow margin-b-20">
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
