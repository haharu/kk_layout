'use strict';

import React from 'react';

export default class main extends React.Component {
    render() {
        return (
            <div className="container">
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
                            <a className="nav-item is-tab is-active">Card</a>
                            <a className="nav-item is-tab">Level</a>
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
                <div className="box">
                    <article className="media">
                        <div className="media-left">
                            <figure className="image is-64x64">
                                <img src="http://placehold.it/128x128" alt="Image"/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>Haharu Lin</strong>
                                    <small>@haharu</small>
                                    <small>31m</small>
                                    <br/>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                                </p>
                            </div>
                            <nav className="level">
                                <div className="level-left">
                                    <a className="level-item">
                                        <span className="icon is-small">
                                            <i className="fa fa-reply"></i>
                                        </span>
                                    </a>
                                    <a className="level-item">
                                        <span className="icon is-small">
                                            <i className="fa fa-retweet"></i>
                                        </span>
                                    </a>
                                    <a className="level-item">
                                        <span className="icon is-small">
                                            <i className="fa fa-heart"></i>
                                        </span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </article>
                </div>
                <div className="card is-fullwidth">
                    <header className="card-header">
                        <p className="card-header-title">
                            Component
                        </p>
                        <a className="card-header-icon">
                            <i className="fa fa-angle-down"></i>
                        </a>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                            <a href="#">@bulmaio</a>.
                            <a href="#">#css</a>
                            <a href="#">#responsive</a>
                            <br/>
                            <small>11:09 PM - 1 Jan 2016</small>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a className="card-footer-item">Save</a>
                        <a className="card-footer-item">Edit</a>
                        <a className="card-footer-item">Delete</a>
                    </footer>
                </div>
            </div>
        )
    }
}
