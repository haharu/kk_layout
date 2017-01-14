import React, {Component, PropTypes} from 'react'
import Header from '../components/Header'
import {Locate, MapRoute} from '../components/LeftCard'
import Map from './Map'

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
            <section className="section">
                <article className="message is-primary">
                    <div className="message-body">
                        All test passed.
                    </div>
                </article>
                <article className="message is-primary">
                    <div className="message-body">
                        homepage
                    </div>
                </article>
            </section>
        )
    }
}

export default class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let {
            children,
            ...props
        } = this.props

        return (
            <div className="is-overlay">
                <div className="box is-paddingless is-marginless" style={{
                    width: 400,
                    position: 'absolute',
                    zIndex: 1
                }}>
                    <Header {...props}/>
                    {children}
                </div>
                <Map/>
            </div>
        )
    }
}
