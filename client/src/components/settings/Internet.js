import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  HelpBlock,
  FormControl,
  FormGroup,
  ControlLabel
} from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import { withTranslation } from 'react-i18next';
import isURL from 'validator/lib/isURL';

import { maybeUrlRE } from '../../utils';

import { FullWidthRow } from '../helpers';
import BlockSaveButton from '../helpers/form/BlockSaveButton';
import SectionHeader from './SectionHeader';

const propTypes = {
  githubProfile: PropTypes.string,
  linkedin: PropTypes.string,
  t: PropTypes.func.isRequired,
  twitter: PropTypes.string,
  updateInternetSettings: PropTypes.func.isRequired,
  website: PropTypes.string
};

class InternetSettings extends Component {
  constructor(props) {
    super(props);
    const {
      githubProfile = '',
      linkedin = '',
      twitter = '',
      website = ''
    } = props;

    this.state = {
      formValues: { githubProfile, linkedin, twitter, website },
      originalValues: { githubProfile, linkedin, twitter, website }
    };
  }

  componentDidUpdate() {
    const {
      githubProfile = '',
      linkedin = '',
      twitter = '',
      website = ''
    } = this.props;

    const { originalValues } = this.state;

    if (
      githubProfile !== originalValues.githubProfile ||
      linkedin !== originalValues.linkedin ||
      twitter !== originalValues.twitter ||
      website !== originalValues.website
    ) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      return this.setState({
        originalValues: { githubProfile, linkedin, twitter, website }
      });
    }
    return null;
  }

  getValidationStateFor(maybeURl = '') {
    const { t } = this.props;
    if (!maybeURl || !maybeUrlRE.test(maybeURl)) {
      return {
        state: null,
        message: ''
      };
    }
    if (isURL(maybeURl)) {
      return {
        state: 'success',
        message: ''
      };
    }
    return {
      state: 'error',
      message: t('validation.invalid-url')
    };
  }

  createHandleChange = key => e => {
    const value = e.target.value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        [key]: value
      }
    }));
  };

  isFormPristine = () => {
    const { formValues, originalValues } = this.state;
    return Object.keys(originalValues)
      .map(key => originalValues[key] === formValues[key])
      .every(bool => bool);
  };

  isFormValid = () => {
    const { formValues, originalValues } = this.state;
    const valueReducer = obj => {
      return Object.values(obj).reduce(
        (acc, cur) => (acc ? acc : cur !== ''),
        false
      );
    };

    let formHasValues = valueReducer(formValues);
    let OriginalHasValues = valueReducer(originalValues);

    // check if user had values but wants to delete them all
    if (OriginalHasValues && !formHasValues) return true;

    return Object.keys(formValues).reduce((bool, key) => {
      const maybeUrl = formValues[key];
      return maybeUrl ? isURL(maybeUrl) : bool;
    }, false);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.isFormPristine() && this.isFormValid()) {
      // // Only submit the form if is has changed, and if it is valid
      const { formValues } = this.state;
      const isSocial = {
        isGithub: !!formValues.githubProfile,
        isLinkedIn: !!formValues.linkedin,
        isTwitter: !!formValues.twitter,
        isWebsite: !!formValues.website
      };

      const { updateInternetSettings } = this.props;
      return updateInternetSettings({ ...isSocial, ...formValues });
    }
    return null;
  };

  renderHelpBlock = validationMessage =>
    validationMessage ? <HelpBlock>{validationMessage}</HelpBlock> : null;

  renderCheck = (url, validation) =>
    url && validation === 'success' ? (
      <FormControl.Feedback>
        <span>
          <FontAwesomeIcon icon={faCheck} size='1x' />
        </span>
      </FormControl.Feedback>
    ) : null;

  render() {
    const { t } = this.props;
    const {
      formValues: { githubProfile, linkedin, twitter, website }
    } = this.state;

    const {
      state: githubProfileValidation,
      message: githubProfileValidationMessage
    } = this.getValidationStateFor(githubProfile);

    const {
      state: linkedinValidation,
      message: linkedinValidationMessage
    } = this.getValidationStateFor(linkedin);

    const {
      state: twitterValidation,
      message: twitterValidationMessage
    } = this.getValidationStateFor(twitter);

    const {
      state: websiteValidation,
      message: websiteValidationMessage
    } = this.getValidationStateFor(website);

    return (
      <Fragment>
        <SectionHeader>{t('settings.headings.internet')}</SectionHeader>
        <FullWidthRow>
          <form id='internet-presence' onSubmit={this.handleSubmit}>
            <FormGroup
              controlId='internet-github'
              validationState={githubProfileValidation}
            >
              <ControlLabel>GitHub</ControlLabel>
              <FormControl
                onChange={this.createHandleChange('githubProfile')}
                placeholder='https://github.com/user-name'
                type='url'
                value={githubProfile}
              />
              {this.renderCheck(githubProfile, githubProfileValidation)}
              {this.renderHelpBlock(githubProfileValidationMessage)}
            </FormGroup>
            <FormGroup
              controlId='internet-linkedin'
              validationState={linkedinValidation}
            >
              <ControlLabel>LinkedIn</ControlLabel>
              <FormControl
                onChange={this.createHandleChange('linkedin')}
                placeholder='https://www.linkedin.com/in/user-name'
                type='url'
                value={linkedin}
              />
              {this.renderCheck(linkedin, linkedinValidation)}
              {this.renderHelpBlock(linkedinValidationMessage)}
            </FormGroup>
            <FormGroup
              controlId='internet-picture'
              validationState={twitterValidation}
            >
              <ControlLabel>Twitter</ControlLabel>
              <FormControl
                onChange={this.createHandleChange('twitter')}
                placeholder='https://twitter.com/user-name'
                type='url'
                value={twitter}
              />
              {this.renderCheck(twitter, twitterValidation)}
              {this.renderHelpBlock(twitterValidationMessage)}
            </FormGroup>
            <FormGroup
              controlId='internet-website'
              validationState={websiteValidation}
            >
              <ControlLabel>{t('settings.labels.personal')}</ControlLabel>
              <FormControl
                onChange={this.createHandleChange('website')}
                placeholder='https://example.com'
                type='url'
                value={website}
              />
              {this.renderCheck(website, websiteValidation)}
              {this.renderHelpBlock(websiteValidationMessage)}
            </FormGroup>
            <BlockSaveButton
              disabled={this.isFormPristine() || !this.isFormValid()}
            />
          </form>
        </FullWidthRow>
      </Fragment>
    );
  }
}

InternetSettings.displayName = 'InternetSettings';
InternetSettings.propTypes = propTypes;

export default withTranslation()(InternetSettings);
