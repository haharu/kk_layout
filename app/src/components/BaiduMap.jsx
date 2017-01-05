"use strict";
import React, {PropTypes, Component} from 'react';

import rp from 'request-promise';

const ZOOM_LEVEL = 12;
const OFFSET = 0.00003;
const DEFAULT_INFO_IMG = 'http://static.bigstockphoto.com/images/homepage/2016_popular_photo_categories.jpg'

export default class BaiduMap extends Component {

    constructor(props) {
        super(props);
        this.markPoint = this.markPoint.bind(this)
    }
    componentDidMount() {
        let {id} = this.props
        this._map = new BMap.Map(id)
        let point = new BMap.Point(-71.116628, 42.377031)
        this._map.centerAndZoom(point, ZOOM_LEVEL);
        this._map.setViewport([point])
        this._map.enableScrollWheelZoom();
    }

    componentWillReceiveProps(nextProps) {
        let {dispatch, map} = this.props
        let {placeId, predictions, location} = nextProps.map

        if (!_.isEmpty(predictions), !_.isEqual(predictions, map.predictions)) {
            let {geometry} = predictions[0]
            let point = new BMap.Point(geometry.location.lng + OFFSET, geometry.location.lat + OFFSET)
            this._map.centerAndZoom(point, ZOOM_LEVEL);
            this._map.setViewport([point])

            this.markPoint(point, predictions[0]);

        }
    }

    markPoint(point, info) {
        let imgUrl = _.has(info, 'photos')
            ? '/map/photo/400/300/' + info.photos[0].photo_reference
            : DEFAULT_INFO_IMG
        let content = `
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="${imgUrl}" alt="">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-32x32">
                                <img src="${info.icon}" alt="Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-5">${info.name}</p>
                            <p class="subtitle is-6">@${info.types[0]}</p>
                        </div>
                    </div>

                    <div class="content">
                        ${info.formatted_address}
                        <br>
                        <small>${Date.now()}</small>
                    </div>
                </div>
            </div>
        `;
        let marker = new BMap.Marker(point);
        let infoWindow = new BMap.InfoWindow(content);

        this._map.openInfoWindow(infoWindow, point)
        infoWindow.redraw()

        marker.addEventListener("click", () => {
            this._map.openInfoWindow(infoWindow, point)
            infoWindow.redraw()
        })

        this._map.addOverlay(marker);
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
