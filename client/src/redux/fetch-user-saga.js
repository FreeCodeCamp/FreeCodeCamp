import { call, put, takeEvery } from 'redux-saga/effects';

import { getSessionUser, getUserProfile } from '../utils/ajax';
import { jwt } from './cookieValues';
import {
  fetchUserComplete,
  fetchUserError,
  fetchProfileForUserError,
  fetchProfileForUserComplete
} from './';

function* fetchSessionUser() {
  if (!jwt) {
    yield put(fetchUserComplete({ user: {}, username: '' }));
    return;
  }
  try {
    const {
      data: { user = {}, result = '', sessionMeta = {} }
    } = yield call(getSessionUser);
    const appUser = user[result] || {};
    yield put(
      fetchUserComplete({ user: appUser, username: result, sessionMeta })
    );
  } catch (e) {
    yield put(fetchUserError(e));
  }
}

function* fetchOtherUser({ payload: maybeUser = '' }) {
  try {
    const maybeUserLC = maybeUser.toLowerCase();
    const { data } = yield call(getUserProfile, maybeUserLC);

    const { entities: { user = {} } = {}, result = '' } = data;
    const otherUser = user[result] || {};
    yield put(
      fetchProfileForUserComplete({ user: otherUser, username: result })
    );
  } catch (e) {
    yield put(fetchProfileForUserError(e));
  }
}

export function createFetchUserSaga(types) {
  return [
    takeEvery(types.fetchUser, fetchSessionUser),
    takeEvery(types.fetchProfileForUser, fetchOtherUser)
  ];
}
