import { SET_LOGIN } from "./actionTypes";

export const setLoggedIn = (login_status, login_user) => {
    return { type: SET_LOGIN, payload: { loggedIn: login_status, loggedUser: { name: login_user } } }
};
