import { combineReducers } from 'redux';

import userReducer from './userReducers';
import reposReducer from './reposReducers';

const reducer = combineReducers({
  user: userReducer,
  repo: reposReducer
});

export default reducer;
