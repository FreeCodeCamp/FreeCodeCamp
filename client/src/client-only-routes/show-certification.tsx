import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Grid, Row, Col, Image, Button } from '@freecodecamp/react-bootstrap';

import ShowProjectLinks from './show-project-links';
import FreeCodeCampLogo from '../assets/icons/FreeCodeCamp-logo';
import DonateForm from '../components/Donation/DonateForm';
import { Trans, useTranslation } from 'react-i18next';

import {
  showCertSelector,
  showCertFetchStateSelector,
  showCert,
  userFetchStateSelector,
  usernameSelector,
  isDonatingSelector,
  executeGA,
  userByNameSelector,
  fetchProfileForUser
} from '../redux';
import { certMap } from '../resources/cert-and-project-map';
import { createFlashMessage } from '../components/Flash/redux';
import standardErrorMessage from '../utils/standard-error-message';
import reallyWeirdErrorMessage from '../utils/really-weird-error-message';
import { langCodes } from '../../../config/i18n/all-langs';
import envData from '../../../config/env.json';

import RedirectHome from '../components/redirect-home';
import { Loader, Spacer } from '../components/helpers';
import { isEmpty } from 'lodash-es';
import { UserType } from '../redux/prop-types';

const { clientLocale } = envData as { clientLocale: keyof typeof langCodes };

const localeCode = langCodes[clientLocale];
type CertType = {
  username: string;
  name: string;
  certName: string;
  certTitle: string;
  completionTime: number;
  date: number;
};
interface IShowCertificationProps {
  cert: CertType;
  certDashedName: string;
  certSlug: string;
  createFlashMessage: typeof createFlashMessage;
  executeGA: (payload: Record<string, unknown>) => void;
  fetchProfileForUser: (username: string) => void;
  fetchState: {
    pending: boolean;
    complete: boolean;
    errored: boolean;
  };
  isDonating: boolean;
  isValidCert: boolean;
  location: {
    pathname: string;
  };
  showCert: ({
    username,
    certSlug
  }: {
    username: string;
    certSlug: string;
  }) => void;
  signedInUserName: string;
  user: UserType;
  userFetchState: {
    complete: boolean;
  };
  userFullName: string;
  username: string;
}

const requestedUserSelector = (state: unknown, { username = '' }) =>
  userByNameSelector(username.toLowerCase())(state) as UserType;

const validCertSlugs = certMap.map(cert => cert.certSlug);

