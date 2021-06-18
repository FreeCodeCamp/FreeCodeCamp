/* eslint-disable camelcase */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { scriptLoader, scriptRemover } from '../../utils/scriptLoaders';
import { Loader } from '../helpers';

type PayPalButtonScriptLoaderProps = {
  clientId: string;
  createOrder: (
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
  ) => unknown;
  createSubscription: (
    data: unknown,
    actions: {
      subscription: { create: (arg0: { plan_id: string }) => unknown };
    }
  ) => unknown;
  donationAmount: number;
  donationDuration: string;
  isSubscription: boolean;
  onApprove: (data: {
    [key: string]: unknown;
    error: string | null;
  }) => unknown;
  onCancel: () => unknown;
  onError: () => unknown;
  style: unknown;
  amount: number;
  plantId: string;
};

type PayPalButtonScriptLoaderState = {
  isSdkLoaded: boolean;
  isSubscription: boolean;
};

declare global {
  interface Window {
    paypal: {
      Buttons: {
        driver: (
          react: string,
          { React, ReactDOM }: { React: unknown; ReactDOM: unknown }
        ) => unknown;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };
  }
}

export class PayPalButtonScriptLoader extends Component<
  PayPalButtonScriptLoaderProps,
  PayPalButtonScriptLoaderState
> {
  // Lint says that paypal does not exist on window
  state = { isSdkLoaded: window.paypal ? true : false, isSubscription: true };

  static displayName = 'PayPalButtonScriptLoader';

  static getDerivedStateFromProps(
    props: PayPalButtonScriptLoaderProps,
    state: PayPalButtonScriptLoaderState
  ): { isSubscription: boolean } | null {
    const { isSubscription } = props;
    if (isSubscription !== state.isSubscription) {
      return { isSubscription: isSubscription };
    }
    return null;
  }

  componentDidMount(): void {
    if (!window.paypal) {
      this.loadScript(this.props.isSubscription, false);
    }
  }

  componentDidUpdate(prevProps: {
    isSubscription: boolean;
    style: unknown;
  }): void {
    if (
      prevProps.isSubscription !== this.state.isSubscription ||
      prevProps.style !== this.props.style
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isSdkLoaded: false });
      this.loadScript(this.state.isSubscription, true);
    }
  }

  loadScript(subscription: boolean, deleteScript: boolean | undefined): void {
    if (deleteScript) scriptRemover('paypal-sdk');
    let queries = `?client-id=${this.props.clientId}&disable-funding=credit,bancontact,blik,eps,giropay,ideal,mybank,p24,sepa,sofort,venmo`;
    if (subscription) queries += '&vault=true&intent=subscription';

    scriptLoader(
      'paypal-sdk',
      'paypal-sdk',
      true,
      `https://www.paypal.com/sdk/js${queries}`,
      this.onScriptLoad
    );
  }

  onScriptLoad = (): void => {
    this.setState({ isSdkLoaded: true });
  };

  captureOneTimePayment(
    data: unknown,
    actions: { order: { capture: () => Promise<unknown> } }
  ): unknown {
    return actions.order.capture().then((details: unknown) => {
      return this.props.onApprove(details, data);
    });
  }

  render(): JSX.Element {
    const {
      isSdkLoaded,
      isSubscription
    }: { isSdkLoaded: boolean; isSubscription: boolean } = this.state;
    const {
      onApprove,
      onError,
      onCancel,
      createSubscription,
      createOrder,
      style
    } = this.props;

    if (!isSdkLoaded) return <Loader />;

    const Button = window.paypal.Buttons.driver('react', {
      React,
      ReactDOM
    });

    return (
      <Button
        createOrder={isSubscription ? null : createOrder}
        createSubscription={isSubscription ? createSubscription : null}
        onApprove={
          isSubscription
            ? (
                data: unknown,
                actions: { order: { capture: () => Promise<unknown> } }
              ) => onApprove(data, actions)
            : (
                data: unknown,
                actions: { order: { capture: () => Promise<unknown> } }
              ) => this.captureOneTimePayment(data, actions)
        }
        onCancel={onCancel}
        onError={onError}
        style={style}
      />
    );
  }
}

PayPalButtonScriptLoader.displayName = 'PayPalButtonScriptLoader';

export default PayPalButtonScriptLoader;
