import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as mapDirectionsActions from '../reducers/mapDirections';
import * as mapLocationActions from '../reducers/mapLocation';

@connect(state => {
    return {mapDirections: state.mapDirections}
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
        dispatch(mapDirectionsActions.fetchDistanceMatrixIfNeeded())
    }

    render() {
        let {mapDirections} = this.props

        let allowedMethods = {
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
                            <ul>
                                {_.map(allowedMethods, (opts, method) => (
                                    <li key={`${method}`} className={(mapDirections.method === method) && 'is-active' || ''}>
                                        <a>
                                            <span className="icon is-small">
                                                <i className={`fa fa-${opts.icon}`}></i>
                                            </span>
                                        </a>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                        <p className="control">
                            <input className="input" type="text" placeholder="Search" onChange={e => this.updateDistanceMatrixState({origins: e.target.value})}/>
                        </p>
                        <p className="control has-addons">
                            <input className="input" type="text" onChange={e => this.updateDistanceMatrixState({destinations: e.target.value})}/>
                            <a className={`button is-primary` + (mapDirections.isFetching && 'is-loading' || '')} onClick={this.getDistanceMatrix}>
                                搜尋
                            </a>
                        </p>
                    </div>
                    <div className="panel-block">
                        <button className="button is-primary is-outlined is-fullwidth">
                            Reset all filters
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
    }

    updateSearchValue(nextValue) {
        let {dispatch} = this.props
        dispatch(mapLocationActions.changeSearchTxt(nextValue));
    }
    mapSearchLocation(nextValue) {
        let {dispatch} = this.props
        dispatch(mapLocationActions.fetchTextSearchIfNeeded())
    }
    render() {
        let {mapLocation} = this.props
        return (
            <section className="section">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <p className="control has-addons">
                                <input className="input" type="text" onChange={e => this.updateSearchValue(e.target.value)}/>
                                <a className={mapLocation.isFetching
                                    ? "button is-primary is-loading"
                                    : "button is-primary"} onClick={this.mapSearchLocation}>
                                    搜尋
                                </a>
                            </p>
                        </div>
                    </div>
                </nav>

            </section>
        )
    }
}
