import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { actionTypes } from './action-types';
import { unlockCode } from './';

function codeLockEpic(action$) {
  return action$.pipe(ofType(actionTypes.updateFile), map(unlockCode));
}

export default codeLockEpic;
