import { takeEvery, call, put } from 'redux-saga/effects';

import { submitComplete } from '../';
import { createFlashMessage } from '../../components/Flash/redux';
import { putUpdateLegacyCert } from '../../utils/ajax';
import reallyWeirdErrorMessage from '../../utils/reallyWeirdErrorMessage';
import { updateLegacyCertError } from './';

function* updateLegacyCertSaga({
  payload: { superBlock, challengesToUpdate }
}) {
  // shape the body of the http call so it is consumable by api
  const body = {
    projects: {
      [superBlock]: challengesToUpdate
    }
  };
  // shape to update completed challenges in redux store
  let reduxShape = [];
  for (let obj in challengesToUpdate) {
    if (challengesToUpdate.hasOwnProperty(obj)) {
      reduxShape.push({ id: obj, solution: challengesToUpdate[obj] });
    }
  }

  try {
    const { data: response } = yield call(putUpdateLegacyCert, body);
    yield put(submitComplete({ challArray: reduxShape }));
    yield put(createFlashMessage(response));
  } catch (e) {
    yield put(updateLegacyCertError(e));
    yield put(createFlashMessage(reallyWeirdErrorMessage));
  }
}

export function createUpdateLegacyCertSaga(types) {
  return [takeEvery(types.updateLegacyCert, updateLegacyCertSaga)];
}
