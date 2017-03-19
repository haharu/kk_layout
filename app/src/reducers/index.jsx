import {combineReducers} from 'redux'
import {reducer as reduxAsyncConnect} from 'redux-connect';
import {routerReducer as routing} from 'react-router-redux';
import dom from './dom'
import nominatim from './nominatim'

export default combineReducers({routing, reduxAsyncConnect});
