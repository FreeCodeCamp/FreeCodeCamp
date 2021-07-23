/* eslint-disable camelcase */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PayPalButtonScriptLoader from './PayPalButtonScriptLoader';
import { withTranslation } from 'react-i18next';

import envData from '../../../../config/env.json';
import {
  paypalConfigurator,
  paypalConfigTypes
} from '../../../../config/donation-settings';
import { signInLoadingSelector, userSelector } from '../../redux';

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
    const { isSignedIn } = this.props;

    // Hit the API only when user is signed in and making a subscription donation
    if (isSignedIn && isSubscription) {
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
    const { t, theme } = this.props;
    const isSubscription = duration !== 'onetime';
    const buttonColor = theme === 'night' ? 'white' : 'gold';
    if (!paypalClientId) {
      return null;
    }

    return (
      <div className={'paypal-buttons-container'}>
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
            height: 43,
            color: buttonColor
          }}
        />
      </div>
    );
  }
}

const propTypes = {
  addDonation: PropTypes.func,
  donationAmount: PropTypes.number,
  donationDuration: PropTypes.string,
  handleProcessing: PropTypes.func,
  isDonating: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  onDonationStateChange: PropTypes.func,
  t: PropTypes.func.isRequired,
  theme: PropTypes.string
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
