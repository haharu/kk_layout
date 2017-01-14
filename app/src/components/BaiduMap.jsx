"use strict";
import React, {PropTypes, Component} from 'react';

const OFFSET = 0.00003;
const DEFAULT_INFO_IMG = 'http://static.bigstockphoto.com/images/homepage/2016_popular_photo_categories.jpg'

export default class BaiduMap extends Component {

    constructor(props) {
        super(props);
        this.showInfo = this.showInfo.bind(this)
        this.locate = this.locate.bind(this)
    }

    componentDidMount() {
        let {
            id,
            map: {
                mapLocation,
                mapDirections
            }
        } = this.props
        this._map = new BMap.Map(id)
        this._map.addControl(new BMap.ScaleControl());
        this._map.addControl(new BMap.NavigationControl());
        this._map.enableScrollWheelZoom();
        this.locate(mapLocation.predictions)
    }

    componentWillReceiveProps(nextProps) {
        let {
            map: {
                mapLocation,
                mapDirections
            }
        } = this.props
        
        let {predictions} = nextProps.map.mapLocation

        if (!_.isEqual(predictions, mapLocation.predictions)) {
            this.locate(predictions).then(point => {
                this.showInfo(predictions, point);
            })
        }
    }

    locate(predictions) {
        if (!_.isEmpty(predictions)) {
            let {geometry} = predictions[0]

            let point = new BMap.Point(geometry.location.lng + OFFSET, geometry.location.lat + OFFSET)
            this._map.centerAndZoom(point);

            if (_.has(geometry, 'viewport')) {
                let viewPortNE = new BMap.Point(geometry.viewport.northeast.lng + OFFSET, geometry.viewport.northeast.lat + OFFSET)
                let viewPortWS = new BMap.Point(geometry.viewport.southwest.lng + OFFSET, geometry.viewport.southwest.lat + OFFSET)
                this._map.setViewport([point, viewPortNE, viewPortWS])
            }
            return Promise.resolve(point)
        }
        return Promise.resolve()
    }

    showInfo(predictions, point) {
        if (!_.isEmpty(predictions)) {
            let info = predictions[0]
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
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a class="card-footer-item">Save</a>
                        <a class="card-footer-item">Edit</a>
                        <a class="card-footer-item">Delete</a>
                    </footer>
                </div>
            `;

            let infoWindow = new BMap.InfoWindow(content);

            this._map.openInfoWindow(infoWindow, point)
            infoWindow.redraw()
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
