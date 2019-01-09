import { all } from 'redux-saga/effects';

import AuthSagas from './auth';
import LettersSagas from './letters';

// Root saga
export default function* rootSaga() {
  yield all([...AuthSagas, ...LettersSagas]);
}
