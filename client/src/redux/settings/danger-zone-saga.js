import { navigate } from 'gatsby';
import { call, put, takeEvery, take } from 'redux-saga/effects';

import { resetUserData, fetchUser } from '../';
import { createFlashMessage } from '../../components/Flash/redux';
import { postResetProgress, postDeleteAccount } from '../../utils/ajax';
import { actionTypes as appTypes } from '../action-types';
import { deleteAccountError, resetProgressError } from './';

function* deleteAccountSaga() {
  try {
    yield call(postDeleteAccount);
    yield put(
      createFlashMessage({
        type: 'info',
        message: 'flash.account-deleted'
      })
    );
    // remove current user information from application state
    yield put(resetUserData());
    yield call(navigate, '/');
  } catch (e) {
    yield put(deleteAccountError(e));
  }
}

function* resetProgressSaga() {
  try {
    yield call(postResetProgress);
    yield put(
      createFlashMessage({
        type: 'info',
        message: 'flash.progress-reset'
      })
    );
    // refresh current user data in application state
    yield put(fetchUser());
    // wait for the refresh to complete
    yield take(appTypes.fetchUserComplete);
    // the complete action has been called
    yield call(navigate, '/');
  } catch (e) {
    yield put(resetProgressError(e));
  }
}

export function createDangerZoneSaga(types) {
  return [
    takeEvery(types.deleteAccount, deleteAccountSaga),
    takeEvery(types.resetProgress, resetProgressSaga)
  ];
}
