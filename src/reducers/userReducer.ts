import { createAction, createReducer } from "redux-act";

export const loginUser: any = createAction("login");
export const logoutUser: any = createAction("logout");

export const setSchool: any = createAction("user - change school");

export interface IUserLoginPayload {
  loggedIn: boolean;
  user: any;
}

export default createReducer({
    [loginUser]: (state: any, payload: IUserLoginPayload) => {
      return {
        ...state, 
        loggedIn: payload.loggedIn,
        user: payload.user,
      };
    },
    [logoutUser]: (state) => {
      return {
        ...state, 
        loggedIn: false,
        user: {},
      };
    },
  }, {
    loggedIn: false,
    user: {},
});