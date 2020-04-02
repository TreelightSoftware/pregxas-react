import {reducer as toastrReducer} from "react-redux-toastr";
import { combineReducers } from "redux";

import appReducer from "./appReducer";
import userReducer from "./userReducer";


const reducers = combineReducers({
  appState: appReducer,
  toastr: toastrReducer,
  userState: userReducer,
});

export default reducers;