import qs from 'query-string';
import { put, takeEvery } from 'redux-saga/effects';
import { createFlashMessage } from '../components/Flash/redux';

function* parseMessagesSaga() {
  const search = window.location.search.slice();
  // TODO(Bouncey): Find a way to clear the search with causing a re-render
  if (search) {
    const { messages } = qs.parse(search, { arrayFormat: 'index' });
    if (messages) {
      const flashMap = qs.parse(messages, { arrayFormat: 'index' });
      const flash = Object.keys(flashMap).reduce(
        (acc, type) => [
          ...acc,
          ...flashMap[type].map(message => ({ type, message }))
        ],
        []
      );
      for (let i = 0; i < flash.length; i++) {
        yield put(createFlashMessage(flash[i]));
      }
    }
  }
}

export function createAppMountSaga(types) {
  return [takeEvery(types.appMount, parseMessagesSaga)];
}
