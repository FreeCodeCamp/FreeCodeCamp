import { createTypes } from '../../../../utils/stateManagement';

export const ns = 'challenge';

export const actionTypes = createTypes(
  [
    'createFiles',
    'createQuestion',
    'initTests',
    'initConsole',
    'initLogs',
    'updateConsole',
    'updateChallengeMeta',
    'updateFile',
    'updateJSEnabled',
    'updateSolutionFormValues',
    'updateSuccessMessage',
    'updateTests',
    'updateLogs',
    'cancelTests',

    'logsToConsole',

    'lockCode',
    'unlockCode',
    'disableBuildOnError',
    'storedCodeFound',
    'noStoredCodeFound',
    'saveEditorContent',

    'closeModal',
    'openModal',

    'previewMounted',
    'challengeMounted',
    'checkChallenge',
    'executeChallenge',
    'resetChallenge',
    'submitChallenge',

    'moveToTab',

    'setEditorFocusability',
    'toggleVisibleEditor',
    'setAccessibilityMode'
  ],
  ns
);
