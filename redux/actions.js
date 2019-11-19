import { SET_LOGIN } from "./actionTypes";

export const setLoggedIn = login_status => {
    return { type: SET_LOGIN, payload: { loggedIn: login_status } }
};
