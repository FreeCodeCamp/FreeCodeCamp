import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { filter, switchMap, map, tap, ignoreElements } from 'rxjs/operators';
import store from 'store';

import { setContent, isPoly } from '../../../../../utils/polyvinyl';
import { createFlashMessage } from '../../../components/Flash/redux';
import { actionTypes as appTypes } from '../../../redux/action-types';

import { actionTypes } from './action-types';
import {
  storedCodeFound,
  noStoredCodeFound,
  isCodeLockedSelector,
  challengeFilesSelector,
  challengeMetaSelector
} from './';

const legacyPrefixes = [
  'Bonfire: ',
  'Waypoint: ',
  'Zipline: ',
  'Basejump: ',
  'Checkpoint: '
];
const legacyPostfix = 'Val';

function getCode(id) {
  const code = store.get(id);
  return code ? code : null;
}

function getLegacyCode(legacy) {
  const key = legacy + legacyPostfix;
  let code = null;
  const maybeCode = store.get(key);
  if (maybeCode) {
    code = '' + maybeCode;
    store.remove(key);
    return code;
  }
  return legacyPrefixes.reduce((code, prefix) => {
    if (code) {
      return code;
    }
    return store.get(prefix + key);
  }, null);
}

function legacyToFile(code, files, key) {
  if (isFilesAllPoly(files)) {
    return { [key]: setContent(code, files[key]) };
  }
  return false;
}

function isFilesAllPoly(files) {
  return Object.keys(files)
    .map(key => files[key])
    .every(file => isPoly(file));
}

function clearCodeEpic(action$, state$) {
  return action$.pipe(
    ofType(appTypes.submitComplete, actionTypes.resetChallenge),
    tap(() => {
      const { id } = challengeMetaSelector(state$.value);
      store.remove(id);
    }),
    ignoreElements()
  );
}

function saveCodeEpic(action$, state$) {
  return action$.pipe(
    ofType(actionTypes.executeChallenge, actionTypes.saveEditorContent),
    // do not save challenge if code is locked
    filter(() => !isCodeLockedSelector(state$.value)),
    map(action => {
      const state = state$.value;
      const { id } = challengeMetaSelector(state);
      const files = challengeFilesSelector(state);
      try {
        store.set(id, files);
        // Possible fileType values: indexhtml indexjs indexjsx
        // The files Object always has one of these as the first/only attribute
        const fileType = Object.keys(files)[0];
        if (store.get(id)[fileType].contents !== files[fileType].contents) {
          throw Error('Failed to save to localStorage');
        }
        return action;
      } catch (e) {
        return { ...action, error: true };
      }
    }),
    ofType(actionTypes.saveEditorContent),
    switchMap(({ error }) =>
      of(
        createFlashMessage({
          type: error ? 'warning' : 'success',
          message: error
            ? // eslint-disable-next-line max-len
              "Oops, your code did not save, your browser's local storage may be full."
            : "Saved! Your code was saved to your browser's local storage."
        })
      )
    )
  );
}

function loadCodeEpic(action$, state$) {
  return action$.pipe(
    ofType(actionTypes.challengeMounted),
    filter(() => {
      const files = challengeFilesSelector(state$.value);
      return Object.keys(files).length > 0;
    }),
    switchMap(({ payload: id }) => {
      let finalFiles;
      const state = state$.value;
      const challenge = challengeMetaSelector(state);
      const files = challengeFilesSelector(state);
      const fileKeys = Object.keys(files);
      const invalidForLegacy = fileKeys.length > 1;
      const { title: legacyKey } = challenge;

      const codeFound = getCode(id);
      if (codeFound && isFilesAllPoly(codeFound)) {
        finalFiles = {
          ...fileKeys
            .map(key => files[key])
            .reduce(
              (files, file) => ({
                ...files,
                [file.key]: {
                  ...file,
                  contents: codeFound[file.key]
                    ? codeFound[file.key].contents
                    : file.contents,
                  editableContents: codeFound[file.key]
                    ? codeFound[file.key].editableContents
                    : file.editableContents,
                  editableRegionBoundaries: codeFound[file.key]
                    ? codeFound[file.key].editableRegionBoundaries
                    : file.editableRegionBoundaries
                }
              }),
              {}
            )
        };
      } else {
        const legacyCode = getLegacyCode(legacyKey);
        if (legacyCode && !invalidForLegacy) {
          finalFiles = legacyToFile(legacyCode, files, fileKeys[0]);
        }
      }
      if (finalFiles) {
        return of(storedCodeFound(finalFiles));
      }
      return of(noStoredCodeFound());
    })
  );
}

export default combineEpics(saveCodeEpic, loadCodeEpic, clearCodeEpic);
