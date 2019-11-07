import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

import thunk from 'redux-thunk'
import logger from 'redux-logger'

// let middleware = [a, b]
// // if (process.env.NODE_ENV !== 'production') {
//         middleware = [...middleware, thunk, logger]
// // }

const makeConfiguredStore = (reducer, initialState) => createStore(reducer, initialState, applyMiddleware(thunk,logger))

export const makeStore = (initialState, { isServer, req, res, debug, storeKey }) => {
        const store = makeConfiguredStore(rootReducer, initialState);
        return store
}
