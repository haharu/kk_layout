import React, {Component} from 'react';
import {render} from 'react-dom';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

let defaultIcon = {
    iconRetinaUrl: require('../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('../../../node_modules/leaflet/dist/images/marker-shadow.png')
}

L.Icon.Default.mergeOptions(defaultIcon);

import {Map, Marker, Popup, TileLayer} from 'react-leaflet-universal';

export default class Leaflet extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const position = [40.7309784, -73.9956433];
        return (
            <Map center={position} zoom={13}>
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                <Marker position={position}>
                    <Popup>
                        <span>test</span>
                    </Popup>
                </Marker>
            </Map>
        );
    }
}
