import {createStrore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
    const store = createStrore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware, createLogger()))

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store

}
