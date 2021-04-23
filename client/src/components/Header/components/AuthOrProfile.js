/* eslint-disable react/sort-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, borderColorPicker, AvatarRenderer } from '../../helpers';

import Login from '../components/Login';

const propTypes = {
  user: PropTypes.object
};

export function AuthOrProfile({ user }) {
  const { t } = useTranslation();
  const isUserDonating = user && user.isDonating;
  const isUserSignedIn = user && user.username;
  const isTopContributor =
    user && user.yearsTopContributor && user.yearsTopContributor.length > 0;

  const badgeColorClass = borderColorPicker(isUserDonating, isTopContributor);

  if (!isUserSignedIn) {
    return (
      <Login data-test-label='landing-small-cta'>{t('buttons.sign-in')}</Login>
    );
  } else {
    return (
      <>
        <Link
          className={`avatar-nav-link ${badgeColorClass}`}
          to={`/${user.username}`}
        >
          <AvatarRenderer
            picture={user.picture}
            size='sm'
            userName={user.username}
          />
        </Link>
      </>
    );
  }
}

AuthOrProfile.propTypes = propTypes;
AuthOrProfile.displayName = 'AuthOrProfile';
export default AuthOrProfile;
