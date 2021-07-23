import { createAction, handleActions } from 'redux-actions';

import { createTypes } from '../../../utils/create-types';

export const ns = 'curriculumMap';

const initialState = {
  expandedState: {
    block: {}
  }
};

const types = createTypes(['resetExpansion', 'toggleBlock'], ns);

export const resetExpansion = createAction(types.resetExpansion);
export const toggleBlock = createAction(types.toggleBlock);

export const makeExpandedBlockSelector = block => state =>
  !!state[ns].expandedState.block[block];

export const reducer = handleActions(
  {
    [types.resetExpansion]: state => ({
      ...state,
      expandedState: {
        block: {}
      }
    }),
    [types.toggleBlock]: (state, { payload }) => ({
      ...state,
      expandedState: {
        ...state.expandedState,
        block: {
          ...state.expandedState.block,
          [payload]: !state.expandedState.block[payload]
        }
      }
    })
  },
  initialState
);
