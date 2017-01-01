import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';
import Picker from '../components/Picker';
import Input from '../components/Input';
import BaiduMap from '../components/BaiduMap';

import {changeSearchTxt, fetchLocationIfNeeded} from '../reducers/map';

@connect(state => {
    return {map: state.map}
})
export default class App extends Component {
    constructor(props) {
        super(props);

        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.mapSearchLocation = this.mapSearchLocation.bind(this);
    }

    updateSearchValue(nextValue) {
        this.props.dispatch(changeSearchTxt(nextValue));
    }
    mapSearchLocation() {
        this.props.dispatch(fetchLocationIfNeeded());
    }

    render() {
        let {dispatch} = this.props
        return (
            <div>
                <Header/>
                <div className="container is-fluid">
                    <Input searchName="搜尋" onchange={this.updateSearchValue} onsubmit={this.mapSearchLocation} onloading={this.props.map.isFetching}/>
                    <BaiduMap id='BMap' style={{
                        minHeight: 500
                    }} location={this.props.map.currLocation}/>
                </div>
            </div>
        )

    }

}
