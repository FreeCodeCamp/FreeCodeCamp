/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  Col,
  Row,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup
} from '@freecodecamp/react-bootstrap';
import { withTranslation } from 'react-i18next';

import {
  amountsConfig,
  durationsConfig,
  defaultAmount,
  defaultDonation,
  modalDefaultDonation
} from '../../../../config/donation-settings';
import Spacer from '../helpers/Spacer';
import PaypalButton from './PaypalButton';
import DonateCompletion from './DonateCompletion';
import {
  isSignedInSelector,
  signInLoadingSelector,
  donationFormStateSelector,
  addDonation,
  updateDonationFormState,
  defaultDonationFormState,
  userSelector
} from '../../redux';

import './Donation.css';

const numToCommas = num =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

const propTypes = {
  addDonation: PropTypes.func,
  defaultTheme: PropTypes.string,
  donationFormState: PropTypes.object,
  email: PropTypes.string,
  handleProcessing: PropTypes.func,
  isDonating: PropTypes.bool,
  isMinimalForm: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  showLoading: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.string,
  updateDonationFormState: PropTypes.func
};

const mapStateToProps = createSelector(
  signInLoadingSelector,
  isSignedInSelector,
  donationFormStateSelector,
  userSelector,
  (showLoading, isSignedIn, donationFormState, { email, theme }) => ({
    isSignedIn,
    showLoading,
    donationFormState,
    email,
    theme
  })
);

const mapDispatchToProps = {
  addDonation,
  updateDonationFormState
};

class DonateForm extends Component {
  constructor(...args) {
    super(...args);

    this.durations = durationsConfig;
    this.amounts = amountsConfig;

    const initialAmountAndDuration = this.props.isMinimalForm
      ? modalDefaultDonation
      : defaultDonation;

    this.state = {
      ...initialAmountAndDuration,
      processing: false
    };

    this.onDonationStateChange = this.onDonationStateChange.bind(this);
    this.getActiveDonationAmount = this.getActiveDonationAmount.bind(this);
    this.getDonationButtonLabel = this.getDonationButtonLabel.bind(this);
    this.handleSelectAmount = this.handleSelectAmount.bind(this);
    this.handleSelectDuration = this.handleSelectDuration.bind(this);
    this.hideAmountOptionsCB = this.hideAmountOptionsCB.bind(this);
    this.resetDonation = this.resetDonation.bind(this);
  }

  componentWillUnmount() {
    this.resetDonation();
  }

  onDonationStateChange(donationState) {
    // scroll to top
    window.scrollTo(0, 0);
    this.props.updateDonationFormState(donationState);
  }

  getActiveDonationAmount(durationSelected, amountSelected) {
    return this.amounts[durationSelected].includes(amountSelected)
      ? amountSelected
      : defaultAmount[durationSelected] || this.amounts[durationSelected][0];
  }

  convertToTimeContributed(amount) {
    return numToCommas((amount / 100) * 50);
  }

  getFormattedAmountLabel(amount) {
    return `${numToCommas(amount / 100)}`;
  }

  getDonationButtonLabel() {
    const { donationAmount, donationDuration } = this.state;
    const { t } = this.props;
    const usd = this.getFormattedAmountLabel(donationAmount);
    let donationBtnLabel = t('donate.confirm');
    if (donationDuration === 'onetime') {
      donationBtnLabel = t('donate.confirm-2', {
        usd: usd
      });
    } else {
      donationBtnLabel =
        donationDuration === 'month'
          ? t('donate.confirm-3', {
              usd: usd
            })
          : t('donate.confirm-4', { usd: usd });
    }
    return donationBtnLabel;
  }

  handleSelectDuration(donationDuration) {
    const donationAmount = this.getActiveDonationAmount(donationDuration, 0);
    this.setState({ donationDuration, donationAmount });
  }

  handleSelectAmount(donationAmount) {
    this.setState({ donationAmount });
  }

  renderAmountButtons(duration) {
    return this.amounts[duration].map(amount => (
      <ToggleButton
        className='amount-value'
        id={`${this.durations[duration]}-donation-${amount}`}
        key={`${this.durations[duration]}-donation-${amount}`}
        value={amount}
      >
        {this.getFormattedAmountLabel(amount)}
      </ToggleButton>
    ));
  }

