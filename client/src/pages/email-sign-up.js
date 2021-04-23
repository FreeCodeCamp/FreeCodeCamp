import { Row, Col, Button, Grid } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createSelector } from 'reselect';
import IntroDescription from '../components/Intro/components/IntroDescription';
import createRedirect from '../components/createRedirect';
import { ButtonSpacer, Spacer } from '../components/helpers';
import SectionHeader from '../components/settings/SectionHeader';

import { acceptTerms, userSelector } from '../redux';

import './email-sign-up.css';

const propTypes = {
  acceptTerms: PropTypes.func.isRequired,
  acceptedPrivacyTerms: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  t: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  userSelector,
  ({ acceptedPrivacyTerms }) => ({
    acceptedPrivacyTerms
  })
);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ acceptTerms }, dispatch);
const RedirectToLearn = createRedirect('/learn');

class AcceptPrivacyTerms extends Component {
  componentWillUnmount() {
    // if a user navigates away from here we should set acceptedPrivacyTerms
    // to true (so they do not get pulled back) without changing their email
    // preferences (hence the null payload)
    // This ensures the user has to click the checkbox and then click the
    // 'Continue...' button to sign up.
    if (!this.props.acceptedPrivacyTerms) {
      this.props.acceptTerms(null);
    }
  }

  onClick(isWeeklyEmailAccepted) {
    this.props.acceptTerms(isWeeklyEmailAccepted);
  }

  render() {
    const { acceptedPrivacyTerms, t } = this.props;
    if (acceptedPrivacyTerms) {
      return <RedirectToLearn />;
    }

    return (
      <Fragment>
        <Helmet>
          <title>{t('misc.email-signup')} | freeCodeCamp.org</title>
        </Helmet>
        <Grid className='default-page-wrapper email-sign-up'>
          <SectionHeader>{t('misc.email-signup')}</SectionHeader>
          <Row>
            <IntroDescription />
            <Col md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
              <strong>{t('misc.quincy')}</strong>
              <Spacer />
              <p>{t('misc.email-blast')}</p>
              <Spacer />
            </Col>

            <Col md={4} mdOffset={2} sm={5} smOffset={1} xs={12}>
              <Button
                block={true}
                bsSize='lg'
                bsStyle='primary'
                className='big-cta-btn'
                onClick={() => this.onClick(true)}
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
                className='big-cta-btn'
                onClick={() => this.onClick(false)}
              >
                {t('buttons.no-thanks')}
              </Button>
              <ButtonSpacer />
            </Col>
            <Col xs={12}>
              <Spacer />
            </Col>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}

AcceptPrivacyTerms.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(AcceptPrivacyTerms));
