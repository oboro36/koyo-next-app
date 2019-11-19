import { createStore } from "redux";
import rootReducer from "./reducers";

const makeStore = (initialState, options) => {
    return createStore(rootReducer, initialState);
};

export default makeStore

