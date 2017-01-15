import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as mapDirectionsActions from '../reducers/mapDirections';
import * as mapLocationActions from '../reducers/mapLocation';

@connect(state => {
    return {mapDirections: state.mapDirections, mapLocation: state.mapLocation}
})
export class MapRoute extends Component {
    constructor(props) {
        super(props)
        this.updateDistanceMatrixState = this.updateDistanceMatrixState.bind(this)
        this.getDistanceMatrix = this.getDistanceMatrix.bind(this)
    }

    updateDistanceMatrixState(nextOpts) {
        let {dispatch} = this.props
        dispatch(mapDirectionsActions.changeDistanceMatrixState(nextOpts))
    }

    getDistanceMatrix() {
        let {dispatch} = this.props
        dispatch(mapDirectionsActions.fetchDistanceMatrixIfNeeded()).then((resp) => {
            if (!_.isEmpty(resp) && !_.isEmpty(resp.origin_addresses) && !_.isEmpty(resp.destination_addresses)) {
                dispatch(mapDirectionsActions.changeDistanceMatrixState({origin: resp.origin_addresses[0], destination: resp.destination_addresses[0]}))
            }
        }).then(() => {
            dispatch(mapDirectionsActions.fetchDirectionsIfNeeded()).then(resp => {
                if (!_.isEmpty(resp) && !_.isEmpty(resp.geocoded_waypoints)) {
                    _.forEach(resp.geocoded_waypoints, (waypoint, i) => {
                        if (!_.isEmpty(waypoint.place_id)) {
                            dispatch(mapLocationActions.fetchPlaceDetailIfNeeded(waypoint.place_id))
                        }
                    })
                }
            })
        })
    }

    render() {
        let {mapDirections} = this.props

        let allowedMode = {
            'driving': {
                icon: 'car'
            },
            'walking': {
                icon: 'male'
            },
            'bicycling': {
                icon: 'bicycle'
            },
            'transit': {
                icon: 'subway'
            }
        }

        const modeTabs = _.map(allowedMode, (opts, mode) => (
            <li key={`${mode}`} className={(mapDirections.mode === mode) && 'is-active' || ''}>
                <a onClick={e => this.updateDistanceMatrixState({mode})}>
                    <span className="icon is-small">
                        <i className={`fa fa-${opts.icon}`}></i>
                    </span>
                </a>
            </li>
        ))

        return (
            <div>
                <nav className="panel">
                    <div className="panel-header">
                        <article className="message is-danger">
                            <div className="message-body">
                                Direction and Distance Matrix are still in development.
                            </div>
                        </article>
                    </div>
                    <div className="panel-block">
                        <div className="tabs">
                            <ul>{modeTabs}</ul>
                        </div>
                        <p className="control">
                            <input value={mapDirections.origin} className="input" type="text" placeholder="Origin" onChange={e => this.updateDistanceMatrixState({origin: e.target.value})}/>
                        </p>
                        <p className="control">
                            <input value={mapDirections.destination} className="input" type="text" placeholder="Direction" onChange={e => this.updateDistanceMatrixState({destination: e.target.value})}/>
                        </p>
                    </div>
                    <div className="panel-block">
                        <button onClick={this.getDistanceMatrix} className={`button is-primary is-outlined is-fullwidth` + (mapDirections.isFetching && ' is-loading' || '')}>
                            Search
                        </button>
                    </div>
                </nav>
            </div>
        )
    }
}

@connect(state => {
    return {mapLocation: state.mapLocation}
})
export class Locate extends Component {
    constructor(props) {
        super(props)
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.mapSearchLocation = this.mapSearchLocation.bind(this);
        this.toggleAutocompleteVisibility = this.toggleAutocompleteVisibility.bind(this);
    }

    updateSearchValue(nextValue) {
        let {dispatch} = this.props
        dispatch(mapLocationActions.changeSearchTxt(nextValue));
        dispatch(mapLocationActions.fetchAutocompleteIfNeeded())
    }

    selectPrediction(i) {
        let {dispatch, mapLocation} = this.props
        let placeId = mapLocation.autocomplete[i].place_id
        dispatch(mapLocationActions.fetchPlaceDetailIfNeeded(placeId)).then((resp) => {
            dispatch(mapLocationActions.changePlaceId(placeId))
        })
    }

    toggleAutocompleteVisibility() {
        let {dispatch} = this.props
        dispatch(mapLocationActions.toggleAutocompleteVisibility())
    }

    mapSearchLocation() {
        let {dispatch} = this.props
        dispatch(mapLocationActions.fetchTextSearchIfNeeded())
    }

    render() {
        let {mapLocation} = this.props
        const autocomplete = _.map(mapLocation.autocomplete, (prediction, i) => (
            <a key={`${i}`} className="panel-block" onMouseDown={(e) => this.selectPrediction(i)}>
                {prediction.description}
            </a>
        ))
        return (
            <nav className="panel">
                <div className="panel-block">
                    <p className="control">
                        <input value={mapLocation.searchTxt} className="input" type="text" placeholder="Location" onFocus={this.toggleAutocompleteVisibility} onBlur={this.toggleAutocompleteVisibility} onChange={e => this.updateSearchValue(e.target.value)}/>
                    </p>
                </div>
                {mapLocation.showAutocomplete && !_.isEmpty(mapLocation.searchTxt) && !_.isEmpty(mapLocation.autocomplete) && autocomplete}
                <div className="panel-block">
                    <button onMouseDown={this.mapSearchLocation} className={`button is-primary is-outlined is-fullwidth` + (mapLocation.isFetching && ' is-loading' || '')}>
                        Search
                    </button>
                </div>
            </nav>
        )
    }
}
