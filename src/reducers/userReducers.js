import * as userActions from '../actions/userActions';

// Initial state of the store which is empty
const INITIAL_STATE = {
  users: null,
  info: null
};

/**
 * Reducer function to perform actions on the store
 * @param {Object} state Current state of the store
 * @param {Object} action Action to perform on the store
 */
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userActions.SET_INFO:
      return { ...state, info: action.payload };

    case userActions.SET_USERS:
      return { ...state, users: action.payload };

    default:
      return state;
  }
}

export default userReducer;
