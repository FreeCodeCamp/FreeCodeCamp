import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Grid } from '@freecodecamp/react-bootstrap';
import Helmet from 'react-helmet';

import envData from '../../../config/env.json';
import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../redux';
import { submitNewAbout, updateUserFlag, verifyCert } from '../redux/settings';
import { createFlashMessage } from '../components/Flash/redux';
import { useTranslation } from 'react-i18next';

import { Loader, Spacer } from '../components/helpers';
import About from '../components/settings/about';
import Privacy from '../components/settings/privacy';
import Email from '../components/settings/email';
import Internet from '../components/settings/internet';
import Portfolio from '../components/settings/portfolio';
import Honesty from '../components/settings/honesty';
import Certification from '../components/settings/Certification';
import { UserType } from '../redux/prop-types';
import DangerZone from '../components/settings/danger-zone';

const { apiLocation } = envData;

// TODO: update types for actions
interface IShowSettingsProps {
  createFlashMessage: typeof createFlashMessage;
  isSignedIn: boolean;
  navigate: (location: string) => void;
  showLoading: boolean;
  submitNewAbout: () => void;
  toggleNightMode: (theme: string) => void;
  updateInternetSettings: () => void;
  updateIsHonest: () => void;
  updatePortfolio: () => void;
  updateQuincyEmail: (isSendQuincyEmail: boolean) => void;
  user: UserType;
  verifyCert: () => void;
  path?: string;
}

const mapStateToProps = createSelector(
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  (showLoading: boolean, user: UserType, isSignedIn) => ({
    showLoading,
    user,
    isSignedIn
  })
);

const mapDispatchToProps = {
  createFlashMessage,
  navigate,
  submitNewAbout,
  toggleNightMode: (theme: string) => updateUserFlag({ theme }),
  updateInternetSettings: updateUserFlag,
  updateIsHonest: updateUserFlag,
  updatePortfolio: updateUserFlag,
  updateQuincyEmail: (sendQuincyEmail: boolean) =>
    updateUserFlag({ sendQuincyEmail }),
  verifyCert
};

export function ShowSettings(props: IShowSettingsProps): JSX.Element {
  const { t } = useTranslation();
  const {
    createFlashMessage,
    isSignedIn,
    submitNewAbout,
    toggleNightMode,
    user: {
      completedChallenges,
      email,
      is2018DataVisCert,
      isApisMicroservicesCert,
      isJsAlgoDataStructCert,
      isBackEndCert,
      isDataVisCert,
      isFrontEndCert,
      isInfosecQaCert,
      isQaCertV7,
      isInfosecCertV7,
      isFrontEndLibsCert,
      isFullStackCert,
      isRespWebDesignCert,
      isSciCompPyCertV7,
      isDataAnalysisPyCertV7,
      isMachineLearningPyCertV7,
      isEmailVerified,
      isHonest,
      sendQuincyEmail,
      username,
      about,
      picture,
      points,
      theme,
      location,
      name,
      githubProfile,
      linkedin,
      twitter,
      website,
      portfolio
    },
    navigate,
    showLoading,
    updateQuincyEmail,
    updateInternetSettings,
    updatePortfolio,
    updateIsHonest,
    verifyCert
  } = props;

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  if (!isSignedIn) {
    navigate(`${apiLocation}/signin`);
    return <Loader fullScreen={true} />;
  }

  return (
    <>
      <Helmet title={`${t('buttons.settings')} | freeCodeCamp.org`} />
      <Grid>
        <main>
          <Spacer size={2} />
          <h1 className='text-center' style={{ overflowWrap: 'break-word' }}>
            {t('settings.for', { username: username })}
          </h1>
          <About
            about={about}
            currentTheme={theme}
            location={location}
            name={name}
            picture={picture}
            points={points}
            submitNewAbout={submitNewAbout}
            toggleNightMode={toggleNightMode}
            username={username}
          />
          <Spacer />
          <Privacy />
          <Spacer />
          <Email
            email={email}
            isEmailVerified={isEmailVerified}
            sendQuincyEmail={sendQuincyEmail}
            updateQuincyEmail={updateQuincyEmail}
          />
          <Spacer />
          <Internet
            githubProfile={githubProfile}
            linkedin={linkedin}
            twitter={twitter}
            updateInternetSettings={updateInternetSettings}
            website={website}
          />
          <Spacer />
          {/* @ts-expect-error Portfolio types mismatch */}
          <Portfolio portfolio={portfolio} updatePortfolio={updatePortfolio} />
          <Spacer />
          <Honesty isHonest={isHonest} updateIsHonest={updateIsHonest} />
          <Spacer />
          <Certification
            completedChallenges={completedChallenges}
            createFlashMessage={createFlashMessage}
            is2018DataVisCert={is2018DataVisCert}
            isApisMicroservicesCert={isApisMicroservicesCert}
            isBackEndCert={isBackEndCert}
            isDataAnalysisPyCertV7={isDataAnalysisPyCertV7}
            isDataVisCert={isDataVisCert}
            isFrontEndCert={isFrontEndCert}
            isFrontEndLibsCert={isFrontEndLibsCert}
            isFullStackCert={isFullStackCert}
            isHonest={isHonest}
            isInfosecCertV7={isInfosecCertV7}
            isInfosecQaCert={isInfosecQaCert}
            isJsAlgoDataStructCert={isJsAlgoDataStructCert}
            isMachineLearningPyCertV7={isMachineLearningPyCertV7}
            isQaCertV7={isQaCertV7}
            isRespWebDesignCert={isRespWebDesignCert}
            isSciCompPyCertV7={isSciCompPyCertV7}
            username={username}
            verifyCert={verifyCert}
          />
          <Spacer />
          <DangerZone />
        </main>
      </Grid>
    </>
  );
}

ShowSettings.displayName = 'ShowSettings';

export default connect(mapStateToProps, mapDispatchToProps)(ShowSettings);
