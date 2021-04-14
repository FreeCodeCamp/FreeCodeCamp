import { isEmpty } from 'lodash';
import { createAction, handleActions } from 'redux-actions';
import { getLines } from '../../../../../utils/get-lines';
import { createPoly } from '../../../../../utils/polyvinyl';
import { challengeTypes } from '../../../../utils/challengeTypes';
import { completedChallengesSelector } from '../../../redux';
import { getTargetEditor } from '../utils/getTargetEditor';
import { actionTypes, ns } from './action-types';
import codeLockEpic from './code-lock-epic';
import codeStorageEpic from './code-storage-epic';
import completionEpic from './completion-epic';
import createQuestionEpic from './create-question-epic';
import { createCurrentChallengeSaga } from './current-challenge-saga';
import { createExecuteChallengeSaga } from './execute-challenge-saga';

export { ns };

const initialState = {
  canFocusEditor: true,
  visibleEditors: {},
  challengeFiles: {},
  challengeMeta: {
    superBlock: '',
    block: '',
    id: '',
    nextChallengePath: '/',
    prevChallengePath: '/',
    challengeType: -1
  },
  challengeTests: [],
  consoleOut: [],
  hasCompletedBlock: false,
  inAccessibilityMode: false,
  isCodeLocked: false,
  isBuildEnabled: true,
  logsOut: [],
  modal: {
    completion: false,
    help: false,
    video: false,
    reset: false
  },
  projectFormValues: {},
  successMessage: 'Happy Coding!'
};

export const epics = [
  codeLockEpic,
  completionEpic,
  createQuestionEpic,
  codeStorageEpic
];

export const sagas = [
  ...createExecuteChallengeSaga(actionTypes),
  ...createCurrentChallengeSaga(actionTypes)
];

// TODO: can createPoly handle editable region, rather than separating it?
export const createFiles = createAction(
  actionTypes.createFiles,
  challengeFiles =>
    Object.keys(challengeFiles)
      .filter(key => challengeFiles[key])
      .map(key => challengeFiles[key])
      .reduce(
        (challengeFiles, file) => ({
          ...challengeFiles,
          [file.key]: {
            ...createPoly(file),
            seed: file.contents.slice(),
            editableContents: getLines(
              file.contents,
              file.editableRegionBoundaries
            ),
            seedEditableRegionBoundaries: file.editableRegionBoundaries.slice()
          }
        }),
        {}
      )
);

export const createQuestion = createAction(actionTypes.createQuestion);
export const initTests = createAction(actionTypes.initTests);
export const updateTests = createAction(actionTypes.updateTests);
export const cancelTests = createAction(actionTypes.cancelTests);

export const initConsole = createAction(actionTypes.initConsole);
export const initLogs = createAction(actionTypes.initLogs);
export const updateChallengeMeta = createAction(
  actionTypes.updateChallengeMeta
);
export const updateFile = createAction(actionTypes.updateFile);
export const updateConsole = createAction(actionTypes.updateConsole);
export const updateLogs = createAction(actionTypes.updateLogs);
export const updateJSEnabled = createAction(actionTypes.updateJSEnabled);
export const updateSolutionFormValues = createAction(
  actionTypes.updateSolutionFormValues
);
export const updateSuccessMessage = createAction(
  actionTypes.updateSuccessMessage
);

export const logsToConsole = createAction(actionTypes.logsToConsole);

export const lockCode = createAction(actionTypes.lockCode);
export const unlockCode = createAction(actionTypes.unlockCode);
export const disableBuildOnError = createAction(
  actionTypes.disableBuildOnError
);
export const storedCodeFound = createAction(actionTypes.storedCodeFound);
export const noStoredCodeFound = createAction(actionTypes.noStoredCodeFound);
export const saveEditorContent = createAction(actionTypes.saveEditorContent);

export const closeModal = createAction(actionTypes.closeModal);
export const openModal = createAction(actionTypes.openModal);

