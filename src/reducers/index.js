import { combineReducers } from "redux";

import userReducer from "./userReducers";

const reducer = combineReducers({
  user: userReducer,
});

export default reducer;
