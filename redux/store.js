import { createStore } from "redux";
import rootReducer from "./reducers";

const makeConfiguredStore = (reducer,initialState) => createStore(reducer, initialState)

export const makeStore = (initialState, {isServer, req, res, debug, storeKey}) => {
        const store = makeConfiguredStore(rootReducer, initialState);
        return store
}

// store.subscribe(() => {
//     console.log(store.getState());
// });