export const previewMounted = createAction(actionTypes.previewMounted);
export const challengeMounted = createAction(actionTypes.challengeMounted);
export const checkChallenge = createAction(actionTypes.checkChallenge);
export const executeChallenge = createAction(actionTypes.executeChallenge);
export const resetChallenge = createAction(actionTypes.resetChallenge);
export const submitChallenge = createAction(actionTypes.submitChallenge);

export const moveToTab = createAction(actionTypes.moveToTab);

export const setEditorFocusability = createAction(
  actionTypes.setEditorFocusability
);
export const toggleVisibleEditor = createAction(
  actionTypes.toggleVisibleEditor
);
export const setAccessibilityMode = createAction(
  actionTypes.setAccessibilityMode
);

export const currentTabSelector = state => state[ns].currentTab;
export const challengeFilesSelector = state => state[ns].challengeFiles;
export const challengeMetaSelector = state => state[ns].challengeMeta;
export const challengeTestsSelector = state => state[ns].challengeTests;
export const consoleOutputSelector = state => state[ns].consoleOut;
export const completedChallengesIds = state =>
  completedChallengesSelector(state).map(node => node.id);
export const isChallengeCompletedSelector = state => {
  const completedChallenges = completedChallengesSelector(state);
  const { id: currentChallengeId } = challengeMetaSelector(state);
  return completedChallenges.some(({ id }) => id === currentChallengeId);
};
export const isCodeLockedSelector = state => state[ns].isCodeLocked;
export const isCompletionModalOpenSelector = state =>
  state[ns].modal.completion;
export const isHelpModalOpenSelector = state => state[ns].modal.help;
export const isVideoModalOpenSelector = state => state[ns].modal.video;
export const isResetModalOpenSelector = state => state[ns].modal.reset;

export const isBuildEnabledSelector = state => state[ns].isBuildEnabled;
export const successMessageSelector = state => state[ns].successMessage;

export const projectFormValuesSelector = state =>
  state[ns].projectFormValues || {};

export const challengeDataSelector = state => {
  const { challengeType } = challengeMetaSelector(state);
  let challengeData = { challengeType };
  if (
    challengeType === challengeTypes.js ||
    challengeType === challengeTypes.bonfire
  ) {
    challengeData = {
      ...challengeData,
      files: challengeFilesSelector(state)
    };
  } else if (challengeType === challengeTypes.backend) {
    const { solution: url = {} } = projectFormValuesSelector(state);
    challengeData = {
      ...challengeData,
      url
    };
  } else if (
    challengeType === challengeTypes.backEndProject ||
    challengeType === challengeTypes.pythonProject
  ) {
    const values = projectFormValuesSelector(state);
    const { solution: url } = values;
    challengeData = {
      ...challengeData,
      ...values,
      url
    };
  } else if (challengeType === challengeTypes.frontEndProject) {
    challengeData = {
      ...challengeData,
      ...projectFormValuesSelector(state)
    };
  } else if (
    challengeType === challengeTypes.html ||
    challengeType === challengeTypes.modern
  ) {
    const { required = [], template = '' } = challengeMetaSelector(state);
    challengeData = {
      ...challengeData,
      files: challengeFilesSelector(state),
      required,
      template
    };
  }
  return challengeData;
};

export const canFocusEditorSelector = state => state[ns].canFocusEditor;
export const visibleEditorsSelector = state => state[ns].visibleEditors;

export const inAccessibilityModeSelector = state =>
  state[ns].inAccessibilityMode;

