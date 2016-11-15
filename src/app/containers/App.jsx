import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {selectCurrency, invalidateFinance, fetchFinanceIfNeeded} from '../actions'

import Card from '../components/Card';
import Level from '../components/Level';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Currency from '../components/Currency';
import Picker from '../components/Picker';

import {LineChart} from 'react-d3'

import {BarChartTranc} from '../helpers'

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
        const {currency, data, isFetching, lastUpdated} = this.props
        const isEmpty = data.length === 0
        let chartOptions = {
            strokeDashArray: "5,5"
        }
        let BarChartData = BarChartTranc(data, currency, chartOptions);
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
                    options={[ 'TWDJPY', 'JPYTWD', 'USDTWD', 'TWDUSD']}
                />
                <br/>
                {!isEmpty &&
                    <LineChart
                        data={BarChartData}
                        width={'100%'}
                        height={400}
                        legend={true}
                        viewBoxObject={{
                            x: 0,
                            y: 0,
                            width: 1000,
                            height: 400
                        }}
                        gridHorizontal={true}
                        gridVertical={true}
                    />
                }
                <Footer className="margin-t-20"/>
            </div>
        )

    }

}

App.propTypes = {
    currency: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    receiveAt: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {financeByGoogle, currency} = state
    const {isFetching, lastUpdated, items: data} = financeByGoogle[currency] || {
        isFetching: true,
        items: []
    }

    return {currency, data, isFetching, lastUpdated}
}

export default connect(mapStateToProps)(App)
