import { SET_LOGIN } from "./actionTypes";

export const setLoggedIn = login_status => ({ type: SET_LOGIN, payload: { login_status } });
