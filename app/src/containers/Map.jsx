import React, {Component, PropTypes} from 'react';
import {asyncConnect} from 'redux-connect'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import BaiduMap from '../components/BaiduMap';

import Header from '../components/Header'

import * as mapLocationActions from '../reducers/mapLocation';

@connect(state => {
    return {mapLocation: state.mapLocation}
})
export default class Map extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let {mapLocation, dispatch} = this.props
        if (_.isEmpty(mapLocation.searchTxt)) {
            dispatch(mapLocationActions.changeSearchTxt('美國'));
            dispatch(mapLocationActions.fetchTextSearchIfNeeded());
        }
    }

    render() {
        let {children, mapLocation, mapDirections} = this.props

        return (
            <div className="is-overlay">
                <div className="box is-paddingless is-marginless" style={{
                    width: 400,
                    position: 'absolute',
                    zIndex: 1
                }}>
                    <Header/>
                    {children}
                </div>
                <BaiduMap id='BMap' style={{
                    height: '100%'
                }} map={{
                    mapLocation
                }}/>
            </div>
        )
    }
}
