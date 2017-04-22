import React, {Component} from 'react'
import Header from '../components/Header'

export class PageNotFound extends Component {
    render() {
        return (
            <section className="section">
                <article className="message is-danger">
                    <div className="message-body">
                        Page Not Found.
                    </div>
                </article>
            </section>
        )
    }
}

export class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <section className="section">
                    <article className="message is-primary">
                        <div className="message-body">
                            Hello world !!
                        </div>
                    </article>
                </section>
            </div>
        )
    }
}

export default class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let {children} = this.props
        return (
            <div>
                {children}
            </div>
        )
    }
}
