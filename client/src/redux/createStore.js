/* eslint-disable-next-line  max-len */
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware } from 'redux-observable';
import createSagaMiddleware from 'redux-saga';

import envData from '../../../config/env.json';
import { isBrowser } from '../../utils';
import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const { environment } = envData;

const clientSide = isBrowser();

const sagaMiddleware = createSagaMiddleware({
  context: {
    document: clientSide ? document : {}
  }
});
const epicMiddleware = createEpicMiddleware({
  dependencies: {
    window: clientSide ? window : {},
    location: clientSide ? window.location : {},
    document: clientSide ? document : {}
  }
});

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

export const createStore = () => {
  let store;
  if (environment === 'production') {
    store = reduxCreateStore(
      rootReducer,
      applyMiddleware(sagaMiddleware, epicMiddleware)
    );
  } else {
    store = reduxCreateStore(
      rootReducer,
      composeEnhancers(applyMiddleware(sagaMiddleware, epicMiddleware))
    );
  }
  sagaMiddleware.run(rootSaga);
  epicMiddleware.run(rootEpic);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
