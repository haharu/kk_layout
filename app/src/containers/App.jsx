import React, {Component} from 'react';

export class PageNotFound extends Component {
    render() {
        return (
            <section className="section bg-transparent">
                <article className="message is-danger">
                    <div className="message-body">
                        Page Not Found.
                    </div>
                </article>
            </section>
        );
    }
}

export class WorkBox extends Component {
    render() {
        return (
            <section className="section bg-transparent">
                <article className="message">
                    <div className="message-body">
                        WorkBox
                    </div>
                </article>
            </section>
        );
    }
}
