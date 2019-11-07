import { SET_LOGIN } from "./actionTypes";

export const setLoggedIn = (loginStat) => {
    return { type: SET_LOGIN, payload: loginStat}
}

