import * as types from './actionConstants';

// Register User Action Creators
export const registerUser = (credentials) => ({
  type: types.REGISTER_USER,
  payload: credentials,
});

export const registerUserSuccess = ({ user }) => ({
  type: types.REGISTER_USER_SUCCESS,
  payload: { user }
});

// Login Action Creators
export const login = (credentials) => ({
  type: types.LOG_IN,
  payload: credentials,
});

export const loginSuccess = ({ user }) => ({
  type: types.LOG_IN_SUCESS,
  payload: { user }
});
