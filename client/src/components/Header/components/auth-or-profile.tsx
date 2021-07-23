/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import React from 'react';
import { Link, AvatarRenderer } from '../../helpers';
import { useTranslation } from 'react-i18next';
import Login from './Login';

export interface AuthOrProfileProps {
  user?: Record<string, unknown>;
}
const AuthOrProfile = ({ user }: AuthOrProfileProps): JSX.Element => {
  const { t } = useTranslation();
  const isUserDonating = user && user.isDonating;
  const isUserSignedIn = user && user.username;
  const isTopContributor =
    user && user.yearsTopContributor && user.yearsTopContributor.length > 0;

  if (!isUserSignedIn) {
    return (
      <Login data-test-label='landing-small-cta'>{t('buttons.sign-in')}</Login>
    );
  } else {
    return (
      <Link className='avatar-nav-link' to={`/${user.username as string}`}>
        <AvatarRenderer
          isDonating={isUserDonating}
          isTopContributor={isTopContributor}
          picture={user.picture}
          userName={user.username}
        />
      </Link>
    );
  }
};

AuthOrProfile.displayName = 'AuthOrProfile';
export default AuthOrProfile;
