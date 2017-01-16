import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as mapDirectionsActions from '../reducers/mapDirections';
import * as mapLocationActions from '../reducers/mapLocation';
import * as domActions from '../reducers/dom'

@connect(state => {
    return {mapDirections: state.mapDirections, mapLocation: state.mapLocation, dom: state.dom}
})
export class MapRoute extends Component {
    constructor(props) {
        super(props)
        this.updateDistanceMatrixState = this.updateDistanceMatrixState.bind(this)
        this.getDistanceMatrix = this.getDistanceMatrix.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.toggleActive = this.toggleActive.bind(this)
    }

    updateDistanceMatrixState(nextOpts) {
        let {dispatch} = this.props
        dispatch(mapDirectionsActions.changeDistanceMatrixState(nextOpts))
    }

    handleInputChange(e, ref) {
        let {dispatch} = this.props
        dispatch(domActions.changeActiveElementIfNeeded(e));
        dispatch(mapLocationActions.changeSearchTxt(e.target.value))
        dispatch(mapDirectionsActions.changeDistanceMatrixState({[ref]: e.target.value}))
        dispatch(mapLocationActions.fetchAutocompleteIfNeeded())
    }

    toggleActive(e) {
        let {dispatch} = this.props
        dispatch(domActions.changeActiveElementIfNeeded(e));
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
        let {mapDirections, dom} = this.props

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
                            <input ref="origin_input" value={mapDirections.origin} className="input" type="text" placeholder="Origin" onBlur={e => this.toggleActive(e)} onChange={e => this.handleInputChange(e, 'origin')}/>
                        </p>
                        <p className="control">
                            <input ref="dest_input" value={mapDirections.destination} className="input" type="text" placeholder="Destination"  onBlur={e => this.toggleActive(e)} onChange={e => this.handleInputChange(e, 'destination')}/>
                        </p>
                    </div>
                    <Autocomplete refs={this.refs}/>
                    <div className="panel-block">
                        <button onMouseDown={this.getDistanceMatrix} className={`button is-primary is-outlined is-fullwidth` + (mapDirections.isFetching && ' is-loading' || '')}>
                            Search
                        </button>
                    </div>
                </nav>
            </div>
        )
    }
}

@connect(state => {
    return {mapLocation: state.mapLocation, dom: state.dom}
})
export class Locate extends Component {
    constructor(props) {
        super(props)
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.mapSearchLocation = this.mapSearchLocation.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
    }

    updateSearchValue(e) {
        let {dispatch} = this.props
        dispatch(domActions.changeActiveElementIfNeeded(e));
        dispatch(mapLocationActions.changeSearchTxt(e.target.value));
        dispatch(mapLocationActions.fetchAutocompleteIfNeeded())
    }

    toggleActive(e) {
        let {dispatch} = this.props
        dispatch(domActions.changeActiveElementIfNeeded(e));
    }

    mapSearchLocation() {
        let {dispatch} = this.props
        dispatch(mapLocationActions.fetchTextSearchIfNeeded())
    }

    render() {
        let {mapLocation, dom} = this.props

        return (
            <nav className="panel">
                <div className="panel-block">
                    <p className="control">
                        <input ref="locate_input" value={mapLocation.searchTxt} className="input" type="text" placeholder="Location" onBlur={e => this.toggleActive(e)} onChange={e => this.updateSearchValue(e)}/>
                    </p>
                </div>
                <Autocomplete refs={this.refs}/>
                <div className="panel-block">
                    <button onMouseDown={this.mapSearchLocation} className={`button is-primary is-outlined is-fullwidth` + (mapLocation.isFetching && ' is-loading' || '')}>
                        Search
                    </button>
                </div>
            </nav>
        )
    }
}

@connect(state => {
    return {mapLocation: state.mapLocation, dom: state.dom}
})
export class Autocomplete extends Component {
    constructor(props) {
        super(props)
        this.selectPrediction = this.selectPrediction.bind(this);
    }

    selectPrediction(i) {
        let {dispatch, mapLocation} = this.props
        let placeId = mapLocation.autocomplete[i].place_id
        dispatch(mapLocationActions.fetchPlaceDetailIfNeeded(placeId)).then(resp => {
            dispatch(mapLocationActions.changePlaceId(placeId))
        })
    }

    render() {
        let {mapLocation, refs, dom} = this.props
        let _refs = _.map(refs)
        let showAutocomplete = _.includes(_refs, dom.activeElement)
        const autocomplete = _.map(mapLocation.autocomplete, (prediction, i) => (
            <a key={`${i}`} className="panel-block" onMouseDown={(e) => this.selectPrediction(i)}>
                {prediction.description}
            </a>
        ))
        return (
            <div>
                {showAutocomplete && !_.isEmpty(mapLocation.searchTxt) && !_.isEmpty(mapLocation.autocomplete) && autocomplete}
            </div>
        )
    }
}