const mapStateToProps = (state: unknown, props: IShowCertificationProps) => {
  const isValidCert = validCertSlugs.some(slug => slug === props.certSlug);
  return createSelector(
    showCertSelector,
    showCertFetchStateSelector,
    usernameSelector,
    userFetchStateSelector,
    isDonatingSelector,
    requestedUserSelector,
    (
      cert: CertType,
      fetchState: IShowCertificationProps['fetchState'],
      signedInUserName: string,
      userFetchState: IShowCertificationProps['userFetchState'],
      isDonating: boolean,
      user
    ) => ({
      cert,
      fetchState,
      isValidCert,
      signedInUserName,
      userFetchState,
      isDonating,
      user
    })
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { createFlashMessage, showCert, fetchProfileForUser, executeGA },
    dispatch
  );

const ShowCertification = (props: IShowCertificationProps): JSX.Element => {
  const { t } = useTranslation();
  const [isDonationSubmitted, setIsDonationSubmitted] = useState(false);
  const [isDonationDisplayed, setIsDonationDisplayed] = useState(false);
  const [isDonationClosed, setIsDonationClosed] = useState(false);

  useEffect(() => {
    const { username, certSlug, isValidCert, showCert } = props;
    if (isValidCert) {
      showCert({ username, certSlug });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {
      userFetchState: { complete: userComplete },
      signedInUserName,
      isDonating,
      cert: { username = '' },
      fetchProfileForUser,
      user,
      executeGA
    } = props;

    if (!signedInUserName || signedInUserName !== username) {
      if (isEmpty(user) && username) {
        fetchProfileForUser(username);
      }
    }

    if (
      !isDonationDisplayed &&
      userComplete &&
      signedInUserName &&
      signedInUserName === username &&
      !isDonating
    ) {
      setIsDonationDisplayed(true);
      executeGA({
        type: 'event',
        data: {
          category: 'Donation View',
          action: 'Displayed Certificate Donation',
          nonInteraction: true
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isDonationDisplayed,
    props.userFetchState,
    props.signedInUserName,
    props.isDonating,
    props.cert,
    props.executeGA
  ]);

  const hideDonationSection = () => {
    setIsDonationDisplayed(false);
    setIsDonationClosed(true);
  };

  const handleProcessing = (
    duration: string,
    amount: number,
    action: string
  ) => {
    props.executeGA({
      type: 'event',
      data: {
        category: 'Donation',
        action: `certificate ${action}`,
        label: duration,
        value: amount
      }
    });
    setIsDonationSubmitted(true);
  };

  const {
    cert,
    fetchState,
    isValidCert,
    createFlashMessage,
    signedInUserName,
    location: { pathname }
  } = props;

  if (!isValidCert) {
    createFlashMessage(standardErrorMessage);
    return <RedirectHome />;
  }

  const { pending, complete, errored } = fetchState;

  if (pending) {
    return <Loader fullScreen={true} />;
  }

  if (!pending && errored) {
    createFlashMessage(standardErrorMessage);
    return <RedirectHome />;
  }

  if (!pending && !complete && !errored) {
    createFlashMessage(reallyWeirdErrorMessage);
    return <RedirectHome />;
  }

  const {
    date,
    name: userFullName = null,
    username,
    certTitle,
    completionTime
  } = cert;

  const { user } = props;

  const displayName = userFullName ?? username;

  const certDate = new Date(date);
  const certYear = certDate.getFullYear();
  const certMonth = certDate.getMonth();
  const certURL = `https://freecodecamp.org${pathname}`;

  const donationCloseBtn = (
    <div>
      <Button
        block={true}
        bsSize='sm'
        bsStyle='primary'
        onClick={hideDonationSection}
      >
        {t('buttons.close')}
      </Button>
    </div>
  );

  const donationSection = (
    <div className='donation-section'>
      {!isDonationSubmitted && (
        <Row>
          <Col lg={8} lgOffset={2} sm={10} smOffset={1} xs={12}>
            <p>{t('donate.only-you')}</p>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={8} mdOffset={2} xs={12}>
          <DonateForm
            defaultTheme='default'
            handleProcessing={handleProcessing}
            isMinimalForm={true}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4} smOffset={4} xs={6} xsOffset={3}>
          {isDonationSubmitted && donationCloseBtn}
        </Col>
      </Row>
      <Spacer size={2} />
    </div>
  );

  const shareCertBtns = (
    <Row className='text-center'>
      <Col xs={12}>
        <Button
          block={true}
          bsSize='lg'
          bsStyle='primary'
          href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certTitle}&organizationId=4831032&issueYear=${certYear}&issueMonth=${
            certMonth + 1
          }&certUrl=${certURL}`}
          target='_blank'
        >
          {t('profile.add-linkedin')}
        </Button>
        <Spacer />
        <Button
          block={true}
          bsSize='lg'
          bsStyle='primary'
          href={`https://twitter.com/intent/tweet?text=${t('profile.tweet', {
            certTitle: certTitle,
            certURL: certURL
          })}`}
          target='_blank'
        >
          {t('profile.add-twitter')}
        </Button>
      </Col>
      <Spacer size={2} />
    </Row>
  );

  return (
    <Grid className='certificate-outer-wrapper'>
      <Spacer size={2} />
      {isDonationDisplayed && !isDonationClosed ? donationSection : ''}
      <Row className='certificate-wrapper certification-namespace'>
        <header>
          <Col md={5} sm={12}>
            <div className='logo'>
              <FreeCodeCampLogo />
            </div>
          </Col>
          <Col md={7} sm={12}>
            <div className='issue-date' data-cy='issue-date'>
              {t('certification.issued')}&nbsp;
              <strong>
                {certDate.toLocaleString([localeCode, 'en-US'], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </strong>
            </div>
          </Col>
        </header>

        <main className='information'>
          <div className='information-container'>
            <Trans i18nKey='certification.fulltext' title={certTitle}>
              <h3>placeholder</h3>
              <h1>
                <strong>{{ user: displayName }}</strong>
              </h1>
              <h3>placeholder</h3>
              <h1>
                <strong>{{ title: certTitle }}</strong>
              </h1>
              <h4>{{ time: completionTime }}</h4>
            </Trans>
          </div>
        </main>
        <footer>
          <div className='row signatures'>
            <Image
              alt="Quincy Larson's Signature"
              src={
                'https://cdn.freecodecamp.org' +
                '/platform/english/images/quincy-larson-signature.svg'
              }
            />
            <p>
              <strong>Quincy Larson</strong>
            </p>
            <p>{t('certification.executive')}</p>
          </div>
          <Row>
            <p className='verify'>
              {t('certification.verify', { certURL: certURL })}
            </p>
          </Row>
        </footer>
      </Row>
      <Spacer size={2} />
      {signedInUserName === username ? shareCertBtns : ''}
      <Spacer size={2} />
      <ShowProjectLinks certName={certTitle} name={displayName} user={user} />
      <Spacer size={2} />
    </Grid>
  );
};

ShowCertification.displayName = 'ShowCertification';

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
)(ShowCertification as any);
