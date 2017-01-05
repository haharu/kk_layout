import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from '../components/Header';
import Picker from '../components/Picker';
import Input from '../components/Input';
import BaiduMap from '../components/BaiduMap';

import * as mapActions from '../reducers/map';

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
            let {dispatch} = this.props
            dispatch(mapActions.changeSearchTxt(nextValue));
    }
    mapSearchLocation(nextValue) {
        let {dispatch} = this.props
        dispatch(mapActions.fetchTextSearchIfNeeded())
    }

    render() {
        let {dispatch} = this.props
        let MapActionCreator = bindActionCreators(mapActions, dispatch)
        return (
            <div>
                <Header/>
                <div className="container is-fluid">
                    <Input searchName="搜尋" onchange={this.updateSearchValue} onsubmit={this.mapSearchLocation} onloading={this.props.map.isFetching}/>
                    <BaiduMap id='BMap' style={{
                        minHeight: 500
                    }} map={this.props.map} {...MapActionCreator}/>
                </div>
            </div>
        )

    }

}
