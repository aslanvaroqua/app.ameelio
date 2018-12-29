import {
  // take,
  // takeEvery,
  takeLatest,
  call,
  fork,
  put,
  select,
} from 'redux-saga/effects';
import {
  UserPasswordCredential,
  UserPasswordAuthProviderClient,
  Stitch,
  GoogleRedirectCredential,
  FacebookRedirectCredential,
} from 'mongodb-stitch-browser-sdk';

import {
  REGISTER_USER,
  LOG_IN, CONFIRM_EMAIL,
  FACEBOOK_LOG_IN,
  GOOGLE_LOG_IN,
  SOCIAL_LOG_IN_REDIRECT,
} from '../actions/actionConstants';
import { registerUserSuccess, loginSuccess, confirmEmailSuccess } from '../actions/AuthActions';

function getStitchClient(state) {
  return state.getIn(['auth', 'stitchClient']);
}

function stitchRegister({ client, credential: { email, password } }) {
  return client.registerWithEmail(email, password);
}

function* registerUser(action) {
  try {
    const { payload: { email, password } } = action;
    const emailPassClient = Stitch.defaultAppClient.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory);
    yield call(stitchRegister, { client: emailPassClient, credential: { email, password } });
    yield put(registerUserSuccess());
    window.location.href = '/';
  } catch (error) {
    console.log(error);
  }
}

function* watchRegisterUserRequest() {
  yield takeLatest(REGISTER_USER, registerUser);
}

function stitchLogin({ client, credential }) {
  return client.auth.loginWithCredential(credential);
}

function* login(action) {
  try {
    const { payload: { email, password } } = action;
    const client = yield select(getStitchClient);
    const credential = new UserPasswordCredential(email, password);
    yield call(stitchLogin, { client, credential });
    yield put(loginSuccess({ user: true }));
    window.location.href = '/app';
  } catch (error) {
    console.log(error);
  }
}

function* watchLoginRequest() {
  yield takeLatest(LOG_IN, login);
}

function stitchConfirmEmail({ client, token, tokenId }) {
  return client.confirmUser(token, tokenId);
}

function* confirmEmail(action) {
  try {
    const { payload: { token, tokenId } } = action;
    const emailPassClient = Stitch.defaultAppClient.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory);
    yield call(stitchConfirmEmail, { client: emailPassClient, token, tokenId });
    yield put(confirmEmailSuccess());
    window.location.href = '/login';
  } catch (error) {
    console.log(error);
  }
}

function* watchConfirmEmailRequest() {
  yield takeLatest(CONFIRM_EMAIL, confirmEmail);
}

function stitchSocialLogin({ client, credential }) {
  return client.auth.loginWithRedirect(credential);
}

function* googleLogin() {
  try {
    const credential = new GoogleRedirectCredential();
    const client = yield select(getStitchClient);
    yield call(stitchSocialLogin, { client, credential });
  } catch (error) {
    console.log(error);
  }
}

function* watchGoogleLoginRequest() {
  yield takeLatest(GOOGLE_LOG_IN, googleLogin);
}

function* facebookLogin() {
  try {
    const credential = new FacebookRedirectCredential();
    const client = yield select(getStitchClient);
    yield call(stitchSocialLogin, { client, credential });
  } catch (error) {
    console.log(error);
  }
}

function* watchFacebookLoginRequest() {
  yield takeLatest(FACEBOOK_LOG_IN, facebookLogin);
}

function stitchSocialLoginRedirect({ client }) {
  return client.auth.handleRedirectResult();
}

function* socialLoginRedirect() {
  try {
    const client = yield select(getStitchClient);
    yield call(stitchSocialLoginRedirect, { client });
    window.location.href = '/app';
  } catch (error) {
    console.log(error);
  }
}

function* watchSocialLoginRedirect() {
  yield takeLatest(SOCIAL_LOG_IN_REDIRECT, socialLoginRedirect);
}

const authSagas = [
  fork(watchRegisterUserRequest),
  fork(watchLoginRequest),
  fork(watchConfirmEmailRequest),
  fork(watchGoogleLoginRequest),
  fork(watchFacebookLoginRequest),
  fork(watchSocialLoginRedirect),
];

export default authSagas;
