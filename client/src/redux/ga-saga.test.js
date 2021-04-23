/* global jest */

import { expectSaga } from 'redux-saga-test-plan';
import ga from '../analytics';
import { actionTypes } from './action-types';
import { createGaSaga } from './ga-saga';

jest.mock('../analytics');

describe('ga-saga', () => {
  it('calls GA after executeGA action', () => {
    const GaTypes = { event: ga.event, page: ga.pageview, modal: ga.modalview };
    const mockEventPayload = {
      type: 'event',
      data: {
        category: 'Donation',
        action: 'year end gift paypal button click'
      }
    };
    return (
      expectSaga(createGaSaga, actionTypes)
        // Assert that the `call` with expected pramater will eventually happen.
        .call(GaTypes.event, mockEventPayload.data)

        // Dispatch any actions that the saga will `take`.
        .dispatch({ type: actionTypes.executeGA, payload: mockEventPayload })

        // Start the test.
        .run()
    );
  });
});
