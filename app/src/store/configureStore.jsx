import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers';
import config from 'Root/config';

export default function configureStore(history, preloadedState) {
    let middleware = [ReduxThunk, routerMiddleware(history)];
    if (!config.isProduction) {
        middleware = [
            ...middleware,
            createLogger(),
        ];
    }
    const store = createStore(rootReducer, preloadedState, applyMiddleware(...middleware));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
