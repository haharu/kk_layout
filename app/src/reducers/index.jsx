import {combineReducers} from 'redux'
import {reducer as reduxAsyncConnect} from 'redux-connect';
import {routerReducer as routing} from 'react-router-redux';
import map from './map'

export default combineReducers({routing, reduxAsyncConnect, map});
