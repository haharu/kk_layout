import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import createLogger from 'redux-logger';
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
    let middleware = [ReduxThunk];
    if (process.env.NODE_ENV !== 'production') {
        middleware = [...middleware, createLogger()];
    }
    const store = createStore(rootReducer, preloadedState, applyMiddleware(...middleware))

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        });
    }

    return store

}
