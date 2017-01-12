import React, {Component, PropTypes} from 'react';
import {asyncConnect} from 'redux-connect'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Header from '../components/Header';
import Picker from '../components/Picker';
import Input from '../components/Input';
import BaiduMap from '../components/BaiduMap';

import * as mapActions from '../reducers/map';

@connect(state => {
    return {map: state.map}
})
export class Locate extends Component {
    constructor(props) {
        super(props)
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.mapSearchLocation = this.mapSearchLocation.bind(this);
    }
    componentDidMount() {
        let {dispatch} = this.props
        dispatch(mapActions.changeSearchTxt('美國'))
        dispatch(mapActions.fetchTextSearchIfNeeded())
    }

    updateSearchValue(nextValue) {
        let {dispatch} = this.props
        dispatch(mapActions.changeSearchTxt(nextValue));
    }
    mapSearchLocation(nextValue) {
        let {dispatch} = this.props
        dispatch(mapActions.fetchTextSearchIfNeeded())
    }
    render () {
        return (
            <Input searchName="搜尋" onchange={this.updateSearchValue} onsubmit={this.mapSearchLocation} onloading={this.props.map.isFetching}/>
        )
    }
}

@connect(state => {
    return {map: state.map}
})
export default class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {dispatch, map, children} = this.props
        let MapActionCreator = bindActionCreators(mapActions, dispatch)
        return (
            <section className="section">
                <div className="container is-fluid">
                    {children}
                    <BaiduMap id='BMap' style={{
                        minHeight: 500
                    }} map={map} {...MapActionCreator}/>
                </div>
            </section>
        )

    }

}
