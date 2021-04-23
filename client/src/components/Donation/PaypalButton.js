/* eslint-disable camelcase */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
  paypalConfigurator,
  paypalConfigTypes
} from '../../../../config/donation-settings';
import envData from '../../../../config/env.json';
import { signInLoadingSelector, userSelector } from '../../redux';
import PayPalButtonScriptLoader from './PayPalButtonScriptLoader';

const { paypalClientId, deploymentEnv } = envData;
export class PaypalButton extends Component {
  constructor(props) {
    super(props);
    this.handleApproval = this.handleApproval.bind(this);
  }

  state = {};

  static getDerivedStateFromProps(props, state) {
    const { donationAmount, donationDuration } = props;

    const configurationObj = paypalConfigurator(
      donationAmount,
      donationDuration,
      paypalConfigTypes[deploymentEnv || 'staging']
    );
    if (state === configurationObj) {
      return null;
    }
    return { ...configurationObj };
  }

  handleApproval = (data, isSubscription) => {
    const { amount, duration } = this.state;
    const { skipAddDonation = false } = this.props;

    // Skip the api if user is not signed in or if its a one-time donation
    if (!skipAddDonation || isSubscription) {
      this.props.addDonation(data);
    }

    this.props.handleProcessing(duration, amount, 'Paypal payment submission');

    // Show success anytime because the payment has gone through paypal
    this.props.onDonationStateChange({
      processing: false,
      success: true,
      error: data.error ? data.error : null
    });
  };

  render() {
    const { duration, planId, amount } = this.state;
    const { t } = this.props;
    const isSubscription = duration !== 'onetime';

    if (!paypalClientId) {
      return null;
    }

    return (
      <PayPalButtonScriptLoader
        amount={amount}
        clientId={paypalClientId}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: (amount / 100).toString()
                }
              }
            ]
          });
        }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: planId
          });
        }}
        isSubscription={isSubscription}
        onApprove={data => {
          this.handleApproval(data, isSubscription);
        }}
        onCancel={() => {
          this.props.onDonationStateChange({
            processing: false,
            success: false,
            error: t('donate.failed-pay')
          });
        }}
        onError={() =>
          this.props.onDonationStateChange({
            processing: false,
            success: false,
            error: t('donate.try-again')
          })
        }
        plantId={planId}
        style={{
          tagline: false,
          height: 43
        }}
      />
    );
  }
}

const propTypes = {
  addDonation: PropTypes.func,
  donationAmount: PropTypes.number,
  donationDuration: PropTypes.string,
  handleProcessing: PropTypes.func,
  isDonating: PropTypes.bool,
  onDonationStateChange: PropTypes.func,
  skipAddDonation: PropTypes.bool,
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

PaypalButton.displayName = 'PaypalButton';
PaypalButton.propTypes = propTypes;

export default connect(mapStateToProps)(withTranslation()(PaypalButton));
