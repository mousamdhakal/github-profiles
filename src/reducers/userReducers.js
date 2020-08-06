import * as userActions from '../actions/userActions';

const INITIAL_STATE = {
  users: null,
  info: null,
  repos: null
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userActions.SET_INFO:
      return { ...state, info: action.payload };

    case userActions.SET_USERS:
      return { ...state, users: action.payload };

    case userActions.SET_REPOS:
      return { ...state, repos: action.payload };

    default:
      return state;
  }
}

export default userReducer;
