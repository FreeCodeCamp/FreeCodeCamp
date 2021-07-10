import { createAction, handleActions } from 'redux-actions';
import { uniqBy } from 'lodash-es';
import store from 'store';

import { createTypes, createAsyncTypes } from '../utils/create-types';
import { createFetchUserSaga } from './fetch-user-saga';
import { createAcceptTermsSaga } from './accept-terms-saga';
import { createAppMountSaga } from './app-mount-saga';
import { createReportUserSaga } from './report-user-saga';
import { createShowCertSaga } from './show-cert-saga';
import { createNightModeSaga } from './night-mode-saga';
import { createDonationSaga } from './donation-saga';
import { createGaSaga } from './ga-saga';

import hardGoToEpic from './hard-go-to-epic';
import failedUpdatesEpic from './failed-updates-epic';
import updateCompleteEpic from './update-complete-epic';

import { types as settingsTypes } from './settings';
import { types as challengeTypes } from '../templates/Challenges/redux/';
// eslint-disable-next-line max-len
import { CURRENT_CHALLENGE_KEY } from '../templates/Challenges/redux/current-challenge-saga';

export const ns = 'app';

export const defaultFetchState = {
  pending: true,
  complete: false,
  errored: false,
  error: null
};

export const defaultDonationFormState = {
  redirecting: false,
  processing: false,
  success: false,
  error: ''
};

const initialState = {
  appUsername: '',
  recentlyClaimedBlock: null,
  canRequestProgressDonation: true,
  completionCount: 0,
  currentChallengeId: store.get(CURRENT_CHALLENGE_KEY),
  showCert: {},
  showCertFetchState: {
    ...defaultFetchState
  },
  user: {},
  userFetchState: {
    ...defaultFetchState
  },
  userProfileFetchState: {
    ...defaultFetchState
  },
  sessionMeta: { activeDonations: 0 },
  showDonationModal: false,
  isOnline: true,
  donationFormState: {
    ...defaultDonationFormState
  }
};

export const types = createTypes(
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
    ...createAsyncTypes('fetchProfileForUser'),
    ...createAsyncTypes('acceptTerms'),
    ...createAsyncTypes('showCert'),
    ...createAsyncTypes('reportUser')
  ],
  ns
);

export const epics = [hardGoToEpic, failedUpdatesEpic, updateCompleteEpic];

export const sagas = [
  ...createAcceptTermsSaga(types),
  ...createAppMountSaga(types),
  ...createDonationSaga(types),
  ...createGaSaga(types),
  ...createFetchUserSaga(types),
  ...createShowCertSaga(types),
  ...createReportUserSaga(types),
  ...createNightModeSaga({ ...types, ...settingsTypes })
];

export const appMount = createAction(types.appMount);

export const tryToShowDonationModal = createAction(
  types.tryToShowDonationModal
);

export const executeGA = createAction(types.executeGA);

export const allowBlockDonationRequests = createAction(
  types.allowBlockDonationRequests
);
export const closeDonationModal = createAction(types.closeDonationModal);
export const openDonationModal = createAction(types.openDonationModal);
export const preventBlockDonationRequests = createAction(
  types.preventBlockDonationRequests
);
export const preventProgressDonationRequests = createAction(
  types.preventProgressDonationRequests
);
export const updateDonationFormState = createAction(
  types.updateDonationFormState
);

export const onlineStatusChange = createAction(types.onlineStatusChange);

// TODO: re-evaluate this since /internal is no longer used.
// `hardGoTo` is used to hit the API server directly
// without going through /internal
// used for things like /signin and /signout
export const hardGoTo = createAction(types.hardGoTo);

export const submitComplete = createAction(types.submitComplete);
export const updateComplete = createAction(types.updateComplete);
export const updateFailed = createAction(types.updateFailed);

export const acceptTerms = createAction(types.acceptTerms);
export const acceptTermsComplete = createAction(types.acceptTermsComplete);
export const acceptTermsError = createAction(types.acceptTermsError);

export const fetchUser = createAction(types.fetchUser);
export const fetchUserComplete = createAction(types.fetchUserComplete);
export const fetchUserError = createAction(types.fetchUserError);

export const addDonation = createAction(types.addDonation);
export const addDonationComplete = createAction(types.addDonationComplete);
export const addDonationError = createAction(types.addDonationError);

export const fetchProfileForUser = createAction(types.fetchProfileForUser);
export const fetchProfileForUserComplete = createAction(
  types.fetchProfileForUserComplete
);
export const fetchProfileForUserError = createAction(
  types.fetchProfileForUserError
);

