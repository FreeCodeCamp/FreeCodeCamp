import {
  ControlLabel,
  FormControl,
  Alert,
  FormGroup
} from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import { isValidUsername } from '../../../../utils/validate';
import {
  validateUsername,
  usernameValidationSelector,
  submitNewUsername
} from '../../redux/settings';
import FullWidthRow from '../helpers/FullWidthRow';
import BlockSaveButton from '../helpers/form/BlockSaveButton';

const propTypes = {
  isValidUsername: PropTypes.bool,
  submitNewUsername: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  username: PropTypes.string,
  validateUsername: PropTypes.func.isRequired,
  validating: PropTypes.bool
};

const mapStateToProps = createSelector(
  usernameValidationSelector,
  ({ isValidUsername, fetchState }) => ({
    isValidUsername,
    validating: fetchState.pending
  })
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitNewUsername,
      validateUsername
    },
    dispatch
  );

const hex = '[0-9a-f]';
const tempUserRegex = new RegExp(`^fcc${hex}{8}-(${hex}{4}-){3}${hex}{12}$`);

class UsernameSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormPristine: true,
      formValue: props.username,
      characterValidation: { valid: false, error: null },
      submitClicked: false,
      isUserNew: tempUserRegex.test(props.username)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFormInput = this.validateFormInput.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { username: prevUsername } = prevProps;
    const { formValue: prevFormValue } = prevState;
    const { username } = this.props;
    const { formValue } = this.state;
    if (prevUsername !== username && prevFormValue === formValue) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      return this.setState({
        isFormPristine: username === formValue,
        submitClicked: false,
        isUserNew: tempUserRegex.test(username)
      });
    }
    return null;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { submitNewUsername } = this.props;
    const {
      formValue,
      characterValidation: { valid }
    } = this.state;

    return this.setState({ submitClicked: true }, () =>
      valid ? submitNewUsername(formValue) : null
    );
  }

  handleChange(e) {
    e.preventDefault();
    const { username, validateUsername } = this.props;
    const newValue = e.target.value.toLowerCase();
    return this.setState(
      {
        formValue: newValue,
        isFormPristine: username === newValue,
        characterValidation: this.validateFormInput(newValue),
        submitClicked: false
      },
      () =>
        this.state.isFormPristine || this.state.characterValidation.error
          ? null
          : validateUsername(this.state.formValue)
    );
  }

  validateFormInput(formValue) {
    return isValidUsername(formValue);
  }

  renderAlerts(validating, error, isValidUsername) {
    const { t } = this.props;

    if (!validating && error) {
      console.log(error);
      return (
        <FullWidthRow>
          <Alert bsStyle='danger'>
            {t(`settings.username.${error}`, {
              username: this.state.formValue
            })}
          </Alert>
        </FullWidthRow>
      );
    }
    if (!validating && !isValidUsername) {
      return (
        <FullWidthRow>
          <Alert bsStyle='warning'>{t('settings.username.unavailable')}</Alert>
        </FullWidthRow>
      );
    }
    if (validating) {
      return (
        <FullWidthRow>
          <Alert bsStyle='info'>{t('settings.username.validating')}</Alert>
        </FullWidthRow>
      );
    }
    if (!validating && isValidUsername && this.state.isUserNew) {
      return (
        <FullWidthRow>
          <Alert bsStyle='success'>{t('settings.username.available')}</Alert>
        </FullWidthRow>
      );
    } else if (!validating && isValidUsername && !this.state.isUserNew) {
      return (
        <FullWidthRow>
          <Alert bsStyle='success'>{t('settings.username.available')}</Alert>
          <Alert bsStyle='info'>{t('settings.username.change')}</Alert>
        </FullWidthRow>
      );
    }
    return null;
  }

  render() {
    const {
      isFormPristine,
      formValue,
      characterValidation: { valid, error },
      submitClicked
    } = this.state;
    const { isValidUsername, t, validating } = this.props;

    return (
      <Fragment>
        <form id='usernameSettings' onSubmit={this.handleSubmit}>
          <FullWidthRow>
            <FormGroup>
              <ControlLabel htmlFor='username-settings'>
                <strong>{t('settings.labels.username')}</strong>
              </ControlLabel>
              <FormControl
                name='username-settings'
                onChange={this.handleChange}
                value={formValue}
              />
            </FormGroup>
          </FullWidthRow>
          {!isFormPristine &&
            this.renderAlerts(validating, error, isValidUsername)}
          <FullWidthRow>
            <BlockSaveButton
              disabled={
                !(isValidUsername && valid && !isFormPristine) || submitClicked
              }
            />
          </FullWidthRow>
        </form>
      </Fragment>
    );
  }
}

UsernameSettings.displayName = 'UsernameSettings';
UsernameSettings.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(UsernameSettings));
