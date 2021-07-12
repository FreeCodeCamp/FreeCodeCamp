import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n/config';
import { createStore } from './src/redux/createStore';
import AppMountNotifier from './src/components/app-mount-notifier';
import layoutSelector from './utils/gatsby/layout-selector';

const store = createStore();

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppMountNotifier render={() => element} />
      </I18nextProvider>
    </Provider>
  );
};

wrapRootElement.propTypes = {
  element: PropTypes.any
};

export const wrapPageElement = layoutSelector;

export const disableCorePrefetching = () => true;
