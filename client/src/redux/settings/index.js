import { createAction, handleActions } from 'redux-actions';
import { actionTypes as types, ns } from './action-types';
import { createDangerZoneSaga } from './danger-zone-saga';
import { createSettingsSagas } from './settings-sagas';
import { createUpdateMyEmailSaga } from './update-email-saga';
import { createUpdateLegacyCertSaga } from './update-legacy-certificate-saga';

export { ns };

const defaultFetchState = {
  pending: false,
  complete: false,
  errored: false,
  error: null
};

const initialState = {
  usernameValidation: {
    isValidUsername: false,
    fetchState: { ...defaultFetchState }
  }
};

export const sagas = [
  ...createSettingsSagas(types),
  ...createUpdateMyEmailSaga(types),
  ...createDangerZoneSaga(types),
  ...createUpdateLegacyCertSaga(types)
];

const checkForSuccessPayload = ({ type, payload }) =>
  type === 'success' ? payload : null;

export const submitNewAbout = createAction(types.submitNewAbout);
export const submitNewAboutComplete = createAction(
  types.submitNewAboutComplete,
  checkForSuccessPayload
);
export const submitNewAboutError = createAction(types.submitNewAboutError);

export const submitNewUsername = createAction(types.submitNewUsername);
export const submitNewUsernameComplete = createAction(
  types.submitNewUsernameComplete,
  ({ type, username }) => (type === 'success' ? username : null)
);
export const submitNewUsernameError = createAction(
  types.submitNewUsernameError
);

export const submitProfileUI = createAction(types.submitProfileUI);
export const submitProfileUIComplete = createAction(
  types.submitProfileUIComplete,
  checkForSuccessPayload
);
export const submitProfileUIError = createAction(types.submitProfileUIError);

export const updateMyEmail = createAction(types.updateMyEmail);
export const updateMyEmailComplete = createAction(types.updateMyEmailComplete);
export const updateMyEmailError = createAction(types.updateMyEmailError);

export const updateLegacyCert = createAction(types.updateLegacyCert);
export const updateLegacyCertComplete = createAction(
  types.updateLegacyCertComplete
);
export const updateLegacyCertError = createAction(types.updateLegacyCertError);

export const updateUserFlag = createAction(types.updateUserFlag);
export const updateUserFlagComplete = createAction(
  types.updateUserFlagComplete,
  checkForSuccessPayload
);
export const updateUserFlagError = createAction(types.updateUserFlagError);

export const validateUsername = createAction(types.validateUsername);
export const validateUsernameComplete = createAction(
  types.validateUsernameComplete
);
export const validateUsernameError = createAction(types.validateUsernameError);

export const verifyCert = createAction(types.verifyCert);
export const verifyCertComplete = createAction(
  types.verifyCertComplete,
  checkForSuccessPayload
);
export const verifyCertError = createAction(types.verifyCertError);

export const resetProgress = createAction(types.resetProgress);
export const resetProgressError = createAction(types.resetProgressError);

export const deleteAccount = createAction(types.deleteAccount);
export const deleteAccountError = createAction(types.deleteAccountError);

export const usernameValidationSelector = state => state[ns].usernameValidation;

export const reducer = handleActions(
  {
    [types.submitNewUsernameComplete]: state => ({
      ...state,
      usernameValidation: { ...initialState.usernameValidation }
    }),
    [types.validateUsername]: state => ({
      ...state,
      usernameValidation: {
        ...state.usernameValidation,
        isValidUsername: false,
        fetchState: { ...defaultFetchState, pending: true }
      }
    }),
    [types.validateUsernameComplete]: (state, { payload }) => ({
      ...state,
      usernameValidation: {
        ...state.usernameValidation,
        isValidUsername: !payload,
        fetchState: { ...defaultFetchState, pending: false, complete: true }
      }
    })
  },
  initialState
);
