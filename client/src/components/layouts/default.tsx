import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { createSelector } from 'reselect';
import Helmet from 'react-helmet';
import fontawesome from '@fortawesome/fontawesome';
import { withTranslation, TFunction } from 'react-i18next';

import {
  fetchUser,
  isSignedInSelector,
  onlineStatusChange,
  isOnlineSelector,
  userFetchStateSelector,
  userSelector,
  usernameSelector,
  executeGA
} from '../../redux';
import {
  flashMessageSelector,
  removeFlashMessage,
  FlashMessage
} from '../Flash/redux';

import { isBrowser } from '../../../utils';

import OfflineWarning from '../OfflineWarning';
import Flash from '../Flash';
import Header from '../Header';
import Footer from '../Footer';
// preload common fonts
// @ts-expect-error ignore font import
import latoLightURL from '../../../static/fonts/lato/Lato-Light.woff';
// @ts-expect-error ignore font import
import latoRegularURL from '../../../static/fonts/lato/Lato-Regular.woff';
// @ts-expect-error ignore font import
import latoBoldURL from '../../../static/fonts/lato/Lato-Bold.woff';
// @ts-expect-error ignore font import
import robotoRegularURL from '../../../static/fonts/roboto-mono/RobotoMono-Regular.woff';
// @ts-expect-error ignore font import
import robotoBoldURL from '../../../static/fonts/roboto-mono/RobotoMono-Bold.woff';
// @ts-expect-error ignore font import
import robotoItalicURL from '../../../static/fonts/roboto-mono/RobotoMono-Italic.woff';

import './fonts.css';
import './global.css';
import './variables.css';

// @ts-expect-error ignore fontawsome
fontawesome.config = {
  autoAddCss: false
};

type FetchState = {
  pending: boolean;
};

type ExecuteGAParams = {
  type: string;
  data: string;
};

type User = Record<string, unknown>;

type DefaultLayoutProps = {
  hasMessage?: boolean;
  showFooter?: boolean;
  theme?: string;
  useTheme?: boolean;
  isOnline: boolean;
  isSignedIn: boolean;
  pathname: string;
  user: User;
  flashMessage: FlashMessage;
  fetchState: FetchState;
  executeGA: (executeGAParams: ExecuteGAParams) => void;
  fetchUser: () => void;
  onlineStatusChange: (status: boolean) => void;
  t: TFunction<'translation'>;
  removeFlashMessage: () => void;
  children: React.ReactNode;
};

const mapStateToProps = createSelector(
  isSignedInSelector,
  flashMessageSelector,
  isOnlineSelector,
  userFetchStateSelector,
  userSelector,
  usernameSelector,
  (
    isSignedIn: boolean,
    flashMessage: FlashMessage,
    isOnline: boolean,
    fetchState: FetchState,
    user: User
  ) => ({
    isSignedIn,
    flashMessage,
    hasMessage: !!flashMessage.message,
    isOnline,
    fetchState,
    theme: user.theme,
    user
  })
);

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    { fetchUser, removeFlashMessage, onlineStatusChange, executeGA },
    dispatch
  );

class DefaultLayout extends Component<DefaultLayoutProps> {
  static displayName = 'DefaultLayout';

  componentDidMount() {
    const { isSignedIn, fetchUser, pathname, executeGA } = this.props;
    if (!isSignedIn) {
      fetchUser();
    }
    executeGA({ type: 'page', data: pathname });

    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  componentDidUpdate(prevProps: DefaultLayoutProps) {
    const { pathname, executeGA } = this.props;
    const { pathname: prevPathname } = prevProps;
    if (pathname !== prevPathname) {
      executeGA({ type: 'page', data: pathname });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

  updateOnlineStatus = () => {
    const { onlineStatusChange } = this.props;
    const isOnline =
      isBrowser() && 'navigator' in window ? window.navigator.onLine : null;
    return typeof isOnline === 'boolean' ? onlineStatusChange(isOnline) : null;
  };

  render() {
    const {
      children,
      hasMessage,
      fetchState,
      flashMessage,
      isOnline,
      isSignedIn,
      removeFlashMessage,
      showFooter = true,
      t,
      theme = 'default',
      user,
      useTheme = true
    } = this.props;
    return (
      <div className='page-wrapper'>
        <Helmet
          bodyAttributes={{
            class: useTheme
              ? `${theme === 'default' ? 'light-palette' : 'dark-palette'}`
              : 'light-palette'
          }}
          meta={[
            {
              name: 'description',
              content: t('metaTags:description')
            },
            { name: 'keywords', content: t('metaTags:keywords') }
          ]}
        >
          <link
            as='font'
            crossOrigin='anonymous'
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            href={latoRegularURL}
            rel='preload'
            type='font/woff'
          />
          <link
            as='font'
            crossOrigin='anonymous'
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            href={latoLightURL}
            rel='preload'
            type='font/woff'
          />
          <link
            as='font'
            crossOrigin='anonymous'
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            href={latoBoldURL}
            rel='preload'
            type='font/woff'
          />
          <link
            as='font'
            crossOrigin='anonymous'
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            href={robotoRegularURL}
            rel='preload'
            type='font/woff'
          />
          <link
            as='font'
            crossOrigin='anonymous'
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            href={robotoBoldURL}
            rel='preload'
            type='font/woff'
          />
          <link
            as='font'
            crossOrigin='anonymous'
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            href={robotoItalicURL}
            rel='preload'
            type='font/woff'
          />
          <style>{fontawesome.dom.css()}</style>
        </Helmet>
        <div className={`default-layout`}>
          <Header fetchState={fetchState} user={user} />
          <OfflineWarning isOnline={isOnline} isSignedIn={isSignedIn} />
          {hasMessage && flashMessage ? (
            <Flash flashMessage={flashMessage} onClose={removeFlashMessage} />
          ) : null}
          {children}
        </div>
        {showFooter && <Footer />}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(DefaultLayout));
