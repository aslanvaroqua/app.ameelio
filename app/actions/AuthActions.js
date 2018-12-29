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

export const facebookLogin = () => ({
  type: types.FACEBOOK_LOG_IN,
});

export const googleLogin = () => ({
  type: types.GOOGLE_LOG_IN,
});

export const socialLoginRedirect = () => ({
  type: types.SOCIAL_LOG_IN_REDIRECT,
});

// Log out Action Creators
export const logout = () => ({
  type: types.LOG_OUT,
});

export const logoutSuccess = ({ user }) => ({
  type: types.LOG_OUT_SUCCESS,
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
