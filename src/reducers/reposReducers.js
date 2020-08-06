import * as reposActions from '../actions/reposActions';

// Initial state of the store which is empty
const INITIAL_STATE = {
  repos: null,
  filteredRepos: null
};

/**
 * Reducer function to perform actions on the store
 * @param {Object} state Current state of the store
 * @param {Object} action Action to perform on the store
 */
function reposReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case reposActions.SET_REPOS:
      return { ...state, repos: action.payload };

    case reposActions.SET_FILTERED_REPOS:
      return { ...state, filteredRepos: action.payload };

    default:
      return state;
  }
}

export default reposReducer;
