import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {selectCurrency, invalidateFinance, fetchFinanceIfNeeded} from '../actions'

import Card from '../components/Card';
import Level from '../components/Level';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Currency from '../components/Currency';
import Picker from '../components/Picker';

class App extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        const {dispatch, currency} = this.props
        dispatch(fetchFinanceIfNeeded(currency))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currency !== this.props.currency) {
            const {dispatch, currency} = this.props
            dispatch(fetchFinanceIfNeeded(currency))
        }
    }

    handleChange(nextCurrency) {
        this.props.dispatch(selectCurrency(nextCurrency))
        this.props.dispatch(invalidateFinance(this.props.currency))
        this.props.dispatch(fetchFinanceIfNeeded(nextCurrency))
    }

    render() {
        console.log(this.props);
        const {currency, data, isFetching, lastUpdated} = this.props
        const isEmpty = data.length === 0
        return (
            <div>
                <Header/>
                {lastUpdated &&
                    <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
                    </span>
                }
                <Picker value={currency}
                    onChange={this.handleChange}
                    options={[ 'TWDJPY', 'JPYTWD' ]} /><br/>
                {isFetching &&
                    <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
                    </span>
                }
                isFetching : {isFetching.toString()}<br/>
                currency : {currency}<br/>
                {data &&
                    <p>
                        Data : {JSON.stringify(data)}
                    </p>
                }
                <Footer className="margin-t-20"/>
            </div>
        )

    }

}

App.propTypes = {
    currency: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    receiveAt: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {financeByGoogle, currency} = state
    const {isFetching, lastUpdated, items: data} = financeByGoogle[currency] || {
        isFetching: true,
        items: {}
    }

    return {currency, data, isFetching, lastUpdated}
}

export default connect(mapStateToProps)(App)
