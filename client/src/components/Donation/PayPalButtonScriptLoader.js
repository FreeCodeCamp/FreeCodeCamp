/* eslint-disable camelcase */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Loader } from '../../components/helpers';
import { scriptLoader, scriptRemover } from '../../utils/scriptLoaders';

export class PayPalButtonScriptLoader extends Component {
  state = { isSdkLoaded: window.paypal && true, isSubscription: true };

  static getDerivedStateFromProps(props, state) {
    const { isSubscription } = props;
    if (isSubscription !== state.isSubscription) {
      return { isSubscription: isSubscription };
    }
    return null;
  }

  componentDidMount() {
    if (!window.paypal) {
      this.loadScript(this.props.isSubscription);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSubscription !== this.state.isSubscription) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isSdkLoaded: false });
      this.loadScript(this.state.isSubscription, true);
    }
  }

  loadScript(subscription, deleteScript) {
    if (deleteScript) scriptRemover('paypal-sdk');
    let queries = `?client-id=${this.props.clientId}&disable-funding=credit,card,bancontact,blik,eps,giropay,ideal,mybank,p24,sepa,sofort,venmo`;
    if (subscription) queries += '&vault=true&intent=subscription';

    scriptLoader(
      'paypal-sdk',
      'paypal-sdk',
      true,
      `https://www.paypal.com/sdk/js${queries}`,
      this.onScriptLoad
    );
  }

  onScriptLoad = () => {
    this.setState({ isSdkLoaded: true });
  };

  captureOneTimePayment(data, actions) {
    return actions.order.capture().then(details => {
      return this.props.onApprove(details, data);
    });
  }

  render() {
    const { isSdkLoaded, isSubscription } = this.state;
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
            ? (data, actions) => onApprove(data, actions)
            : (data, actions) => this.captureOneTimePayment(data, actions)
        }
        onCancel={onCancel}
        onError={onError}
        style={style}
      />
    );
  }
}

const propTypes = {
  clientId: PropTypes.string,
  createOrder: PropTypes.func,
  createSubscription: PropTypes.func,
  donationAmount: PropTypes.number,
  donationDuration: PropTypes.string,
  isSubscription: PropTypes.bool,
  onApprove: PropTypes.func,
  onCancel: PropTypes.func,
  onError: PropTypes.func,
  style: PropTypes.object
};

PayPalButtonScriptLoader.displayName = 'PayPalButtonScriptLoader';
PayPalButtonScriptLoader.propTypes = propTypes;

export default PayPalButtonScriptLoader;
