import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import { Row, Col, Button, Grid } from '@freecodecamp/react-bootstrap';

import LinkButton from '../assets/icons/link-button';
import { ButtonSpacer, Link, Spacer } from '../components/helpers';
import { isSignedInSelector } from '../redux';
import { updateUserFlag } from '../redux/settings';
import IntroDescription from '../components/Intro/components/IntroDescription';

import './email-sign-up.css';

interface EmailSignUpProps {
  isSignedIn: boolean;
  t: (s: string) => string;
  updateUserFlag: (options: { sendQuincyEmail: boolean }) => void;
}

const mapStateToProps = createSelector(
  isSignedInSelector,
  (isSignedIn: boolean) => ({
    isSignedIn
  })
);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateUserFlag }, dispatch);

function EmailSignUp({
  isSignedIn,
  t,
  updateUserFlag
}: EmailSignUpProps): JSX.Element {
  const [isNewsLetterInteracted, setIsNewsLetterInteracted] = useState(false);

  function setNewsletterSelection(accept: boolean): void {
    setIsNewsLetterInteracted(true);
    updateUserFlag({
      sendQuincyEmail: accept
    });
  }

  return (
    <>
      <Helmet title={`${t('misc.email-signup')} | freeCodeCamp.org`} />
      <Spacer />
      <Grid>
        <Row>
          <Col md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
            <h1>{t('misc.email-signup')}</h1>
          </Col>
        </Row>
      </Grid>
      <Spacer />
      {/* TODO: update how to handle if user is not logged in */}
      {isSignedIn && !isNewsLetterInteracted && (
        <section className='email-sign-up'>
          {/* TODO: make newsletter subscription a reusable component so it is
          used here and in other places such as user settings */}
          <Grid>
            <Row>
              <>
                <Col md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
                  <strong>{t('misc.quincy')}</strong>
                  <Spacer />
                  <p>{t('misc.email-blast')}</p>
                </Col>
                <Col md={4} mdOffset={2} sm={5} smOffset={1} xs={12}>
                  <Button
                    block={true}
                    bsSize='lg'
                    bsStyle='primary'
                    data-testid='accept_newsletter'
                    onClick={() => setNewsletterSelection(true)}
                  >
                    {t('buttons.yes-please')}
                  </Button>
                  <ButtonSpacer />
                </Col>
                <Col md={4} sm={5} xs={12}>
                  <Button
                    block={true}
                    bsSize='lg'
                    bsStyle='primary'
                    data-testid='decline_newsletter'
                    onClick={() => setNewsletterSelection(false)}
                  >
                    {t('buttons.no-thanks')}
                  </Button>
                </Col>
                <Col xs={12}>
                  <Spacer size={2} />
                </Col>
              </>
            </Row>
          </Grid>
        </section>
      )}
      <section>
        <Grid>
          <Row>
            <Col md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
              <IntroDescription />
            </Col>
            <Col xs={12}>
              <Spacer />
            </Col>
            <Col md={3} mdOffset={2} sm={4} smOffset={1} xs={12}>
              <Link className='btn link-btn btn-lg' to='/learn'>
                {t('buttons.curriculum')}
                <LinkButton />
              </Link>
            </Col>
            <Col xs={12}>
              <Spacer size={2} />
            </Col>
          </Row>
        </Grid>
      </section>
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EmailSignUp));
