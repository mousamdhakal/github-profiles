export const SET_USERS = 'SET_USERS';
export const SET_INFO = 'SET_INFO';
export const SET_REPOS = 'SET_REPOS';

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users
});

export const setInfo = (info) => ({
  type: SET_INFO,
  payload: info
});

export const setRepos = (repos) => ({
  type: SET_REPOS,
  payload: repos
});
