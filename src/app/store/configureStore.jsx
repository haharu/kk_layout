import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import createLogger from 'redux-logger';
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
    const logger = createLogger();
    const store = createStore(rootReducer, preloadedState, applyMiddleware(ReduxThunk, logger))

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store

}
