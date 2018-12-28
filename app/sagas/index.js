import { all } from 'redux-saga/effects';

import AuthSagas from './auth';

// Root saga
export default function* rootSaga() {
  yield all([...AuthSagas]);
}
