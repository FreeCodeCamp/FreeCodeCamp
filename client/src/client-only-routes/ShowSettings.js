import { Grid, Button } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import envData from '../../../config/env.json';
import { createFlashMessage } from '../components/Flash/redux';

import { FullWidthRow, Loader, Spacer } from '../components/helpers';
import About from '../components/settings/About';
import Certification from '../components/settings/Certification';
import DangerZone from '../components/settings/DangerZone';
import Email from '../components/settings/Email';
import Honesty from '../components/settings/Honesty';
import Internet from '../components/settings/Internet';
import Portfolio from '../components/settings/Portfolio';
import Privacy from '../components/settings/Privacy';
import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../redux';
import { User } from '../redux/propTypes';
import { submitNewAbout, updateUserFlag, verifyCert } from '../redux/settings';

const { apiLocation } = envData;

const propTypes = {
  createFlashMessage: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
  showLoading: PropTypes.bool.isRequired,
  submitNewAbout: PropTypes.func.isRequired,
  toggleNightMode: PropTypes.func.isRequired,
  updateInternetSettings: PropTypes.func.isRequired,
  updateIsHonest: PropTypes.func.isRequired,
  updatePortfolio: PropTypes.func.isRequired,
  updateQuincyEmail: PropTypes.func.isRequired,
  user: User,
  verifyCert: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  (showLoading, user, isSignedIn) => ({
    showLoading,
    user,
    isSignedIn
  })
);

const mapDispatchToProps = {
  createFlashMessage,
  navigate,
  submitNewAbout,
  toggleNightMode: theme => updateUserFlag({ theme }),
  updateInternetSettings: updateUserFlag,
  updateIsHonest: updateUserFlag,
  updatePortfolio: updateUserFlag,
  updateQuincyEmail: sendQuincyEmail => updateUserFlag({ sendQuincyEmail }),
  verifyCert
};

export function ShowSettings(props) {
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
    <Fragment>
      <Helmet title={`${t('buttons.settings')} | freeCodeCamp.org`} />
      <Grid>
        <main>
          <Spacer size={2} />
          <FullWidthRow>
            <Button
              block={true}
              bsSize='lg'
              bsStyle='primary'
              className='btn-invert'
              href={`${apiLocation}/signout`}
            >
              {t('buttons.sign-me-out')}
            </Button>
          </FullWidthRow>
          <Spacer />
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
    </Fragment>
  );
}

ShowSettings.displayName = 'ShowSettings';
ShowSettings.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ShowSettings);
