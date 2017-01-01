"use strict";
import React, {PropTypes, Component} from 'react';

const ZOOM_LEVEL = 12;

export default class BaiduMap extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let {location, id} = this.props

        this._map = new BMap.Map(id);
        if (!_.isEmpty(location)) {
            let {coord} = location;
            let _coord = this.coordParser(coord);
            this._map.centerAndZoom(new BMap.Point(_coord.x, _coord.y), ZOOM_LEVEL);
        } else {
            this._map.centerAndZoom(new BMap.Point(-71.116628, 42.377031), ZOOM_LEVEL);
        }
        this._map.enableScrollWheelZoom();

    }
    componentWillReceiveProps(nextProps) {
        const {location} = nextProps

        if (!_.isEmpty(location) && this.props.location.coord !== location.coord) {
            let {coord} = location
            let _coord = this.coordParser(coord);
            this._map.centerAndZoom(new BMap.Point(_coord.x, _coord.y), ZOOM_LEVEL);
        }
    }

    coordParser(coord) {
        let _coord = _.split(coord, /(\,\s+)/)
        return {
            x: _.toNumber(_coord[0]),
            y: _.toNumber(_coord[2])
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
    location: PropTypes.object.isRequired
};
