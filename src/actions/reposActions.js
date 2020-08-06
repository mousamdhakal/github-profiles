export const SET_REPOS = 'SET_REPOS';
export const SET_FILTERED_REPOS = 'SET_FILTERED_REPOS';

export const setRepos = (repos) => ({
  type: SET_REPOS,
  payload: repos
});

export const setFilteredRepos = (repos) => ({
  type: SET_FILTERED_REPOS,
  payload: repos
});
