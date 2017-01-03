"use strict";
import React, {PropTypes, Component} from 'react';
import rp from 'request-promise';

const ZOOM_LEVEL = 12;

export default class BaiduMap extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let {id} = this.props

        this._map = new BMap.Map(id);
        this._map.centerAndZoom(new BMap.Point(-71.116628, 42.377031), ZOOM_LEVEL);
        this._map.enableScrollWheelZoom();

    }
    componentWillReceiveProps(nextProps) {
        let {dispatch, map, fetchAutocompleteIfNeeded, fetchPlaceDetailIfNeeded, fetchBaiduLocationIfNeeded} = this.props
        let {placeId, autocomplete, placeDetail, location} = nextProps.map

        if (!_.isEmpty(location) && !location.error) {
            this._map.centerAndZoom(new BMap.Point(atob(location.x), atob(location.y)), ZOOM_LEVEL);
        }
    }

    render() {
        const {id, style} = this.props
        return (
            <div id={id} style={style}></div>
        );
    }
}

BaiduMap.propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
    map: PropTypes.object.isRequired
};
