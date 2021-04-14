/* eslint-disable no-nested-ternary */
import {
  Button,
  Col,
  Row,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup
} from '@freecodecamp/react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
  amountsConfig,
  durationsConfig,
  defaultAmount,
  defaultDonation,
  donationUrls,
  modalDefaultDonation
} from '../../../../config/donation-settings';
import envData from '../../../../config/env.json';
import {
  isSignedInSelector,
  signInLoadingSelector,
  donationFormStateSelector,
  hardGoTo as navigate,
  addDonation,
  createStripeSession,
  postChargeStripe,
  updateDonationFormState,
  defaultDonationFormState,
  userSelector
} from '../../redux';
import { stripeScriptLoader } from '../../utils/scriptLoaders';
import Spacer from '../helpers/Spacer';
import DonateCompletion from './DonateCompletion';
import PaypalButton from './PaypalButton';
import StripeCardForm from './StripeCardForm';

import './Donation.css';

const { stripePublicKey } = envData;

const numToCommas = num =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

const propTypes = {
  addDonation: PropTypes.func,
  createStripeSession: PropTypes.func,
  defaultTheme: PropTypes.string,
  donationFormState: PropTypes.object,
  email: PropTypes.string,
  handleProcessing: PropTypes.func,
  isDonating: PropTypes.bool,
  isMinimalForm: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  navigate: PropTypes.func.isRequired,
  postChargeStripe: PropTypes.func.isRequired,
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
  navigate,
  postChargeStripe,
  updateDonationFormState,
  createStripeSession
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
      processing: false,
      stripe: null
    };

    this.handleStripeLoad = this.handleStripeLoad.bind(this);
    this.onDonationStateChange = this.onDonationStateChange.bind(this);
    this.getActiveDonationAmount = this.getActiveDonationAmount.bind(this);
    this.getDonationButtonLabel = this.getDonationButtonLabel.bind(this);
    this.handleSelectAmount = this.handleSelectAmount.bind(this);
    this.handleSelectDuration = this.handleSelectDuration.bind(this);
    this.handleStripeCheckoutRedirect = this.handleStripeCheckoutRedirect.bind(
      this
    );
    this.hideAmountOptionsCB = this.hideAmountOptionsCB.bind(this);
    this.resetDonation = this.resetDonation.bind(this);
    this.postStripeDonation = this.postStripeDonation.bind(this);
  }

  componentDidMount() {
    if (window.Stripe) {
      this.handleStripeLoad();
    } else if (document.querySelector('#stripe-js')) {
      document
        .querySelector('#stripe-js')
        .addEventListener('load', this.handleStripeLoad);
    } else {
      stripeScriptLoader(this.handleStripeLoad);
    }
  }

  componentWillUnmount() {
    const stripeMountPoint = document.querySelector('#stripe-js');
    if (stripeMountPoint) {
      stripeMountPoint.removeEventListener('load', this.handleStripeLoad);
    }
    this.resetDonation();
  }

  handleStripeLoad() {
    // Create Stripe instance once Stripe.js loads
    if (stripePublicKey) {
      this.setState(state => ({
        ...state,
        stripe: window.Stripe(stripePublicKey)
      }));
    }
  }

  onDonationStateChange(donationState) {
    // scroll to top
    window.scrollTo(0, 0);

    this.props.updateDonationFormState(donationState);
    // send donation made on the donate page to related news article
    if (donationState.success && !this.props.isMinimalForm) {
      this.props.navigate(donationUrls.successUrl);
    }
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

  postStripeDonation(token) {
    const { donationAmount: amount, donationDuration: duration } = this.state;
    window.scrollTo(0, 0);

    // change the donation modal button label to close
    // or display the close button for the cert donation section
    if (this.props.handleProcessing) {
      this.props.handleProcessing(duration, amount);
    }
    this.props.postChargeStripe({ token, amount, duration });
  }

  async handleStripeCheckoutRedirect(e, paymentMethod) {
    e.preventDefault();
    const { stripe, donationAmount, donationDuration } = this.state;
    const { handleProcessing, email } = this.props;

    handleProcessing(
      donationDuration,
      donationAmount,
      `stripe (${paymentMethod}) button click`
    );

    this.props.createStripeSession({
      stripe,
      data: {
        donationAmount,
        donationDuration,
        clickedPaymentMethod: paymentMethod,
        email,
        context: 'donate page'
      }
    });
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
    const { handleProcessing, isSignedIn, addDonation, t } = this.props;
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
          <Button
            block={true}
            bsStyle='primary'
            id='confirm-donation-btn'
            onClick={e => this.handleStripeCheckoutRedirect(e, 'credit card')}
          >
            {}
            <b>{t('donate.credit-card')} </b>
          </Button>
          <PaypalButton
            addDonation={addDonation}
            donationAmount={donationAmount}
            donationDuration={donationDuration}
            handleProcessing={handleProcessing}
            isSubscription={isOneTime ? false : true}
            onDonationStateChange={this.onDonationStateChange}
            skipAddDonation={!isSignedIn}
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
    const { donationAmount, donationDuration, stripe } = this.state;
    const {
      handleProcessing,
      addDonation,
      email,
      theme,
      t,
      defaultTheme
    } = this.props;
    return (
      <Row>
        <Col lg={8} lgOffset={2} sm={10} smOffset={1} xs={12}>
          <Spacer />
          <b>
            {this.getDonationButtonLabel()} {t('donate.paypal')}
          </b>
          <Spacer />
          <PaypalButton
            addDonation={addDonation}
            donationAmount={donationAmount}
            donationDuration={donationDuration}
            handleProcessing={handleProcessing}
            onDonationStateChange={this.onDonationStateChange}
          />
        </Col>
        <Col lg={8} lgOffset={2} sm={10} smOffset={1} xs={12}>
          <Spacer />
          <b>{t('donate.credit-card-2')}</b>
          <Spacer />
          <Elements stripe={stripe}>
            <StripeCardForm
              getDonationButtonLabel={this.getDonationButtonLabel}
              onDonationStateChange={this.onDonationStateChange}
              postStripeDonation={this.postStripeDonation}
              theme={defaultTheme ? defaultTheme : theme}
              userEmail={email}
            />
          </Elements>
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
