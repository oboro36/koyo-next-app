import { SET_LOGIN } from "../actionTypes";

const initialState = {
    loggedIn: false,
    loggedUser: {
        name: 'unknown'
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN: 
            const payload= action.payload;
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}
