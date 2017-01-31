"use strict";
import React, {PropTypes, Component} from 'react';

const DEFAULT_INFO_IMG = 'http://static.bigstockphoto.com/images/homepage/2016_popular_photo_categories.jpg'

export default class BaiduMap extends Component {

    constructor(props) {
        super(props);
        this.showInfo = this.showInfo.bind(this)
        this.getPoints = this.getPoints.bind(this)
    }

    componentDidMount() {
        let {
            id,
            map: {
                mapLocation
            }
        } = this.props

        let opts = {
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT
        }
        this._map = new BMap.Map(id)
        this._map.addControl(new BMap.ScaleControl(opts));
        this._map.addControl(new BMap.NavigationControl(opts));
        this._map.enableScrollWheelZoom();

        let points = this.getPoints(mapLocation.predictions)
        if (!_.isEmpty(points)) {
            this._map.setViewport(points[0])
        }

    }

    componentWillReceiveProps(nextProps) {
        let {
            map: {
                mapLocation
            }
        } = this.props

        let {
            mapLocation: {
                predictions,
                placeDetail,
                placeId
            }
        } = nextProps.map

        if (!_.isEqual(predictions, mapLocation.predictions)) {
            this._map.clearOverlays();
            let points = this.getPoints(predictions)
            if (!_.isEmpty(points)) {
                this._map.setViewport(_.flattenDeep(points))

                _.forEach(points, (point, i) => {
                    let marker = new BMap.Marker(point[0])
                    marker.addEventListener('click', (e) => {
                        this.showInfo(predictions[i]);
                    })
                    this._map.addOverlay(marker);
                })

            }
        }

        if (!_.isEqual(placeId, mapLocation.placeId)) {
            this._map.clearOverlays();
            if (_.has(placeDetail, placeId)) {
                let points = this.getPoints([placeDetail[placeId]])
                if (!_.isEmpty(points)) {
                    this._map.setViewport(points[0])
                }
            }
        }

    }

    getPoints(predictions) {
        return _.reduce(predictions, (acc, prediction, i) => {
            let {geometry, bounds} = prediction
            if (!_.isEmpty(geometry)) {
                const points = []
                points.push(new BMap.Point(geometry.location.lng, geometry.location.lat))
                if (_.has(geometry, 'viewport')) {
                    points.push(new BMap.Point(geometry.viewport.northeast.lng, geometry.viewport.northeast.lat))
                    points.push(new BMap.Point(geometry.viewport.southwest.lng, geometry.viewport.southwest.lat))
                }
                acc.push(points)
            }

            return acc
        }, [])
    }

    showInfo(info) {
        if (!_.isEmpty(info)) {
            let imgUrl = _.has(info, 'photos')
                ? '/map/photo/1000/1000/' + info.photos[0].photo_reference
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
                            ${info.formatted_address || info.vicinity}
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
            let point = new BMap.Point(info.geometry.location.lng, info.geometry.location.lat)

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
