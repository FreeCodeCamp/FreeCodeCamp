import {
  FormGroup,
  ControlLabel,
  FormControl
} from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { FullWidthRow, Spacer } from '../helpers';
import BlockSaveButton from '../helpers/form/BlockSaveButton';
import ThemeSettings from './Theme';
import UsernameSettings from './Username';

const propTypes = {
  about: PropTypes.string,
  currentTheme: PropTypes.string,
  location: PropTypes.string,
  name: PropTypes.string,
  picture: PropTypes.string,
  points: PropTypes.number,
  submitNewAbout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  toggleNightMode: PropTypes.func.isRequired,
  username: PropTypes.string
};

class AboutSettings extends Component {
  constructor(props) {
    super(props);

    const { name = '', location = '', picture = '', about = '' } = props;
    const values = {
      name,
      location,
      picture,
      about
    };
    this.state = {
      formValues: { ...values },
      originalValues: { ...values },
      formClicked: false
    };
  }

  componentDidUpdate() {
    const { name, location, picture, about } = this.props;
    const { formValues, formClicked } = this.state;
    if (
      formClicked &&
      name === formValues.name &&
      location === formValues.location &&
      picture === formValues.picture &&
      about === formValues.about
    ) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      return this.setState({
        originalValues: {
          name,
          location,
          picture,
          about
        },
        formClicked: false
      });
    }
    return null;
  }

  isFormPristine = () => {
    const { formValues, originalValues } = this.state;
    return Object.keys(originalValues)
      .map(key => originalValues[key] === formValues[key])
      .every(bool => bool);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formValues } = this.state;
    const { submitNewAbout } = this.props;
    return this.setState({ formClicked: true }, () =>
      submitNewAbout(formValues)
    );
  };

  handleNameChange = e => {
    const value = e.target.value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        name: value
      }
    }));
  };

  handleLocationChange = e => {
    const value = e.target.value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        location: value
      }
    }));
  };

  handlePictureChange = e => {
    const value = e.target.value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        picture: value
      }
    }));
  };

  handleAboutChange = e => {
    const value = e.target.value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        about: value
      }
    }));
  };

  render() {
    const {
      formValues: { name, location, picture, about }
    } = this.state;
    const { currentTheme, username, t, toggleNightMode } = this.props;
    return (
      <div className='about-settings'>
        <UsernameSettings username={username} />
        <br />
        <FullWidthRow>
          <form id='camper-identity' onSubmit={this.handleSubmit}>
            <FormGroup controlId='about-name'>
              <ControlLabel>
                <strong>{t('settings.labels.name')}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handleNameChange}
                type='text'
                value={name}
              />
            </FormGroup>
            <FormGroup controlId='about-location'>
              <ControlLabel>
                <strong>{t('settings.labels.location')}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handleLocationChange}
                type='text'
                value={location}
              />
            </FormGroup>
            <FormGroup controlId='about-picture'>
              <ControlLabel>
                <strong>{t('settings.labels.picture')}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handlePictureChange}
                required={true}
                type='url'
                value={picture}
              />
            </FormGroup>
            <FormGroup controlId='about-about'>
              <ControlLabel>
                <strong>{t('settings.labels.about')}</strong>
              </ControlLabel>
              <FormControl
                componentClass='textarea'
                onChange={this.handleAboutChange}
                value={about}
              />
            </FormGroup>
            <BlockSaveButton disabled={this.isFormPristine()} />
          </form>
        </FullWidthRow>
        <Spacer />
        <FullWidthRow>
          <ThemeSettings
            currentTheme={currentTheme}
            toggleNightMode={toggleNightMode}
          />
        </FullWidthRow>
      </div>
    );
  }
}

AboutSettings.displayName = 'AboutSettings';
AboutSettings.propTypes = propTypes;

export default withTranslation()(AboutSettings);