export const reportUser = createAction(types.reportUser);
export const reportUserComplete = createAction(types.reportUserComplete);
export const reportUserError = createAction(types.reportUserError);

export const resetUserData = createAction(types.resetUserData);

export const showCert = createAction(types.showCert);
export const showCertComplete = createAction(types.showCertComplete);
export const showCertError = createAction(types.showCertError);

export const updateCurrentChallengeId = createAction(
  types.updateCurrentChallengeId
);

export const completedChallengesSelector = state =>
  userSelector(state).completedChallenges || [];
export const completionCountSelector = state => state[ns].completionCount;
export const currentChallengeIdSelector = state => state[ns].currentChallengeId;
export const isDonatingSelector = state => userSelector(state).isDonating;
export const isOnlineSelector = state => state[ns].isOnline;
export const isSignedInSelector = state => !!state[ns].appUsername;
export const isDonationModalOpenSelector = state => state[ns].showDonationModal;
export const recentlyClaimedBlockSelector = state =>
  state[ns].recentlyClaimedBlock;
export const donationFormStateSelector = state => state[ns].donationFormState;
export const signInLoadingSelector = state =>
  userFetchStateSelector(state).pending;
export const showCertSelector = state => state[ns].showCert;
export const showCertFetchStateSelector = state => state[ns].showCertFetchState;
export const shouldRequestDonationSelector = state => {
  const completedChallenges = completedChallengesSelector(state);
  const completionCount = completionCountSelector(state);
  const canRequestProgressDonation = state[ns].canRequestProgressDonation;
  const isDonating = isDonatingSelector(state);
  const recentlyClaimedBlock = recentlyClaimedBlockSelector(state);

  // don't request donation if already donating
  if (isDonating) return false;

  // a block has been completed
  if (recentlyClaimedBlock) return true;

  // a donation has already been requested
  if (!canRequestProgressDonation) return false;

  // donations only appear after the user has completed ten challenges (i.e.
  // not before the 11th challenge has mounted)
  if (completedChallenges.length < 10) {
    return false;
  }
  // this will mean we have completed 3 or more challenges this browser session
  // and enough challenges overall to not be new
  return completionCount >= 3;
};

export const userByNameSelector = username => state => {
  const { user } = state[ns];
  // TODO: Why return a string or empty objet literal?
  return username in user ? user[username] : {};
};

export const certificatesByNameSelector = username => state => {
  const {
    isRespWebDesignCert,
    is2018DataVisCert,
    isFrontEndLibsCert,
    isJsAlgoDataStructCert,
    isApisMicroservicesCert,
    isInfosecQaCert,
    isQaCertV7,
    isInfosecCertV7,
    isFrontEndCert,
    isBackEndCert,
    isDataVisCert,
    isFullStackCert,
    isSciCompPyCertV7,
    isDataAnalysisPyCertV7,
    isMachineLearningPyCertV7,
    isRelationalDatabasesCertV8
  } = userByNameSelector(username)(state);
  return {
    hasModernCert:
      isRespWebDesignCert ||
      is2018DataVisCert ||
      isFrontEndLibsCert ||
      isJsAlgoDataStructCert ||
      isApisMicroservicesCert ||
      isQaCertV7 ||
      isInfosecCertV7 ||
      isFullStackCert ||
      isSciCompPyCertV7 ||
      isDataAnalysisPyCertV7 ||
      isMachineLearningPyCertV7 ||
      isRelationalDatabasesCertV8,
    hasLegacyCert:
      isFrontEndCert || isBackEndCert || isDataVisCert || isInfosecQaCert,
    isFullStackCert,
    currentCerts: [
      {
        show: isRespWebDesignCert,
        title: 'Responsive Web Design Certification',
        certSlug: 'responsive-web-design'
      },
      {
        show: isJsAlgoDataStructCert,
        title: 'JavaScript Algorithms and Data Structures Certification',
        certSlug: 'javascript-algorithms-and-data-structures'
      },
      {
        show: isFrontEndLibsCert,
        title: 'Front End Development Libraries Certification',
        certSlug: 'front-end-development-libraries'
      },
      {
        show: is2018DataVisCert,
        title: 'Data Visualization Certification',
        certSlug: 'data-visualization'
      },
      {
        show: isApisMicroservicesCert,
        title: 'Back End Development and APIs Certification',
        certSlug: 'back-end-development-and-apis'
      },
      {
        show: isQaCertV7,
        title: ' Quality Assurance Certification',
        certSlug: 'quality-assurance-v7'
      },
      {
        show: isInfosecCertV7,
        title: 'Information Security Certification',
        certSlug: 'information-security-v7'
      },
      {
        show: isSciCompPyCertV7,
        title: 'Scientific Computing with Python Certification',
        certSlug: 'scientific-computing-with-python-v7'
      },
      {
        show: isDataAnalysisPyCertV7,
        title: 'Data Analysis with Python Certification',
        certSlug: 'data-analysis-with-python-v7'
      },
      {
        show: isMachineLearningPyCertV7,
        title: 'Machine Learning with Python Certification',
        certSlug: 'machine-learning-with-python-v7'
      },
      {
        show: isRelationalDatabasesCertV8,
        title: 'Relational Databases Certification',
        certSlug: 'relational-databases-v8'
      }
    ],
    legacyCerts: [
      {
        show: isFrontEndCert,
        title: 'Front End Certification',
        certSlug: 'legacy-front-end'
      },
      {
        show: isBackEndCert,
        title: 'Back End Certification',
        certSlug: 'legacy-back-end'
      },
      {
        show: isDataVisCert,
        title: 'Data Visualization Certification',
        certSlug: 'legacy-data-visualization'
      },
      {
        show: isInfosecQaCert,
        title: 'Information Security and Quality Assurance Certification',
        // Keep the current public profile cert slug
        certSlug: 'information-security-and-quality-assurance'
      },
      {
        show: isFullStackCert,
        title: 'Full Stack Certification',
        // Keep the current public profile cert slug
        certSlug: 'full-stack'
      }
    ]
  };
};

