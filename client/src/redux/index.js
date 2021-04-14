import { uniqBy } from 'lodash';
import { createAction, handleActions } from 'redux-actions';
import store from 'store';

import { actionTypes as challengeTypes } from '../templates/Challenges/redux/action-types';
import { CURRENT_CHALLENGE_KEY } from '../templates/Challenges/redux/current-challenge-saga';
import { createAcceptTermsSaga } from './accept-terms-saga';
import { actionTypes, ns } from './action-types';
import { createAppMountSaga } from './app-mount-saga';
import { createDonationSaga } from './donation-saga';
import failedUpdatesEpic from './failed-updates-epic';
import { createFetchUserSaga } from './fetch-user-saga';
import { createGaSaga } from './ga-saga';

import hardGoToEpic from './hard-go-to-epic';
import { createNightModeSaga } from './night-mode-saga';
import { createReportUserSaga } from './report-user-saga';

import { types as settingsTypes } from './settings';
import { createShowCertSaga } from './show-cert-saga';
import updateCompleteEpic from './update-complete-epic';

export { ns };

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

export const epics = [hardGoToEpic, failedUpdatesEpic, updateCompleteEpic];

export const sagas = [
  ...createAcceptTermsSaga(actionTypes),
  ...createAppMountSaga(actionTypes),
  ...createDonationSaga(actionTypes),
  ...createGaSaga(actionTypes),
  ...createFetchUserSaga(actionTypes),
  ...createShowCertSaga(actionTypes),
  ...createReportUserSaga(actionTypes),
  ...createNightModeSaga({ ...actionTypes, ...settingsTypes })
];

export const appMount = createAction(actionTypes.appMount);

export const tryToShowDonationModal = createAction(
  actionTypes.tryToShowDonationModal
);

export const executeGA = createAction(actionTypes.executeGA);

export const allowBlockDonationRequests = createAction(
  actionTypes.allowBlockDonationRequests
);
export const closeDonationModal = createAction(actionTypes.closeDonationModal);
export const openDonationModal = createAction(actionTypes.openDonationModal);
export const preventBlockDonationRequests = createAction(
  actionTypes.preventBlockDonationRequests
);
export const preventProgressDonationRequests = createAction(
  actionTypes.preventProgressDonationRequests
);
export const updateDonationFormState = createAction(
  actionTypes.updateDonationFormState
);

export const onlineStatusChange = createAction(actionTypes.onlineStatusChange);

// TODO: re-evaluate this since /internal is no longer used.
// `hardGoTo` is used to hit the API server directly
// without going through /internal
// used for things like /signin and /signout
export const hardGoTo = createAction(actionTypes.hardGoTo);

export const submitComplete = createAction(actionTypes.submitComplete);
export const updateComplete = createAction(actionTypes.updateComplete);
export const updateFailed = createAction(actionTypes.updateFailed);

export const acceptTerms = createAction(actionTypes.acceptTerms);
export const acceptTermsComplete = createAction(
  actionTypes.acceptTermsComplete
);
export const acceptTermsError = createAction(actionTypes.acceptTermsError);

export const fetchUser = createAction(actionTypes.fetchUser);
export const fetchUserComplete = createAction(actionTypes.fetchUserComplete);
export const fetchUserError = createAction(actionTypes.fetchUserError);

export const addDonation = createAction(actionTypes.addDonation);
export const addDonationComplete = createAction(
  actionTypes.addDonationComplete
);
export const addDonationError = createAction(actionTypes.addDonationError);

export const createStripeSession = createAction(
  actionTypes.createStripeSession
);

export const postChargeStripe = createAction(actionTypes.postChargeStripe);
export const postChargeStripeComplete = createAction(
  actionTypes.postChargeStripeComplete
);
export const postChargeStripeError = createAction(
  actionTypes.postChargeStripeError
);

export const fetchProfileForUser = createAction(
  actionTypes.fetchProfileForUser
);
export const fetchProfileForUserComplete = createAction(
  actionTypes.fetchProfileForUserComplete
);
export const fetchProfileForUserError = createAction(
  actionTypes.fetchProfileForUserError
);

export const reportUser = createAction(actionTypes.reportUser);
export const reportUserComplete = createAction(actionTypes.reportUserComplete);
export const reportUserError = createAction(actionTypes.reportUserError);

export const resetUserData = createAction(actionTypes.resetUserData);

export const showCert = createAction(actionTypes.showCert);
export const showCertComplete = createAction(actionTypes.showCertComplete);
export const showCertError = createAction(actionTypes.showCertError);

