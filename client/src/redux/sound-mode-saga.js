/* eslint-disable require-yield */

import { takeEvery } from 'redux-saga/effects';
import store from 'store';

const soundKey = 'fcc-sound';

export function setSound(setting) {
  store.set(soundKey, setting);
}

function* updateLocalSoundSaga({ payload: { user, sound } }) {
  if (user) {
    const { sound = false } = user;
    return setSound(sound);
  }
  return setSound(sound);
}

export function createSoundModeSaga(types) {
  return [
    takeEvery(types.fetchUserComplete, updateLocalSoundSaga),
    takeEvery(types.updateUserFlagComplete, updateLocalSoundSaga)
  ];
}
