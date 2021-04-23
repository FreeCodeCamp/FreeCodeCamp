import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { createSelector } from 'reselect';

import { isSignedInSelector, userFetchStateSelector } from '../../../redux';
import Login from './Login';

const mapStateToProps = createSelector(
  userFetchStateSelector,
  isSignedInSelector,
  (fetchState, isSignedIn) => ({
    isSignedIn,
    showLoading: fetchState.pending
  })
);

const propTypes = {
  disableSettings: PropTypes.bool,
  email: PropTypes.string,
  isSignedIn: PropTypes.bool,
  name: PropTypes.string,
  showLoading: PropTypes.bool
};

function UserState(props) {
  const { isSignedIn, showLoading, disableSettings } = props;
  const { t } = useTranslation();

  if (disableSettings) {
    return <Login />;
  }
  if (showLoading) {
    return (
      <Spinner
        className='user-state-spinner'
        color='white'
        fadeIn='none'
        height='38px'
        name='line-scale'
      />
    );
  }
  return isSignedIn ? (
    <Link className='top-right-nav-link' to='/settings'>
      {t('buttons.settings')}
    </Link>
  ) : (
    <Login />
  );
}

UserState.displayName = 'UserState';
UserState.propTypes = propTypes;

export default connect(mapStateToProps)(UserState);
