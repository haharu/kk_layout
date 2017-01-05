"use strict";
import React, {PropTypes, Component} from 'react';

import rp from 'request-promise';

const ZOOM_LEVEL = 12;
const OFFSET = 0.00003;

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

        let content = `
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="http://static.bigstockphoto.com/images/homepage/2016_popular_photo_categories.jpg" alt="">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-32x32">
                                <img src="https://40.media.tumblr.com/da455c51e4468e705a61f1800763c0e8/tumblr_niyf6pOg441sqk7hko1_1280.jpg" alt="Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-5">John Smith</p>
                            <p class="subtitle is-6">@johnsmith</p>
                        </div>
                    </div>

                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a href="#">@bulmaio</a>.
                        <a href="#">#css</a> <a href="#">#responsive</a>
                        <br>
                        <small>11:09 PM - 1 Jan 2016</small>
                    </div>
                </div>
            </div>
        `;

        this.markPoint(point, content);

    }
    componentWillReceiveProps(nextProps) {
        let {dispatch, map} = this.props
        let {placeId, autocomplete, placeDetail, location} = nextProps.map

        if (!_.isEmpty(location) && !location.error && !_.isEqual(location, map.location)) {
            // let point = new BMap.Point(atob(location.x), atob(location.y))
            let point = new BMap.Point(placeDetail[placeId].geometry.location.lng + OFFSET, placeDetail[placeId].geometry.location.lat + OFFSET)
            this._map.centerAndZoom(point, ZOOM_LEVEL);
            this._map.setViewport([point])

            let content = `
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img src="http://static.bigstockphoto.com/images/homepage/2016_popular_photo_categories.jpg" alt="">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-32x32">
                                    <img src="https://40.media.tumblr.com/da455c51e4468e705a61f1800763c0e8/tumblr_niyf6pOg441sqk7hko1_1280.jpg" alt="Image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-5">John Smith</p>
                                <p class="subtitle is-6">@johnsmith</p>
                            </div>
                        </div>

                        <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a href="#">@bulmaio</a>.
                            <a href="#">#css</a> <a href="#">#responsive</a>
                            <br>
                            <small>11:09 PM - 1 Jan 2016</small>
                        </div>
                    </div>
                </div>
            `;

            this.markPoint(point, content);
        }
    }

    markPoint(point, infoContent) {

        let marker = new BMap.Marker(point);
        let infoWindow = new BMap.InfoWindow(infoContent);

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