export const updateCurrentChallengeId = createAction(
  actionTypes.updateCurrentChallengeId
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
    isMachineLearningPyCertV7
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
      isMachineLearningPyCertV7,
    hasLegacyCert:
      isFrontEndCert || isBackEndCert || isDataVisCert || isInfosecQaCert,
    isFullStackCert,
    currentCerts: [
      {
        show: isRespWebDesignCert,
        title: 'Responsive Web Design Certification',
        showURL: 'responsive-web-design'
      },
      {
        show: isJsAlgoDataStructCert,
        title: 'JavaScript Algorithms and Data Structures Certification',
        showURL: 'javascript-algorithms-and-data-structures'
      },
      {
        show: isFrontEndLibsCert,
        title: 'Front End Libraries Certification',
        showURL: 'front-end-libraries'
      },
      {
        show: is2018DataVisCert,
        title: 'Data Visualization Certification',
        showURL: 'data-visualization'
      },
      {
        show: isApisMicroservicesCert,
        title: 'APIs and Microservices Certification',
        showURL: 'apis-and-microservices'
      },
      {
        show: isQaCertV7,
        title: ' Quality Assurance Certification',
        showURL: 'quality-assurance-v7'
      },
      {
        show: isInfosecCertV7,
        title: 'Information Security Certification',
        showURL: 'information-security-v7'
      },
      {
        show: isSciCompPyCertV7,
        title: 'Scientific Computing with Python Certification',
        showURL: 'scientific-computing-with-python-v7'
      },
      {
        show: isDataAnalysisPyCertV7,
        title: 'Data Analysis with Python Certification',
        showURL: 'data-analysis-with-python-v7'
      },
      {
        show: isMachineLearningPyCertV7,
        title: 'Machine Learning with Python Certification',
        showURL: 'machine-learning-with-python-v7'
      }
    ],
    legacyCerts: [
      {
        show: isFrontEndCert,
        title: 'Front End Certification',
        showURL: 'legacy-front-end'
      },
      {
        show: isBackEndCert,
        title: 'Back End Certification',
        showURL: 'legacy-back-end'
      },
      {
        show: isDataVisCert,
        title: 'Data Visualization Certification',
        showURL: 'legacy-data-visualization'
      },
      {
        show: isInfosecQaCert,
        title: 'Information Security and Quality Assurance Certification',
        // Keep the current public profile cert slug
        showURL: 'information-security-and-quality-assurance'
      },
      {
        show: isFullStackCert,
        title: 'Full Stack Certification',
        // Keep the current public profile cert slug
        showURL: 'full-stack'
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
    [actionTypes.acceptTermsComplete]: (state, { payload }) => {
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
    [actionTypes.allowBlockDonationRequests]: (state, { payload }) => {
      return {
        ...state,
        recentlyClaimedBlock: payload
      };
    },
    [actionTypes.updateDonationFormState]: (state, { payload }) => ({
      ...state,
      donationFormState: { ...state.donationFormState, ...payload }
    }),
    [actionTypes.createStripeSession]: state => ({
      ...state,
      donationFormState: { ...defaultDonationFormState, redirecting: true }
    }),
    [actionTypes.addDonation]: state => ({
      ...state,
      donationFormState: { ...defaultDonationFormState, processing: true }
    }),
    [actionTypes.addDonationComplete]: state => {
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
    [actionTypes.addDonationError]: (state, { payload }) => ({
      ...state,
      donationFormState: { ...defaultDonationFormState, error: payload }
    }),
    [actionTypes.postChargeStripe]: state => ({
      ...state,
      donationFormState: { ...defaultDonationFormState, processing: true }
    }),
    [actionTypes.postChargeStripeComplete]: state => {
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
    [actionTypes.postChargeStripeError]: (state, { payload }) => ({
      ...state,
      donationFormState: { ...defaultDonationFormState, error: payload }
    }),
    [actionTypes.fetchUser]: state => ({
      ...state,
      userFetchState: { ...defaultFetchState }
    }),
    [actionTypes.fetchProfileForUser]: state => ({
      ...state,
      userProfileFetchState: { ...defaultFetchState }
    }),
    [actionTypes.fetchUserComplete]: (
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
    [actionTypes.fetchUserError]: (state, { payload }) => ({
      ...state,
      userFetchState: {
        pending: false,
        complete: false,
        errored: true,
        error: payload
      }
    }),
    [actionTypes.fetchProfileForUserComplete]: (
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
    [actionTypes.fetchProfileForUserError]: (state, { payload }) => ({
      ...state,
      userProfileFetchState: {
        pending: false,
        complete: false,
        errored: true,
        error: payload
      }
    }),
    [actionTypes.onlineStatusChange]: (state, { payload: isOnline }) => ({
      ...state,
      isOnline
    }),
    [actionTypes.closeDonationModal]: state => ({
      ...state,
      showDonationModal: false
    }),
    [actionTypes.openDonationModal]: state => ({
      ...state,
      showDonationModal: true
    }),
    [actionTypes.preventBlockDonationRequests]: state => ({
      ...state,
      recentlyClaimedBlock: null
    }),
    [actionTypes.preventProgressDonationRequests]: state => ({
      ...state,
      canRequestProgressDonation: false
    }),
    [actionTypes.resetUserData]: state => ({
      ...state,
      appUsername: '',
      user: {}
    }),
    [actionTypes.showCert]: state => ({
      ...state,
      showCert: {},
      showCertFetchState: { ...defaultFetchState }
    }),
    [actionTypes.showCertComplete]: (state, { payload }) => ({
      ...state,
      showCert: payload,
      showCertFetchState: {
        ...defaultFetchState,
        pending: false,
        complete: true
      }
    }),
    [actionTypes.showCertError]: (state, { payload }) => ({
      ...state,
      showCert: {},
      showCertFetchState: {
        pending: false,
        complete: false,
        errored: true,
        error: payload
      }
    }),
    [actionTypes.submitComplete]: (state, { payload }) => {
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
