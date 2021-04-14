import {
  Row,
  Col,
  ControlLabel,
  FormGroup,
  Image,
  Button,
  Form,
  FormControl,
  Alert
} from '@freecodecamp/react-bootstrap';
import {
  CardNumberElement,
  CardExpiryElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import isEmail from 'validator/lib/isEmail';

const initialPaymentInfoValidityState = {
  cardNumber: {
    complete: false,
    error: null
  },
  cardExpiry: {
    complete: false,
    error: null
  }
};

const propTypes = {
  getDonationButtonLabel: PropTypes.func.isRequired,
  onDonationStateChange: PropTypes.func,
  postStripeDonation: PropTypes.func,
  t: PropTypes.func.isRequired,
  theme: PropTypes.string,
  userEmail: PropTypes.string
};

const StripeCardForm = ({
  getDonationButtonLabel,
  theme,
  t,
  onDonationStateChange,
  postStripeDonation,
  userEmail
}) => {
  const [isSubmissionValid, setSubmissionValidity] = useState(true);
  const [email, setEmail] = useState(userEmail);
  const [isEmailValid, setEmailValidity] = useState(true);
  const [paymentInfoValidation, setPaymentValidity] = useState(
    initialPaymentInfoValidityState
  );

  const stripe = useStripe();
  const elements = useElements();

  function handleInputChange(event) {
    const { elementType, error, complete } = event;
    setPaymentValidity({
      ...paymentInfoValidation,
      [elementType]: {
        error,
        complete
      }
    });
  }

  function isPaymentInfoValid() {
    return Object.keys(paymentInfoValidation)
      .map(key => paymentInfoValidation[key])
      .every(({ complete, error }) => complete && !error);
  }

  const options = {
    style: {
      base: {
        fontSize: '18px',
        color: `${theme === 'night' ? '#fff' : '#0a0a23'}`
      }
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!isEmailValid || !isPaymentInfoValid())
      return setSubmissionValidity(false);
    else setSubmissionValidity(true);

    if (!isEmail(email)) {
      return onDonationStateChange({
        error: t('donate.need-email')
      });
    }

    const { error, token } = await stripe.createToken(
      elements.getElement(CardNumberElement),
      { email }
    );

    if (error) {
      return onDonationStateChange({
        error: t('donate.went-wrong')
      });
    }
    return postStripeDonation(token);
  };

  const handleEmailChange = e => {
    const newValue = e.target.value;
    setEmail(newValue);
    setEmailValidity(true);
  };

  const handleEmailBlur = () => {
    const newValidation = isEmail(email);
    setEmailValidity(newValidation);
  };

  const renderErrorMessage = () => {
    let message = '';
    if (!isEmailValid && !isPaymentInfoValid())
      message = <p>{t('donate.valid-info')}</p>;
    else if (!isEmailValid) message = <p>{t('donate.valid-email')}</p>;
    else message = <p>{t('donate.valid-card')}</p>;
    return <Alert bsStyle='danger'>{message}</Alert>;
  };

  return (
    <Form className='donation-form' onSubmit={handleSubmit}>
      <div>{!isSubmissionValid ? renderErrorMessage() : ''}</div>
      <FormGroup className='donation-email-container'>
        <ControlLabel>{t('donate.email-receipt')}</ControlLabel>
        <FormControl
          className={!isEmailValid && email ? 'email--invalid' : ''}
          key='3'
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          placeholder='me@example.com'
          required={true}
          type='text'
          value={email || ''}
        />
      </FormGroup>
      <div className='donation-elements'>
        <FormGroup>
          <ControlLabel>{t('donate.card-number')}</ControlLabel>
          <CardNumberElement
            className='form-control donate-input-element'
            onChange={handleInputChange}
            options={options}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>{t('donate.expiration')}</ControlLabel>
          <Row>
            <Col md={5} xs={12}>
              <CardExpiryElement
                className='form-control donate-input-element'
                onChange={handleInputChange}
                options={options}
              />
            </Col>
            <Col className='form-payments-wrapper' md={7} xs={12}>
              <Image
                alt='payment options'
                className='form-payment-methods'
                src={
                  'https://cdn.freecodecamp.org' +
                  '/platform/universal/form-payments.png'
                }
              />
            </Col>
          </Row>
        </FormGroup>
      </div>
      <Button
        block={true}
        bsStyle='primary'
        disabled={!stripe}
        id='confirm-donation-btn'
        type='submit'
      >
        {getDonationButtonLabel()}
      </Button>
    </Form>
  );
};

StripeCardForm.displayName = 'StripeCardForm';
StripeCardForm.propTypes = propTypes;

export default withTranslation()(StripeCardForm);
