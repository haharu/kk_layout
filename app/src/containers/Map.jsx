import React, {Component, PropTypes} from 'react';
import {asyncConnect} from 'redux-connect'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import BaiduMap from '../components/BaiduMap';

import * as mapLocationActions from '../reducers/mapLocation';

@connect(state => {
    return {mapLocation: state.mapLocation, mapDirections: state.mapDirections}
})
export default class Map extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {mapLocation, dispatch} = this.props
        if (_.isEmpty(mapLocation.searchTxt)) {
            dispatch(mapLocationActions.changeSearchTxt('美國'));
            dispatch(mapLocationActions.fetchTextSearchIfNeeded());
        }
    }

    render() {
        let {mapLocation, mapDirections} = this.props
        return (<BaiduMap id='BMap' style={{
            height: '100%'
        }} map={{
            mapLocation,
            mapDirections
        }}/>)
    }
}
