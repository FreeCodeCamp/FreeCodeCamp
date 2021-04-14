import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Grid,
  Row,
  Col,
  Button
} from '@freecodecamp/react-bootstrap';
import { Link } from 'gatsby';
import { isString } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import isEmail from 'validator/lib/isEmail';

import { Spacer } from '../components/helpers';
import './update-email.css';
import { userSelector } from '../redux';
import { updateMyEmail } from '../redux/settings';
import { maybeEmailRE } from '../utils';

const propTypes = {
  isNewEmail: PropTypes.bool,
  t: PropTypes.func.isRequired,
  updateMyEmail: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  userSelector,
  ({ email, emailVerified }) => ({
    isNewEmail: !email || emailVerified
  })
);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateMyEmail }, dispatch);

class UpdateEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailValue: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { emailValue } = this.state;
    const { updateMyEmail } = this.props;
    return updateMyEmail(emailValue);
  };

  onChange(e) {
    const change = e.target.value;
    if (!isString(change)) {
      return null;
    }
    return this.setState({
      emailValue: change
    });
  }

  getEmailValidationState() {
    const { emailValue } = this.state;
    if (maybeEmailRE.test(emailValue)) {
      return isEmail(emailValue) ? 'success' : 'error';
    }
    return null;
  }

  render() {
    const { isNewEmail, t } = this.props;
    return (
      <Fragment>
        <Helmet>
          <title>{t('misc.update-email-1')} | freeCodeCamp.org</title>
        </Helmet>
        <Spacer />
        <h2 className='text-center'>{t('misc.update-email-2')}</h2>
        <Grid>
          <Row>
            <Col sm={6} smOffset={3}>
              <Row>
                <Form horizontal={true} onSubmit={this.handleSubmit}>
                  <FormGroup
                    controlId='emailInput'
                    validationState={this.getEmailValidationState()}
                  >
                    <Col
                      className='email-label'
                      componentClass={ControlLabel}
                      sm={2}
                    >
                      {t('misc.email')}
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        onChange={this.onChange}
                        placeholder='camperbot@example.com'
                        required={true}
                        type='email'
                      />
                    </Col>
                  </FormGroup>
                  <Button
                    block={true}
                    bsSize='lg'
                    bsStyle='primary'
                    disabled={this.getEmailValidationState() !== 'success'}
                    type='submit'
                  >
                    {isNewEmail
                      ? t('buttons.update-email')
                      : t('buttons.verify-email')}
                  </Button>
                </Form>
                <p className='text-center'>
                  <Link to='/signout'>{t('buttons.sign-out')}</Link>
                </p>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}

UpdateEmail.displayName = 'Update-Email';
UpdateEmail.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(UpdateEmail));
