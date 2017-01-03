import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux';

import currency from './currency';
import finance from './finance';
import map from './map';

export default combineReducers({map, routing});
