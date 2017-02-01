import React, {Component} from 'react';
import {render} from 'react-dom';

let Map;

export default class Leaflet extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Map = require('react-leaflet').Map
        this.forceUpdate();
    }

    render() {
        if (Map) {

            const L = require('leaflet');

            delete L.Icon.Default.prototype._getIconUrl;

            let defaultIcon = {
                iconRetinaUrl: require('../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
                iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('../../../node_modules/leaflet/dist/images/marker-shadow.png')
            }

            L.Icon.Default.mergeOptions(defaultIcon);

            const position = [40.7309784, -73.9956433];
            const url = 'http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
            const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            const {Marker, Popup, TileLayer} = require('react-leaflet');

            return (
                <Map center={position} zoom={13}>
                    <TileLayer url={url} attribution={attribution}/>
                    <Marker position={position}>
                        <Popup>
                            <span>test</span>
                        </Popup>
                    </Marker>
                </Map>
            );
        } else {
            return (null)
        }
    }
}
