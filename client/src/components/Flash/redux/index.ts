import { createAction, handleActions } from 'redux-actions';
import { nanoid } from 'nanoid';

import { createTypes } from '../../../utils/create-types';

export const ns = 'flash';

export interface FlashMessage {
  type: string;
  message: string;
  id: string;
  variables: Record<string, unknown>;
}

const initialState = {
  message: {}
};

export const types = createTypes(
  ['createFlashMessage', 'removeFlashMessage'],
  ns
);

export const sagas = [];

export const createFlashMessage = createAction(
  types.createFlashMessage,
  (msg: string[]) => ({ id: nanoid(), ...msg })
);
export const removeFlashMessage = createAction(types.removeFlashMessage);

// TODO: Once state is typed, add here, remove disable.
// eslint-disable-next-line
export const flashMessageSelector = (state: any): FlashMessage => state[ns].message;

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
