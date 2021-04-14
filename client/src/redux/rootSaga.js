import { all } from 'redux-saga/effects';

import { sagas as challengeSagas } from '../templates/Challenges/redux';
import errorSagas from './error-saga';
import { sagas as settingsSagas } from './settings';
import { sagas as appSagas } from './';

export default function* rootSaga() {
  yield all([...errorSagas, ...appSagas, ...challengeSagas, ...settingsSagas]);
}
