import { nanoid } from 'nanoid';
import { createAction, handleActions } from 'redux-actions';

import { createTypes } from '../../../utils/createTypes';

export const ns = 'flash';

const initialState = {
  message: {}
};

const types = createTypes(['createFlashMessage', 'removeFlashMessage'], ns);

export const sagas = [];

export const createFlashMessage = createAction(
  types.createFlashMessage,
  msg => ({ id: nanoid(), ...msg })
);
export const removeFlashMessage = createAction(types.removeFlashMessage);

export const flashMessageSelector = state => state[ns].message;

export const reducer = handleActions(
  {
    [types.createFlashMessage]: (state, { payload }) => ({
      ...state,
      message: payload
    }),
    [types.removeFlashMessage]: state => ({
      ...state,
      message: {}
    })
  },
  initialState
);
