import * as types from './actionConstants';

// Register User Action Creators
export const registerUser = (credentials) => ({
  type: types.REGISTER_USER,
  payload: credentials,
});

export const registerUserSuccess = () => ({
  type: types.REGISTER_USER_SUCCESS,
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

// Confirm Email Action Creators
export const confirmEmail = (token, tokenId) => ({
  type: types.CONFIRM_EMAIL,
  payload: { token, tokenId }
});

export const confirmEmailSuccess = () => ({
  type: types.CONFIRM_EMAIL_SUCCESS,
});
