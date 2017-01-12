import React, {Component, PropTypes} from 'react'
import Header from '../components/Header'


export default class App extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        let {children, ...props} = this.props
        return (
            <div>
                <Header children={children} {...props}/>
                {children}
            </div>
        )
    }
}