  renderDonationDescription() {
    const { donationAmount, donationDuration } = this.state;
    const { t } = this.props;
    const usd = this.getFormattedAmountLabel(donationAmount);
    const hours = this.convertToTimeContributed(donationAmount);

    return (
      <p className='donation-description'>
        {donationDuration === 'onetime'
          ? t('donate.your-donation', { usd: usd, hours: hours })
          : donationDuration === 'month'
          ? t('donate.your-donation-2', { usd: usd, hours: hours })
          : t('donate.your-donation-3', { usd: usd, hours: hours })}
      </p>
    );
  }

  renderDurationAmountOptions() {
    const { donationAmount, donationDuration, processing } = this.state;
    const { t } = this.props;

    return !processing ? (
      <div>
        <h3>{t('donate.gift-frequency')}</h3>
        <Tabs
          activeKey={donationDuration}
          animation={false}
          bsStyle='pills'
          className='donate-tabs'
          id='Duration'
          onSelect={this.handleSelectDuration}
        >
          {Object.keys(this.durations).map(duration => (
            <Tab
              eventKey={duration}
              key={duration}
              title={this.durations[duration]}
            >
              <Spacer />
              <h3>{t('donate.gift-amount')}</h3>
              <div>
                <ToggleButtonGroup
                  animation={`false`}
                  className='amount-values'
                  name='amounts'
                  onChange={this.handleSelectAmount}
                  type='radio'
                  value={this.getActiveDonationAmount(duration, donationAmount)}
                >
                  {this.renderAmountButtons(duration)}
                </ToggleButtonGroup>
                <Spacer />
                {this.renderDonationDescription()}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    ) : null;
  }

  hideAmountOptionsCB(hide) {
    this.setState({ processing: hide });
  }

  renderDonationOptions() {
    const {
      handleProcessing,
      isSignedIn,
      addDonation,
      t,
      defaultTheme,
      theme
    } = this.props;
    const { donationAmount, donationDuration } = this.state;

    const isOneTime = donationDuration === 'onetime';

    return (
      <div>
        {isOneTime ? (
          <b>
            {t('donate.confirm-1')} {donationAmount / 100}:
          </b>
        ) : (
          <b>{t('donate.confirm-3', { usd: donationAmount / 100 })}:</b>
        )}
        <Spacer />
        <div className='donate-btn-group'>
          <PaypalButton
            addDonation={addDonation}
            donationAmount={donationAmount}
            donationDuration={donationDuration}
            handleProcessing={handleProcessing}
            isSubscription={isOneTime ? false : true}
            onDonationStateChange={this.onDonationStateChange}
            skipAddDonation={!isSignedIn}
            theme={defaultTheme ? defaultTheme : theme}
          />
        </div>
      </div>
    );
  }

  resetDonation() {
    return this.props.updateDonationFormState({ ...defaultDonationFormState });
  }

  renderCompletion(props) {
    return <DonateCompletion {...props} />;
  }

  renderModalForm() {
    const { donationAmount, donationDuration } = this.state;
    const { handleProcessing, addDonation, defaultTheme, theme } = this.props;
    return (
      <Row>
        <Col lg={8} lgOffset={2} sm={10} smOffset={1} xs={12}>
          <Spacer />
          <b>{this.getDonationButtonLabel()}:</b>
          <Spacer />
          <PaypalButton
            addDonation={addDonation}
            donationAmount={donationAmount}
            donationDuration={donationDuration}
            handleProcessing={handleProcessing}
            onDonationStateChange={this.onDonationStateChange}
            theme={defaultTheme ? defaultTheme : theme}
          />
        </Col>
      </Row>
    );
  }

  renderPageForm() {
    return (
      <Row>
        <Col xs={12}>{this.renderDonationDescription()}</Col>
        <Col xs={12}>{this.renderDonationOptions()}</Col>
      </Row>
    );
  }

  render() {
    const {
      donationFormState: { processing, success, error, redirecting },
      isMinimalForm
    } = this.props;
    if (success || error) {
      return this.renderCompletion({
        processing,
        redirecting,
        success,
        error,
        reset: this.resetDonation
      });
    }

    // keep payment provider elements on DOM during processing and redirect to avoid errors.
    return (
      <>
        {(processing || redirecting) &&
          this.renderCompletion({
            processing,
            redirecting,
            success,
            error,
            reset: this.resetDonation
          })}
        <div className={processing || redirecting ? 'hide' : ''}>
          {isMinimalForm
            ? this.renderModalForm(processing)
            : this.renderPageForm(processing)}
        </div>
      </>
    );
  }
}

DonateForm.displayName = 'DonateForm';
DonateForm.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(DonateForm));
