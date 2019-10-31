import { SET_LOGIN } from "../actionTypes";

const initialState = {
    loggedIn: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN: {
            const { loggedIn } = action.payload;
            return {
                ...state,
                loggedIn: loggedIn,
            };
        }
        default:
            return state;
    }
}
