import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Alert
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from '@freecodecamp/react-bootstrap';

import { FullWidthRow, Spacer } from '../helpers';
import ThemeSettings from './theme';
import UsernameSettings from './username';
import BlockSaveButton from '../helpers/form/block-save-button';
import { TFunction, withTranslation } from 'react-i18next';
import SoundSettings from './sound';

type FormValues = {
  name: string;
  location: string;
  picture: string;
  about: string;
};

type AboutProps = {
  about: string;
  currentTheme: string;
  location: string;
  name: string;
  picture: string;
  points: number;
  sound: boolean;
  submitNewAbout: (formValues: FormValues) => void;
  t: TFunction;
  toggleNightMode: (theme: string) => void;
  toggleSoundMode: (sound: boolean) => void;
  username: string;
};

type AboutState = {
  formValues: FormValues;
  originalValues: FormValues;
  formClicked: boolean;
  isPictureUrlValid: boolean;
};

class AboutSettings extends Component<AboutProps, AboutState> {
  validationImage: HTMLImageElement;
  static displayName: string;
  constructor(props: AboutProps) {
    super(props);
    this.validationImage = new Image();
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
      formClicked: false,
      isPictureUrlValid: true
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
      // eslint-disable-next-line react/no-did-update-set-state
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
    return (
      this.state.isPictureUrlValid === false ||
      (Object.keys(originalValues) as Array<keyof FormValues>)
        .map(key => originalValues[key] === formValues[key])
        .every(bool => bool)
    );
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { formValues } = this.state;
    const { submitNewAbout } = this.props;
    if (this.state.isPictureUrlValid === true) {
      return this.setState({ formClicked: true }, () =>
        submitNewAbout(formValues)
      );
    } else {
      return false;
    }
  };

  handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        name: value
      }
    }));
  };

  handleLocationChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        location: value
      }
    }));
  };

  componentDidMount() {
    this.validationImage.addEventListener('error', this.errorEvent);
    this.validationImage.addEventListener('load', this.loadEvent);
  }

  componentWillUnmount() {
    this.validationImage.removeEventListener('load', this.loadEvent);
    this.validationImage.removeEventListener('error', this.errorEvent);
  }

  loadEvent = () => this.setState({ isPictureUrlValid: true });
  errorEvent = () => this.setState({ isPictureUrlValid: false });

  handlePictureChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    this.validationImage.src = value;
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        picture: value
      }
    }));
  };

  showImageValidationWarning = () => {
    const { t } = this.props;
    if (this.state.isPictureUrlValid === false) {
      return (
        <HelpBlock>
          <Alert bsStyle='info'>{t('validation.url-not-image')}</Alert>
        </HelpBlock>
      );
    } else {
      return true;
    }
  };

  handleAboutChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
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
    const {
      currentTheme,
      sound,
      username,
      t,
      toggleNightMode,
      toggleSoundMode
    } = this.props;
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
              {this.showImageValidationWarning()}
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
          <SoundSettings sound={sound} toggleSoundMode={toggleSoundMode} />
        </FullWidthRow>
      </div>
    );
  }
}

AboutSettings.displayName = 'AboutSettings';

export default withTranslation()(AboutSettings);
