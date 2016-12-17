'use strict';

import React from 'react';

export default class Card extends React.Component {
    render() {
        return (
            <nav className="level">
                <div className="level-item has-text-centered">
                    <p className="heading">Tweets</p>
                    <p className="title">3,456</p>
                </div>
                <div className="level-item has-text-centered">
                    <p className="heading">Following</p>
                    <p className="title">123</p>
                </div>
                <div className="level-item has-text-centered">
                    <p className="heading">Followers</p>
                    <p className="title">456K</p>
                </div>
                <div className="level-item has-text-centered">
                    <p className="heading">Likes</p>
                    <p className="title">789</p>
                </div>
            </nav>
        )
    }
}
