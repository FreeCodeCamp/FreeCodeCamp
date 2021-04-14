import { createTypes, createAsyncTypes } from '../utils/createTypes';

export const ns = 'app';

export const actionTypes = createTypes(
  [
    'appMount',
    'hardGoTo',
    'allowBlockDonationRequests',
    'closeDonationModal',
    'preventBlockDonationRequests',
    'preventProgressDonationRequests',
    'openDonationModal',
    'onlineStatusChange',
    'resetUserData',
    'tryToShowDonationModal',
    'executeGA',
    'submitComplete',
    'updateComplete',
    'updateCurrentChallengeId',
    'updateFailed',
    'updateDonationFormState',
    ...createAsyncTypes('fetchUser'),
    ...createAsyncTypes('addDonation'),
    ...createAsyncTypes('createStripeSession'),
    ...createAsyncTypes('postChargeStripe'),
    ...createAsyncTypes('fetchProfileForUser'),
    ...createAsyncTypes('acceptTerms'),
    ...createAsyncTypes('showCert'),
    ...createAsyncTypes('reportUser')
  ],
  ns
);