export const reducer = handleActions(
  {
    [actionTypes.createFiles]: (state, { payload }) => ({
      ...state,
      challengeFiles: payload,
      visibleEditors: { [getTargetEditor(payload)]: true }
    }),
    [actionTypes.updateFile]: (
      state,
      { payload: { key, editorValue, editableRegionBoundaries } }
    ) => ({
      ...state,
      challengeFiles: {
        ...state.challengeFiles,
        [key]: {
          ...state.challengeFiles[key],
          contents: editorValue,
          editableContents: getLines(editorValue, editableRegionBoundaries),
          editableRegionBoundaries
        }
      }
    }),
    [actionTypes.storedCodeFound]: (state, { payload }) => ({
      ...state,
      challengeFiles: payload
    }),
    [actionTypes.initTests]: (state, { payload }) => ({
      ...state,
      challengeTests: payload
    }),
    [actionTypes.updateTests]: (state, { payload }) => ({
      ...state,
      challengeTests: payload
    }),

    [actionTypes.initConsole]: (state, { payload }) => ({
      ...state,
      consoleOut: payload ? [payload] : []
    }),
    [actionTypes.updateConsole]: (state, { payload }) => ({
      ...state,
      consoleOut: state.consoleOut.concat(payload)
    }),
    [actionTypes.initLogs]: state => ({
      ...state,
      logsOut: []
    }),
    [actionTypes.updateLogs]: (state, { payload }) => ({
      ...state,
      logsOut: state.logsOut.concat(payload)
    }),
    [actionTypes.logsToConsole]: (state, { payload }) => ({
      ...state,
      consoleOut: isEmpty(state.logsOut)
        ? state.consoleOut
        : state.consoleOut.concat(payload, state.logsOut)
    }),
    [actionTypes.updateChallengeMeta]: (state, { payload }) => ({
      ...state,
      challengeMeta: { ...payload }
    }),

    [actionTypes.resetChallenge]: state => ({
      ...state,
      currentTab: 2,
      challengeFiles: {
        ...Object.keys(state.challengeFiles)
          .map(key => state.challengeFiles[key])
          .reduce(
            (files, file) => ({
              ...files,
              [file.key]: {
                ...file,
                contents: file.seed.slice(),
                editableContents: getLines(
                  file.seed,
                  file.seedEditableRegionBoundaries
                ),
                editableRegionBoundaries: file.seedEditableRegionBoundaries
              }
            }),
            {}
          )
      },
      challengeTests: state.challengeTests.map(({ text, testString }) => ({
        text,
        testString
      })),
      consoleOut: []
    }),
    [actionTypes.updateSolutionFormValues]: (state, { payload }) => ({
      ...state,
      projectFormValues: payload
    }),

    [actionTypes.lockCode]: state => ({
      ...state,
      isCodeLocked: true
    }),
    [actionTypes.unlockCode]: state => ({
      ...state,
      isBuildEnabled: true,
      isCodeLocked: false
    }),
    [actionTypes.disableBuildOnError]: state => ({
      ...state,
      isBuildEnabled: false
    }),

    [actionTypes.updateSuccessMessage]: (state, { payload }) => ({
      ...state,
      successMessage: payload
    }),
    [actionTypes.closeModal]: (state, { payload }) => ({
      ...state,
      modal: {
        ...state.modal,
        [payload]: false
      }
    }),
    [actionTypes.openModal]: (state, { payload }) => ({
      ...state,
      modal: {
        ...state.modal,
        [payload]: true
      }
    }),
    [actionTypes.moveToTab]: (state, { payload }) => ({
      ...state,
      currentTab: payload
    }),
    [actionTypes.executeChallenge]: state => ({
      ...state,
      currentTab: 3
    }),
    [actionTypes.setEditorFocusability]: (state, { payload }) => ({
      ...state,
      canFocusEditor: payload
    }),
    [actionTypes.toggleVisibleEditor]: (state, { payload }) => {
      return {
        ...state,
        visibleEditors: {
          ...state.visibleEditors,
          [payload]: !state.visibleEditors[payload]
        }
      };
    },
    [actionTypes.setAccessibilityMode]: (state, { payload }) => ({
      ...state,
      inAccessibilityMode: payload
    })
  },
  initialState
);
