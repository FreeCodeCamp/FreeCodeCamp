import {
  put,
  select,
  takeEvery,
  takeLeading,
  delay,
  call,
  take
} from 'redux-saga/effects';

import {
  addDonation,
  postChargeStripe,
  postCreateStripeSession
} from '../utils/ajax';
import {
  openDonationModal,
  preventBlockDonationRequests,
  shouldRequestDonationSelector,
  preventProgressDonationRequests,
  recentlyClaimedBlockSelector,
  addDonationComplete,
  addDonationError,
  postChargeStripeComplete,
  postChargeStripeError,
  types as appTypes
} from './';

const defaultDonationError = `Something is not right. Please contact donors@freecodecamp.org`;

function* showDonateModalSaga() {
  let shouldRequestDonation = yield select(shouldRequestDonationSelector);
  if (shouldRequestDonation) {
    yield delay(200);
    const recentlyClaimedBlock = yield select(recentlyClaimedBlockSelector);
    yield put(openDonationModal());
    yield take(appTypes.closeDonationModal);
    if (recentlyClaimedBlock) {
      yield put(preventBlockDonationRequests());
    } else {
      yield put(preventProgressDonationRequests());
    }
  }
}

function* addDonationSaga({ payload }) {
  try {
    yield call(addDonation, payload);
    yield put(addDonationComplete());
  } catch (error) {
    const data =
      error.response && error.response.data
        ? error.response.data
        : {
            message: defaultDonationError
          };
    yield put(addDonationError(data.message));
  }
}

function* createStripeSessionSaga({ payload: { stripe, data } }) {
  try {
    const session = yield call(postCreateStripeSession, {
      ...data,
      location: window.location.href
    });
    stripe.redirectToCheckout({
      sessionId: session.data.id
    });
  } catch (error) {
    const err =
      error.response && error.response.data
        ? error.response.data.message
        : defaultDonationError;
    yield put(addDonationError(err));
  }
}

function* postChargeStripeSaga({ payload }) {
  try {
    yield call(postChargeStripe, payload);
    yield put(postChargeStripeComplete());
  } catch (error) {
    const err =
      error.response && error.response.data
        ? error.response.data.error
        : defaultDonationError;
    yield put(postChargeStripeError(err));
  }
}

export function createDonationSaga(types) {
  return [
    takeEvery(types.tryToShowDonationModal, showDonateModalSaga),
    takeEvery(types.addDonation, addDonationSaga),
    takeLeading(types.postChargeStripe, postChargeStripeSaga),
    takeLeading(types.createStripeSession, createStripeSessionSaga)
  ];
}
