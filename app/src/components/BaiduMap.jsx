"use strict";
import React, {PropTypes, Component} from 'react';

export default class BaiduMap extends Component {

    constructor(props) {
        super(props);
        this.showInfo = this.showInfo.bind(this)
        this.getPoints = this.getPoints.bind(this)
    }

    componentDidMount() {
        let {id, map: {
                mapLocation
            }} = this.props

        let opts = {
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT
        }
        this._map = new BMap.Map(id)
        this._map.addControl(new BMap.ScaleControl(opts));
        this._map.addControl(new BMap.NavigationControl(opts));
        this._map.enableScrollWheelZoom();
        this._map.centerAndZoom(new BMap.Point(-100.4458824, 39.7837304), 5);
    }

    componentWillReceiveProps(nextProps) {
        let {map: {
                mapLocation
            }} = this.props

        let {
            mapLocation: {
                predictions,
                place
            }
        } = nextProps.map

        if (!_.isEqual(predictions, mapLocation.predictions)) {
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

        if (!_.isEqual(place, mapLocation.place)) {
            this._map.clearOverlays();
            let points = this.getPoints([place])

            if (!_.isEmpty(points)) {

                let icon = new BMap.Icon(require('../../images/pin.png'), new BMap.Size(20, 32), {
                    anchor: new BMap.Size(10, 30),
                    infoWindowAnchor: new BMap.Size(10, 0)
                });
                let marker = new BMap.Marker(points[0][0], {icon})
                this._map.addOverlay(marker)
                this._map.setViewport(points[0])
            }
        }

    }

    getPoints(predictions) {
        return _.reduce(predictions, (acc, prediction, i) => {
            let {geometry, bounds, lat, lon, boundingbox} = prediction
            if (!_.isEmpty(geometry)) {
                const points = []
                points.push(new BMap.Point(geometry.location.lng, geometry.location.lat))
                if (_.has(geometry, 'viewport')) {
                    points.push(new BMap.Point(geometry.viewport.northeast.lng, geometry.viewport.northeast.lat))
                    points.push(new BMap.Point(geometry.viewport.southwest.lng, geometry.viewport.southwest.lat))
                }
                acc.push(points)
            }

            if (!_.isEmpty(lat) && !_.isEmpty(lon)) {
                const points = []
                points.push(new BMap.Point(lon, lat))
                if (!_.isEmpty(boundingbox)) {
                    points.push(new BMap.Point(boundingbox[2], boundingbox[0]))
                    points.push(new BMap.Point(boundingbox[3], boundingbox[1]))
                }
                acc.push(points)
            }

            return acc
        }, [])
    }

    showInfo(info) {
        if (!_.isEmpty(info)) {
            let content = `
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-5">${info.display_name}</p>
                            <p class="subtitle is-6">@${info.type}</p>
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
            let point = new BMap.Point(info.lon, info.lat)

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
