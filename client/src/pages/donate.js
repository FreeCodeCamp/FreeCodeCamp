import { Grid, Row, Col, Alert } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import DonateForm from '../components/Donation/DonateForm';
import {
  DonationText,
  DonationSupportText,
  DonationOptionsText,
  DonationOptionsAlertText
} from '../components/Donation/DonationTextComponents';
import { Spacer, Loader } from '../components/helpers';
import CampersImage from '../components/landing/components/CampersImage';
import { signInLoadingSelector, userSelector, executeGA } from '../redux';

const propTypes = {
  executeGA: PropTypes.func,
  isDonating: PropTypes.bool,
  showLoading: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  userSelector,
  signInLoadingSelector,
  ({ isDonating }, showLoading) => ({
    isDonating,
    showLoading
  })
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      executeGA
    },
    dispatch
  );

class DonatePage extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      enableSettings: false
    };
    this.handleProcessing = this.handleProcessing.bind(this);
  }

  componentDidMount() {
    this.props.executeGA({
      type: 'event',
      data: {
        category: 'Donation View',
        action: `Displayed donate page`,
        nonInteraction: true
      }
    });
  }

  handleProcessing(duration, amount, action = 'stripe button click') {
    this.props.executeGA({
      type: 'event',
      data: {
        category: 'Donation',
        action: `donate page ${action}`,
        label: duration,
        value: amount
      }
    });
  }

  render() {
    const { showLoading, isDonating, t } = this.props;

    if (showLoading) {
      return <Loader fullScreen={true} />;
    }

    return (
      <Fragment>
        <Helmet title={`${t('donate.title')} | freeCodeCamp.org`} />
        <Grid className='donate-page-wrapper'>
          <Spacer />
          <Row>
            <Fragment>
              <Col lg={6} lgOffset={0} md={8} mdOffset={2} sm={10} smOffset={1}>
                <Row>
                  <Col className={'text-center'} xs={12}>
                    {isDonating ? (
                      <h2>{t('donate.thank-you')}</h2>
                    ) : (
                      <h2>{t('donate.help-more')}</h2>
                    )}
                    <Spacer />
                  </Col>
                </Row>
                {isDonating ? (
                  <Alert>
                    <p>{t('donate.thank-you-2')}</p>
                    <br />
                    <DonationOptionsAlertText />
                  </Alert>
                ) : null}
                <DonationText />
                <DonateForm
                  enableDonationSettingsPage={this.enableDonationSettingsPage}
                  handleProcessing={this.handleProcessing}
                />
                <Row className='donate-support'>
                  <Col xs={12}>
                    <hr />
                    <DonationOptionsText />
                    <DonationSupportText />
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <CampersImage page='donate' />
              </Col>
            </Fragment>
          </Row>
          <Spacer />
        </Grid>
      </Fragment>
    );
  }
}

DonatePage.displayName = 'DonatePage';
DonatePage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(DonatePage));
