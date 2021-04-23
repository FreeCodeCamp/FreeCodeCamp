import { combineEpics } from 'redux-observable';

import { epics as challengeEpics } from '../templates/Challenges/redux';
import { epics as appEpics } from './';

const rootEpic = combineEpics(...appEpics, ...challengeEpics);

export default rootEpic;
