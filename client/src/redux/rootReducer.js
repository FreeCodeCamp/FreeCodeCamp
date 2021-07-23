import { combineReducers } from 'redux';

import { reducer as app, MainApp as appNameSpace } from './';
import {
  reducer as flash,
  FlashApp as flashNameSpace
} from '../components/Flash/redux';
import { reducer as settings, ns as settingsNameSpace } from './settings';
import {
  reducer as curriculumMap,
  ns as curriculumMapNameSpace
} from '../templates/Introduction/redux';
import {
  reducer as challenge,
  ns as challengeNameSpace
} from '../templates/Challenges/redux';
import {
  reducer as search,
  ns as searchNameSpace
} from '../components/search/redux';

export default combineReducers({
  [appNameSpace]: app,
  [challengeNameSpace]: challenge,
  [curriculumMapNameSpace]: curriculumMap,
  [flashNameSpace]: flash,
  [searchNameSpace]: search,
  [settingsNameSpace]: settings
});
