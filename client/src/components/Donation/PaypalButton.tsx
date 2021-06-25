/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable camelcase */

import React, { Component } from 'react';
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

type PaypalButtonProps = {
  addDonation: (data: unknown) => unknown;
  donationAmount: number;
  donationDuration: string;
  handleProcessing: (
    duration: string,
    amount: number,
    action: string
  ) => unknown;
  isDonating: boolean;
  onDonationStateChange: ({
    redirecting,
    processing,
    success,
    error
  }: {
    redirecting: boolean;
    processing: boolean;
    success: boolean;
    error: string | null;
  }) => void;
  skipAddDonation?: boolean;
  t: (label: string) => string;
  theme: string;
  isSubscription?: boolean;
};

type PaypalButtonState = {
  amount: number;
  duration: string;
  planId: string;
};

const {
  paypalClientId,
  deploymentEnv
}: { paypalClientId: string | null; deploymentEnv: 'staging' | 'live' } =
  envData;

export class PaypalButton extends Component<
  PaypalButtonProps,
  PaypalButtonState
> {
  static displayName = 'PaypalButton';
  constructor(props: PaypalButtonProps) {
    super(props);
    this.handleApproval = this.handleApproval.bind(this);
  }

  // I can't figure out if it is necessary
  // state = {};

  static getDerivedStateFromProps(
    props: PaypalButtonProps
    // state: PaypalButtonState
  ): {
    donationAmount: number;
    donationDuration: string;
    paypalConfigTypes: unknown;
  } | null {
    const { donationAmount, donationDuration } = props;
    // Help Needed
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const configurationObj: {
      donationAmount: number;
      donationDuration: string;
      paypalConfigTypes: unknown;
    } = paypalConfigurator(
      donationAmount,
      donationDuration,
      paypalConfigTypes[deploymentEnv || 'staging']
    );
    // re-implement it as a deep comparison.
    // if (state === configurationObj) {
    //   return null;
    // }
    return { ...configurationObj };
  }

  handleApproval = (
    data: { error: string | null; [key: string]: unknown },
    isSubscription: boolean
  ): void => {
    const { amount, duration } = this.state;
    const { skipAddDonation = false } = this.props;

    // Skip the api if user is not signed in or if its a one-time donation
    if (!skipAddDonation || isSubscription) {
      this.props.addDonation(data);
    }

    this.props.handleProcessing(duration, amount, 'Paypal payment submission');

    // Show success anytime because the payment has gone through paypal
    this.props.onDonationStateChange({
      redirecting: false,
      processing: false,
      success: true,
      error: data.error ? data.error : null
    });
  };

  render(): JSX.Element | null {
    const { duration, planId, amount } = this.state;
    const { t, theme } = this.props;
    const isSubscription = duration !== 'onetime';
    const buttonColor = theme === 'night' ? 'white' : 'gold';
    if (!paypalClientId) {
      return null;
    }

    return (
      <div className={'paypal-buttons-container'}>
        {/* help needed */}
        <PayPalButtonScriptLoader
          amount={amount}
          clientId={paypalClientId}
          createOrder={(
            data: unknown,
            actions: {
              order: {
                create: (arg0: {
                  purchase_units: {
                    amount: { currency_code: string; value: string };
                  }[];
                }) => unknown;
              };
            }
          ) => {
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
          createSubscription={(
            data: unknown,
            actions: {
              subscription: { create: (arg0: { plan_id: string }) => unknown };
            }
          ) => {
            return actions.subscription.create({
              plan_id: planId
            });
          }}
          isSubscription={isSubscription}
          onApprove={(data: {
            [key: string]: unknown;
            error: string | null;
          }) => {
            this.handleApproval(data, isSubscription);
          }}
          onCancel={() => {
            this.props.onDonationStateChange({
              redirecting: false,
              processing: false,
              success: false,
              error: t('donate.failed-pay')
            });
          }}
          onError={() =>
            this.props.onDonationStateChange({
              redirecting: false,
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

const mapStateToProps = createSelector(
  userSelector,
  signInLoadingSelector,
  ({ isDonating }: { isDonating: boolean }, showLoading: boolean) => ({
    isDonating,
    showLoading
  })
);

PaypalButton.displayName = 'PaypalButton';

export default connect(mapStateToProps)(withTranslation()(PaypalButton));