export const userFetchStateSelector = state => state[ns].userFetchState;
export const userProfileFetchStateSelector = state =>
  state[ns].userProfileFetchState;
export const usernameSelector = state => state[ns].appUsername;
export const userSelector = state => {
  const username = usernameSelector(state);

  return state[ns].user[username] || {};
};

export const sessionMetaSelector = state => state[ns].sessionMeta;

function spreadThePayloadOnUser(state, payload) {
  return {
    ...state,
    user: {
      ...state.user,
      [state.appUsername]: {
        ...state.user[state.appUsername],
        ...payload
      }
    }
  };
}

export const reducer = handleActions(
  {
    [types.acceptTermsComplete]: (state, { payload }) => {
      const { appUsername } = state;
      return {
        ...state,
        user: {
          ...state.user,
          [appUsername]: {
            ...state.user[appUsername],
            // TODO: the user accepts the privacy terms in practice during auth
            // however, it's currently being used to track if they've accepted
            // or rejected the newsletter. Ideally this should be migrated,
            // since they can't sign up without accepting the terms.
            acceptedPrivacyTerms: true,
            sendQuincyEmail:
              payload === null
                ? state.user[appUsername].sendQuincyEmail
                : payload
          }
        }
      };
    },
    [types.allowBlockDonationRequests]: (state, { payload }) => {
      return {
        ...state,
        recentlyClaimedBlock: payload
      };
    },
    [types.updateDonationFormState]: (state, { payload }) => ({
      ...state,
      donationFormState: { ...state.donationFormState, ...payload }
    }),
    [types.addDonation]: state => ({
      ...state,
      donationFormState: { ...defaultDonationFormState, processing: true }
    }),
    [types.addDonationComplete]: state => {
      const { appUsername } = state;
      return {
        ...state,
        user: {
          ...state.user,
          [appUsername]: {
            ...state.user[appUsername],
            isDonating: true
          }
        },

        donationFormState: { ...defaultDonationFormState, success: true }
      };
    },
    [types.addDonationError]: (state, { payload }) => ({
      ...state,
      donationFormState: { ...defaultDonationFormState, error: payload }
    }),
    [types.fetchUser]: state => ({
      ...state,
      userFetchState: { ...defaultFetchState }
    }),
    [types.fetchProfileForUser]: state => ({
      ...state,
      userProfileFetchState: { ...defaultFetchState }
    }),
    [types.fetchUserComplete]: (
      state,
      { payload: { user, username, sessionMeta } }
    ) => ({
      ...state,
      user: {
        ...state.user,
        [username]: { ...user, sessionUser: true }
      },
      appUsername: username,
      currentChallengeId: user.currentChallengeId,
      userFetchState: {
        pending: false,
        complete: true,
        errored: false,
        error: null
      },
      sessionMeta: {
        ...state.sessionMeta,
        ...sessionMeta
      }
    }),
    [types.fetchUserError]: (state, { payload }) => ({
      ...state,
      userFetchState: {
        pending: false,
        complete: false,
        errored: true,
        error: payload
      }
    }),
    [types.fetchProfileForUserComplete]: (
      state,
      { payload: { user, username } }
    ) => {
      const previousUserObject =
        username in state.user ? state.user[username] : {};
      return {
        ...state,
        user: {
          ...state.user,
          [username]: { ...previousUserObject, ...user }
        },
        userProfileFetchState: {
          ...defaultFetchState,
          pending: false,
          complete: true
        }
      };
    },
    [types.fetchProfileForUserError]: (state, { payload }) => ({
      ...state,
      userProfileFetchState: {
        pending: false,
        complete: false,
        errored: true,
        error: payload
      }
    }),
    [types.onlineStatusChange]: (state, { payload: isOnline }) => ({
      ...state,
      isOnline
    }),
    [types.closeDonationModal]: state => ({
      ...state,
      showDonationModal: false
    }),
    [types.openDonationModal]: state => ({
      ...state,
      showDonationModal: true
    }),
    [types.preventBlockDonationRequests]: state => ({
      ...state,
      recentlyClaimedBlock: null
    }),
    [types.preventProgressDonationRequests]: state => ({
      ...state,
      canRequestProgressDonation: false
    }),
    [types.resetUserData]: state => ({
      ...state,
      appUsername: '',
      user: {}
    }),
    [types.showCert]: state => ({
      ...state,
      showCert: {},
      showCertFetchState: { ...defaultFetchState }
    }),
    [types.showCertComplete]: (state, { payload }) => ({
      ...state,
      showCert: payload,
      showCertFetchState: {
        ...defaultFetchState,
        pending: false,
        complete: true
      }
    }),
    [types.showCertError]: (state, { payload }) => ({
      ...state,
      showCert: {},
      showCertFetchState: {
        pending: false,
        complete: false,
        errored: true,
        error: payload
      }
    }),
    [types.submitComplete]: (state, { payload }) => {
      let submittedchallenges = [{ ...payload, completedDate: Date.now() }];
      if (payload.challArray) {
        submittedchallenges = payload.challArray;
      }
      const { appUsername } = state;
      return {
        ...state,
        completionCount: state.completionCount + 1,
        user: {
          ...state.user,
          [appUsername]: {
            ...state.user[appUsername],
            completedChallenges: uniqBy(
              [
                ...submittedchallenges,
                ...state.user[appUsername].completedChallenges
              ],
              'id'
            )
          }
        }
      };
    },
    [challengeTypes.challengeMounted]: (state, { payload }) => ({
      ...state,
      currentChallengeId: payload
    }),
    [settingsTypes.updateLegacyCertComplete]: (state, { payload }) => {
      const { appUsername } = state;
      return {
        ...state,
        completionCount: state.completionCount + 1,
        user: {
          ...state.user,
          [appUsername]: {
            ...state.user[appUsername],
            completedChallenges: uniqBy(
              [...state.user[appUsername].completedChallenges, payload],
              'id'
            )
          }
        }
      };
    },
    [settingsTypes.submitNewUsernameComplete]: (state, { payload }) =>
      payload
        ? {
            ...state,
            user: {
              ...state.user,
              [state.appUsername]: {
                ...state.user[state.appUsername],
                username: payload
              }
            }
          }
        : state,
    [settingsTypes.submitNewAboutComplete]: (state, { payload }) =>
      payload ? spreadThePayloadOnUser(state, payload) : state,
    [settingsTypes.updateMyEmailComplete]: (state, { payload }) =>
      payload ? spreadThePayloadOnUser(state, payload) : state,
    [settingsTypes.updateUserFlagComplete]: (state, { payload }) =>
      payload ? spreadThePayloadOnUser(state, payload) : state,
    [settingsTypes.verifyCertComplete]: (state, { payload }) =>
      payload ? spreadThePayloadOnUser(state, payload) : state,
    [settingsTypes.submitProfileUIComplete]: (state, { payload }) =>
      payload
        ? {
            ...state,
            user: {
              ...state.user,
              [state.appUsername]: {
                ...state.user[state.appUsername],
                profileUI: { ...payload }
              }
            }
          }
        : state
  },
  initialState
);
